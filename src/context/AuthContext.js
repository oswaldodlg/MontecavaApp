import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useGetRole } from "../hooks/useGetRole";
import { useRouter } from "next/router"
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
    
    const route = useRouter()

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
               
                return unsub()
        })
    }, [userId, credentials, state.user, route])

   
    useEffect(() => {
        console.log('AuthContext state:', state)

    }, [credentials])
   
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}