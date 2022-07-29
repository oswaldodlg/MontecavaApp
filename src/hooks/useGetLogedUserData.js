import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot, getDoc} from 'firebase/firestore'


export const useGetLogedUserData = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [logedUserData, setLogedUserData] = useState(null)

    
    const getLogedUserData = async(c, id) => {
            const ref = collection(db, c)
            const docRef = doc(ref, id)
            try {
                const unsubscribe = onSnapshot(docRef, (doc) => {
                        setLogedUserData(doc.data()) 
                        unsubscribe()
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

    return ({logedUserData, getLogedUserData})
}