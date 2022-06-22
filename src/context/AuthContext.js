import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useGetRole } from "../hooks/useGetRole";
import { useRouter } from "next/router"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { ...state, user: action.payload, data: action.data }
        case 'LOGOUT': 
            return {...state, user: null, data: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true, data: action.data}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children } ) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
        data: null,
    })

    const [userId, setUserId] = useState()
    

    const {credentials} = useGetRole('users', userId)  
    
    const router = useRouter()

    useEffect(() => {
        const unsub= onAuthStateChanged(auth, (user) => {

                try{
                    setUserId(user.uid)
                    dispatch( { type: 'AUTH_IS_READY', payload: user, data: credentials})
                } catch{
                    setUserId(null)
                    dispatch( { type: 'AUTH_IS_READY', payload: user, data: null})
                    unsub()  
                }   
               
                return unsub()
        })
    }, [userId, credentials, state.user, router])


    // useEffect(() => {
    //     if (state.user && state.data && state.data.credentials==='admin')
    //     {router.push("/admin")} 
    //     else if (state.user && state.data && state.data.credentials==='user') {
    //         router.push("/user")
    //     } 
    //     else if (state.user && state.data && !state.data.subscriptionId){
    //       router.push("/user/suscripcion")
    //     }
        
    //     // else if (router.pathname.startsWith("/user") && data && !data.subscriptionId){
    //     //     router.push("/user/suscripcion")
    //     // } 
    // }, [router])
    

   
    useEffect(() => {
        console.log('AuthContext state:', state)

    }, [credentials])
   
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
        
            {state.authIsReady && children}
        </AuthContext.Provider>
    )
}