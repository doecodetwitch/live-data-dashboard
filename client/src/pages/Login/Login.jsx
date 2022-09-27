import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useLocation } from "wouter";
import './Login.css';

import Spinner from "../../components/Spinner/Spinner";

function Login () {
    const [location, setLocation] = useLocation();
    const [userState, loadingState, errorState] = useAuthState(auth);
    const [shouldDisplayWrongPassMessage, setShouldDisplayWrongPassMessage] = useState(false);
    const [shouldDisplayDefaultErrorMessage, setShouldDisplayDefaultErrorMessage] = useState(false);

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

    useEffect(()=>{
        if(error?.message === 'Firebase: Error (auth/wrong-password).') {
            setShouldDisplayWrongPassMessage(true);
        } else if(error?.message){
            setShouldDisplayDefaultErrorMessage(true);
        }
    }, [error])

    useEffect(()=>{
        if(userState){
            setLocation("/");
        }
    }, [userState])


    const wrongPasswordMessage = (
        <div className="errorModalContainer">
            <div className="errorModal">
                <p>This is a wrong password, please try again.</p>
                <button onClick={()=>(setShouldDisplayWrongPassMessage(false))}>OK</button>
            </div>
        </div>
    );

    const defaultErrorMessage = (
        <div className="errorModalContainer">
            <div className="errorModal">
                <p>Authentication failed, please try again later.</p>
                <button onClick={()=>(setShouldDisplayDefaultErrorMessage(false))}>OK</button>
            </div>
        </div>
    );

    if(loading){
        return (
            <Spinner />
        );
    }

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
                <form onSubmit={handleSubmit(onSubmit)} className='loginForm'>
                    <div className="inputContainer">
                        <input name="email" placeholder="email" {...register('email', { required: true })} />
                        {errors.email && <span className='input-error'>This field is required</span>}
                    </div>
                    <div className="inputContainer">
                        <input name="password" placeholder="password" {...register('password', { required: true })} />
                        {errors.password && <span className='input-error'>This field is required</span>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {shouldDisplayWrongPassMessage ? wrongPasswordMessage : null}
            {shouldDisplayDefaultErrorMessage ? defaultErrorMessage : null}
        </>
    );
}

export default Login;