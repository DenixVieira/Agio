import { useEffect, useState } from 'react';
import { CompactTable } from '../contents/CompactTable';
import { sefazAPI } from '../hooks/requisicao';
import { FormCombustivel } from '../contents/combustivel/FormCombustivel';
import { ValoresPorEstabelecimento } from '../contents/combustivel/ValoresPorEstabelecimento';
import { ValoresPorQuantidade } from '../contents/combustivel/ValoresPorQuantidade';
import { Loader } from '../layout/Loader';

// Define o formato esperado da API
export interface DadoPosto {
  cnpj: string;
  dataUltimaVenda: string;
  descricao: string;
  nomBairro: string;
  nomLogradouro: string;
  razaoSocial: string;
  valorultimaVenda: number;
}

// Tipos do retorno já formatado
export interface BairroResumo {
  bairro: string;
  media: number;
  postos: number;
}

export interface ValorResumo {
  valor: number;
  quantidade: number;
}

// Função convertida para TypeScript
export function transformarDados(dados: DadoPosto[]) {
  const bairros: Record<string, { soma: number; quantidade: number }> = {};
  const valores: Record<string, { count: number }> = {};

  dados.forEach(item => {
    // --- AGRUPAMENTO POR BAIRRO ---
    const bairro = item.nomBairro;

    if (!bairros[bairro]) {
      bairros[bairro] = { soma: 0, quantidade: 0 };
    }

    bairros[bairro].soma += item.valorultimaVenda;
    bairros[bairro].quantidade++;

    // --- AGRUPAMENTO POR VALOR ---
    const preco = item.valorultimaVenda.toFixed(2); // padronizado

    if (!valores[preco]) {
      valores[preco] = { count: 0 };
    }

    valores[preco].count++;
  });

  // Converter para arrays formatados e prontos para gráfico
  const porBairro: BairroResumo[] = Object.entries(bairros).map(
    ([bairro, info]) => ({
      bairro,
      media: Number((info.soma / info.quantidade).toFixed(2)),
      postos: info.quantidade,
    })
  );

  const porValor: ValorResumo[] = Object.entries(valores).map(
    ([valor, info]) => ({
      valor: Number(valor),
      quantidade: info.count,
    })
  );

  return { porBairro, porValor };
}


export const ConsultarValorCombustivel = () => {
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataForm, setDataForm] = useState<any[]>([]);
  const [graficDataBairro, setGraficDataBairro] = useState<any[]>([]);
  const [graficDataValor, setGraficDataValor] = useState<any[]>([]);

  useEffect(() => {
    console.log(dataForm)
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dados = await sefazAPI.consultarPrecosCombustivel(
          dataForm.tipoCombustivel,
          dataForm.lat,
          dataForm.long
        );
        console.log("Dados brutos da API:", dados);

        if (!mounted) return;

        // Verifica se é array ou se tem dados em uma propriedade específica
        const notas = Array.isArray(dados) ? dados : dados?.data ?? [];
        const { porBairro, porValor } = transformarDados(notas);
        setGraficDataBairro(porBairro)
        setGraficDataValor(porValor)
        setDataTable(notas);

      } catch (err) {
        if (!mounted) return;
        console.error("Erro ao carregar notas:", err);
        setError("Não foi possível carregar os dados.");
        setDataTable([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [, dataForm]);

  // Log sempre que dataTable mudar

  return (
    <div>
      <div className="flex h-auto mt-8 justify-evenly flex-direction: column items-center ">
        <div className='w-[25em]'>
          <FormCombustivel setDataForm={setDataForm} />
        </div>
        <div className="flex justify-center w-[60%] max-h-100 min-h-full">
          {error && <p>{error}</p>}
          {loading ? (
            <Loader/>
          ) : dataTable.length > 0 ? (
            <CompactTable
              data={dataTable}
              columns={[
                { header: "Razão Social", accessor: "razaoSocial", width: "w-[120px]" },
                { header: "CNPJ", accessor: "cnpj", width: "w-[150px]" },
                { header: "Descrição", accessor: "descricao", width: "w-[180px]" },
                { header: "Bairro", accessor: "nomBairro", width: "w-[120px]" },
                { header: "Logradouro", accessor: "nomLogradouro", width: "w-[180px]" },
                {
                  header: "Data última venda",
                  accessor: "dataUltimaVenda",
                  width: "w-[150px]",
                  formatter: (val) => new Date(val).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
                },
                {
                  header: "Valor Última Venda",
                  accessor: "valorultimaVenda",
                  width: "w-[80px]",
                  align: "right",
                  formatter: (val) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)
                },
              ]}
            />

          ) : (
            <p>Nenhuma nota encontrada.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center min-h-100 m-[30px] items-center ">
        {error && <p>{error}</p>}
        {loading ? (
          <Loader/>
        ) : dataTable.length > 0 ? (
          <div className="flex justify-evenly w-[100%] m-[10px]">
            <ValoresPorEstabelecimento chartData={graficDataBairro} />
            <ValoresPorQuantidade chartData={graficDataValor}/>
          </div>
        ) : (
          <p>Nenhuma nota encontrada.</p>
        )}
      </div>
    </div>
  );
};
