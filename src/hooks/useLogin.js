import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useGetRole } from "./useGetRole";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const [userId, setUserId] = useState()
    const [user, setUser] = useState()

    const {credentials} = useGetRole('users', userId)

    const login = async (email, password) => {

        setError(null)
        setIsPending(true)

        if(email != "" && password !="") {
            signInWithEmailAndPassword(auth, email, password)
            .then(async(res) => {
            //setUserId(res.user.uid)
            await setUser(res.user)
            await setUserId(res.user.uid)
            await dispatch({type: 'LOGIN', payload: user, credentials: credentials}) 
            
        }). then(() => {
            setIsPending(false)
        })
        .catch((err) => {
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        })
        }
        
        

        // //sign the user in
        // try {
        //     const res = await signInWithEmailAndPassword(auth, email, password)
        //     setUser(res.user)
        //     await setUserId(res.user.uid)
        //     console.log(userId)
        //     //dispatch login action
           
            

        //     //update state
        //     if (!isCancelled){
        //         setIsPending(false)
        //         setError(null)
        //     }
            
        // } catch(err){
        //     if (!isCancelled){
        //         console.log(err.message)
        //         setError(err.message)
        //         setIsPending(false)
        //     }
        // }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending }
}