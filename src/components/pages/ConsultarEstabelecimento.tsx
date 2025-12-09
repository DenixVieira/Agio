import { useEffect, useState } from 'react';
import { CompactTable } from '../contents/CompactTable';
import { sefazAPI } from '../hooks/requisicao';
import { FormEstabelecimento } from '../contents/estabelecimento/FormEstabelecimento';
import { Periodico } from '../contents/estabelecimento/Periodico';
import { Loader } from '../layout/Loader';

const formatVendaPorDia = (dados: any[]) => {
  const mapa = dados.reduce((acc, item) => {
    const data = new Date(item.dataVenda);
    const diaFormatado = data.toLocaleDateString("pt-BR");

    if (!acc[diaFormatado]) {
      acc[diaFormatado] = {
        dia: diaFormatado,
        quantidade: 0,
        totalVendido: 0,
      };
    }

    acc[diaFormatado].quantidade += 1;
    acc[diaFormatado].totalVendido += item.valorVenda;

    return acc;
  }, {});

  return Object.values(mapa).sort(
  (a: any, b: any) =>
    new Date(a.dia.split("/").reverse().join("-")).getTime() -
    new Date(b.dia.split("/").reverse().join("-")).getTime()
);

};



export const ConsultarEstabelecimento = () => {
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataForm, setDataForm] = useState<any[]>([]);
  const [dataGrafic,setDataGrafic] = useState<any[]>([]);

  useEffect(() => {
    console.log(dataForm)
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dados = await sefazAPI.consultarNotasDeEstabelecimento(dataForm.descricaoProduto, dataForm.cnpjEstabelecimento);
        if (!mounted) return;

        // Verifica se é array ou se tem dados em uma propriedade específica
        const notas = Array.isArray(dados) ? dados : dados?.data ?? [];
        const data = formatVendaPorDia(notas)
        setDataGrafic(data);
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
          <FormEstabelecimento setDataForm={setDataForm} />
        </div>
        <div className="flex justify-center w-[60%] max-h-100 min-h-full">
          {error && <p>{error}</p>}
          {loading ? (
            <Loader/>
          ) : dataTable.length > 0 ? (
            <CompactTable
              data={dataTable}
              columns={[
                { header: "Razão Social", accessor: "razaoSocial", width: "w-[180px]" },
                { header: "CNPJ", accessor: "cnpj", width: "w-[150px]" },
                { header: "Descrição", accessor: "descricao", width: "w-[250px]" },
                {
                  header: "Data Venda",
                  accessor: "dataVenda",
                  width: "w-[150px]",
                  formatter: (val) => new Date(val).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
                },
                {
                  header: "Valor",
                  accessor: "valorVenda",
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
      <div className="flex justify-center min-h-100 m-[30px] items-center">
        {error && <p>{error}</p>}
        {loading ? (
          <Loader/>
        ) : dataTable.length > 0 ? (
          <div className="flex w-full p-[10px]">
            <Periodico chartData={dataGrafic} />
          </div>
        ) : (
          <p>Nenhuma nota encontrada.</p>
        )}
      </div>
    </div>
  );
};
