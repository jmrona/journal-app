import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import isEmail from 'validator/lib/isEmail';

import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmail } from '../../actions/auth';

export const RegisterScreen = () => {

    const [ formValues, handleInputChange ] = useForm({
        name: 'Jose',
        email: 'jmrona@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid() ){
            dispatch( startRegisterWithEmail(name, email, password));
        }
    }

    const dispatch = useDispatch();

    // useSelector - Permite acceder a un state y extraer datos
    const {msgError} = useSelector(state => state.ui)

    const isFormValid = () => {
        if( name.trim().length === 0 ){
            dispatch( setError('Name is required'))
            return false;
        } else if ( !isEmail(email) ){
            dispatch( setError('Email is not valid'))
            return false;
        }else if ( password !== password2 || password.length < 5){
            dispatch( setError('Password should match each other and be at least 6 characters'))
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title mb-5 animate__animated animate__fadeIn animate__faster">Register</h3>
            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">

                {
                    msgError && 
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                }
                

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link 
                    to="/auth/login" 
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
