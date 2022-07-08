import { useState, useEffect } from 'react';
import { db} from '../firebase/config';
import { doc, updateDoc} from 'firebase/firestore';

export default function useUpdateUserDoc() {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    const updateUserDoc = async (user, field, value) => {
        setError(null) 
        setIsPending(true)

        try {
       
            //add info to collection
            const userRef= await doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                [`${field}`]: value
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

    return {error, isPending, updateUserDoc}
}