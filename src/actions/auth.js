import Swal from 'sweetalert2';

import { types } from "../types/types";
import { startLoading, finishLoading } from "./ui";
import { firebase, 
        googleAuthProvider } from '../firebase/firebase-config';
import { noteLogout } from './notes';


// Cuando es una tarea asyncrona, el return siempre devuelve una función de flecha
// en la que le pasamos por parámetro el dispatch.
export const startRegisterWithEmail = ( name, email, password ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({user}) => {
                await user.updateProfile({ displayName: name})
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch( err => {
                Swal.fire('Error', err.message, 'error')
            })
    }
}


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch( startLoading() );
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName))
                dispatch( finishLoading() )
            })
            .catch( err => {
                dispatch( finishLoading() )
                Swal.fire('Error', err.message, 'error')
            })
    }
}


export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName)
                )
            })
    }
}


// De forma abreviada, quitamos el return y lo metemos entre parentesis
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }  
});

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch ( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
})