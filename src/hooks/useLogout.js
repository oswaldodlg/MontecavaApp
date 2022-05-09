import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useGetRole } from "./useGetRole";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const {credentials, setCredentials} = useGetRole()

    const logout = async () => {
        setError(null)
        setIsPending(true)


        signOut(auth).then(() => {
           
            dispatch({type: 'LOGOUT'})
            if (!isCancelled){
                setIsPending(false)
                setError(null)
                
            }
        }).catch((err) => {
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
                
            }
        })
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}