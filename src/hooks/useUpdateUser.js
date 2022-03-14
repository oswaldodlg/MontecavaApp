import { useState, useEffect } from 'react';
import { db, storageRef} from '../firebase/config';
import { updateProfile, updatePhoneNumber, updateEmail} from "firebase/auth";
import { doc, setDoc, updateDoc} from 'firebase/firestore';

export default function useUpdateUser() {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    const updateUser = async (user, displayName, email, phoneNumber) => {
        setError(null) 
        setIsPending(true)

        console.log(user, displayName, email, phoneNumber)

        try {
            // update user variables
            await updateProfile(user, {displayName: displayName})
            //await updateEmail(user, {newEmail: email})
            //add info to collection
            const userRef= await doc(db, 'users', user.uid);
            await updateDoc(userRef, {phoneNumber})

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

    return {error, isPending, updateUser}
}