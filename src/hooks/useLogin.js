import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext"
import { useGetUserData } from "./useGetUserData";


export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [userId, setUserId] = useState()
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const {userData: logedUserData} = useGetUserData('users', userId ) 
    
    useEffect(() => {
        dispatch( { type: 'DATA_IS_READY', data: logedUserData})
    }, [logedUserData])
   

    const login = async(email, password) => {
        setError(null)
        setIsPending(true)

        //sign the user in
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            setUserId(res.user.uid)

            //dispatch login action
            dispatch( {
                type: 'LOGIN',
                payload: res.user,
            })

            

            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

        } catch(err){
            if (!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }

    useEffect(() => {    
      return () => {
        setIsCancelled(true)
      }
    }, [])
    

    return {login, error, isPending}
}
