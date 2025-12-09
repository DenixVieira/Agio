import { useForm } from "react-hook-form";

export const FormEstabelecimento = ({ setDataForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.cnpjEstabelecimento = limparCNPJ(data.cnpjEstabelecimento)
        setDataForm(data)
    };

    const limparCNPJ = (cnpj: string): string => {
        if (!cnpj) return "";
        return cnpj.replace(/[^\d]/g, ""); // Remove tudo que não for número
    };


    return (
        <form className='flex flex-col justify-center border-2  p-8 rounded-xl shadow-lg' onSubmit={handleSubmit(onSubmit)}>
            <p className="font-bold">Pesquise produtos em seus Estabelecimento:</p>
            <div className=''>
                <div className=''>
                    <div className='flex flex-col mt-6 '>
                        <label>Descrição do produto (obrigatório):</label>
                        <input
                            className="w-[100%] border-2 mt-2 p-1 rounded-sm"
                            placeholder='Insira a descrição do produto'
                            {...register("descricaoProduto", { required: true })}
                        />
                        {errors.nome && <span>Campo Obrigatório!</span>}
                    </div>
                    <div className='flex flex-col mt-6'>
                        <label>CNPJ do Estabelecimento (obrigatório):</label>
                        <input
                            className="w-[100%] border mt-2 p-1 rounded-sm"
                            placeholder='Insira o CNPJ'
                            {...register("cnpjEstabelecimento", { required: true })}
                        />
                        {errors.local && <span>Campo Obrigatório!</span>}
                    </div>
                </div>
            </div>
            <input
                type='submit'
                value='Buscar notas'
                className="w-[80%%] bg-cyan-500  text-white hover:bg-gray-50 mt-6 rounded-md p-2 "

            />
        </form>
    )
}
