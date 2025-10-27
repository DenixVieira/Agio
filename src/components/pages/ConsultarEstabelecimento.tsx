import { useEffect, useState } from 'react';
import { TableBoardEstabelecimento } from '../contents/estabelecimento/TableBoardEstabelecimento';
import { sefazAPI } from '../hooks/requisicao';
import { FormEstabelecimento } from '../contents/estabelecimento/FormEstabelecimento';

export const ConsultarEstabelecimento = () => {
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataForm, setDataForm] = useState<any[]>([]);

  useEffect(() => {
    console.log(dataForm)
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const dados = await sefazAPI.consultarNotasDeEstabelecimento( dataForm.descricaoProduto, dataForm.cnpjEstabelecimento);
        if (!mounted) return;

        // Verifica se é array ou se tem dados em uma propriedade específica
        const notas = Array.isArray(dados) ? dados : dados?.data ?? [];
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
    <div className=" flex min-h-screen flex-col">
      <div className='w-[20em]'>
        <FormEstabelecimento setDataForm={setDataForm} />
      </div>
      <div className="flex justify-center w-[50%] max-h-128 bg-gray-100">
        {error && <p>{error}</p>}
        {loading ? (
          <p>Carregando...</p>
        ) : dataTable.length > 0 ? (
          <TableBoardEstabelecimento data={dataTable} />
        ) : (
          <p>Nenhuma nota encontrada.</p>
        )}
      </div>

    </div>
  );
};
