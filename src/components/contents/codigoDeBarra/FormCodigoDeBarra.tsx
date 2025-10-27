import { useForm } from "react-hook-form";

export const FormCodigoDeBarra = ({ setDataForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setDataForm(data)
    };

    return (
        <form className='' onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
                <div className=''>
                    <div className='' >
                        <label>Código de Barras (Obrigatório):</label>
                        <input
                            placeholder='Insira a descrição do produto'
                            {...register("codigoDeBarras", { required: true })}
                        />
                        {errors.nome && <span>Campo Obrigatório!</span>}
                    </div>
                    <div className=''>
                        <label>Latitude:</label>
                        <input
                            placeholder='Insira a Latitude'
                            {...register("lat", { required: true })}
                        />
                        {errors.local && <span>Campo Obrigatório!</span>}
                    </div>
                    <div className=''>
                        <label>Longitude:</label>
                        <input
                            placeholder='Insira a Longitude'
                            {...register("long", { required: true })}
                        />
                        {errors.local && <span>Campo Obrigatório!</span>}
                    </div>
                </div>
            </div>
            <input
                type='submit'
                className="w-[300px] bg-gray-100 hover:bg-gray-50"
                value='Buscar notas'
            />
        </form>
    )
}
