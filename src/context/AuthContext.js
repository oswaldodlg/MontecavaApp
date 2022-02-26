import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useGetRole } from "../hooks/useGetRole";
import { db } from '../firebase/config';
import { collection, doc, setDoc, updateDoc} from 'firebase/firestore';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { ...state, user: action.payload, credentials: action.credentials }
        case 'LOGOUT': 
            return {...state, user: null, credentials: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true, credentials: action.credentials}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children } ) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
        credentials: null,
    })

    const [userId, setUserId] = useState()
    

    const {credentials} = useGetRole('users', userId)   

    useEffect(() => {
        const unsub= onAuthStateChanged(auth, (user) => {

                try{
                    setUserId(user.uid)
                    dispatch( { type: 'AUTH_IS_READY', payload: user, credentials: credentials})
                } catch{
                    setUserId(null)
                    dispatch( { type: 'AUTH_IS_READY', payload: user, credentials: null})
                    unsub()  
                }   
               
                
        })
    }, [userId, credentials, state.user])

   
    useEffect(() => {
        console.log('AuthContext state:', state)

    }, [state.credentials])
   
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}