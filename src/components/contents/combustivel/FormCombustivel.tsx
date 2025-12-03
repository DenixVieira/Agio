import { useForm } from "react-hook-form";

export const FormCombustivel = ({ setDataForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setDataForm(data)
    };

    return (
        <form className='flex flex-col justify-center border-2 p-8 rounded-xl shadow-lg' onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
                <div className=''>
                    <div className="flex flex-col mt-6">
                        <label>Tipo de Combustível:</label>
                        <select
                            className="w-full border-2 mt-2 p-1 rounded-sm"
                            {...register("tipoCombustivel", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Selecione o tipo
                            </option>
                            <option value="1">Gasolina Comum</option>
                            <option value="2">Gasolina Aditivada</option>
                            <option value="3">Etanol</option>
                            <option value="4">Diesel</option>
                        </select>
                        {errors.tipoCombustivel && (
                            <span className="text-red-500 text-sm">Campo Obrigatório!</span>
                        )}
                    </div>
                    <div className='flex flex-col mt-6'>
                        <label>Latitude:</label>
                        <input
                            className="w-[100%] border-2 mt-2 p-1 rounded-sm"
                            placeholder='Insira a Latitude'
                            {...register("lat", { required: true })}
                        />
                        {errors.local && <span>Campo Obrigatório!</span>}
                    </div>
                    <div className='flex flex-col mt-6'>
                        <label>Longitude:</label>
                        <input
                            className="w-[100%] border-2 mt-2 p-1 rounded-sm"
                            placeholder='Insira a Longitude'
                            {...register("long", { required: true })}
                        />
                        {errors.local && <span>Campo Obrigatório!</span>}
                    </div>
                </div>
            </div>
            <input
                type='submit'
                className="w-[80%%] bg-cyan-500  text-white hover:bg-gray-50 mt-6 rounded-md p-2 "
                value='Buscar notas'
            />
        </form>
    )
}
