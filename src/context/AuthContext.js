import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router"
import { useGetLogedUserData } from "src/hooks/useGetLogedUserData";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { ...state, user: action.payload, data: action.data}
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
    const {logedUserData, getLogedUserData} = useGetLogedUserData()

    // useEffect(() => {

    //     const unsub = () => {
    //         if(userId) return getLogedUserData('users', userId.uid)
    //       }
        
    //       return unsub()
    //    }, [userId])
    

     useEffect(() => {
       userId && getLogedUserData('users', userId.uid)
    }, [userId])

    useEffect(() => {
        console.log('AuthContext state:', state, 'UserId', userId)
    }, [state])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {

            try{
                setUserId(user)
                dispatch( { type: 'AUTH_IS_READY', payload: user, data: logedUserData})
            } catch (err){
                setUserId(null)
                console.log(err)
            }   
            
        }) 
            
        
    }, [userId, logedUserData])
    
    

    

    // useEffect(() => {
    //     const unsub = () => onAuthStateChanged(auth, async(user) => {
    //         try{
                
    //             setUserId
    //             dispatch({ type: 'AUTH_IS_READY', payload: user, data: logedUserData})
    //         } catch (err){
    //             console.log(err)
    //         }
    //     })

    //     return unsub()
     
    // }, [state.data])
   

   
    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
        
            { children}
        </AuthContext.Provider>
    )
}