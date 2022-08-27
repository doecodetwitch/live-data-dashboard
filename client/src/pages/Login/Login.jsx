import { useForm } from "react-hook-form";

function Login () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <h1>
                Please, authenticate!
            </h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="email" {...register('email', { required: true })} />
                    {errors.email && <span>This field is required</span>}
                    <input name="password" {...register('password', { required: true })} />
                    {errors.password && <span>This field is required</span>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Login;