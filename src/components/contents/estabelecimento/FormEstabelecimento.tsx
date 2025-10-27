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
        <form className='' onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
                <div className='container_input'>
                    <div className=''>
                        <label>Descrição do produto (obrigatório):</label>
                        <input
                            className="w-[100%] border-b-solid border-b-2 border-indigo-60"
                            placeholder='Insira a descrição do produto'
                            {...register("descricaoProduto", { required: true })}
                        />
                        {errors.nome && <span>Campo Obrigatório!</span>}
                    </div>
                    <div className=''>
                        <label>CNPJ do Estabelecimento (obrigatório):</label>
                        <input
                            className="w-[100%] border-b-solid border-b-2"
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
                className="w-[300px] bg-gray-100 hover:bg-gray-50"

            />
        </form>
    )
}
