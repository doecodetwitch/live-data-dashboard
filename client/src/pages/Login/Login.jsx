import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Login () {
    const [userState, loadingState, errorState] = useAuthState(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    return (
        <>
            <h1>
                Please, authenticate!
            </h1>
            {userState ? 
                <div>
                    Hello, {userState.displayName}!
                </div> 
            : null}
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