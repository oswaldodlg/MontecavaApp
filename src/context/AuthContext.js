import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router"
import { useGetLogedUserData } from "src/hooks/useGetLogedUserData";
import { useGetUserData } from "src/hooks/useGetUserData";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { ...state, user: action.payload, data: action.data}
        case 'LOGOUT': 
            return {...state, user: null, data: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        case 'DATA_IS_READY':
            return {...state, data: action.data}
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
    const {userData: logedUserData} = useGetUserData('users',  userId)

    // useEffect(() => {

    //     const unsub = () => {
    //         if(userId) return getLogedUserData('users', userId.uid)
    //       }
        
    //       return unsub()
    //    }, [userId])
    

    //  useEffect(() => {
    //  userId &&  getLogedUserData('users', userId.uid)
       
    // }, [userId])

    useEffect(() => {
      dispatch( { type: 'DATA_IS_READY', data: logedUserData})
    }, [logedUserData])
    

    
    

    useEffect(() => {
        console.log('AuthContext state:', state, 'UserId', userId)
    }, [state])

    useEffect(() => {
        
       const unsub = onAuthStateChanged(auth, (user) => {

            try{
                setUserId(user.uid)
                dispatch( { type: 'AUTH_IS_READY', payload: user})
            } catch (err){
                setUserId(null)
                console.log(err)
            }   
           
        }) 


     
        
    }, [state.authIsReady, auth])
    
    

    

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
        
            {state.authIsReady && children}
        </AuthContext.Provider>
    )
}