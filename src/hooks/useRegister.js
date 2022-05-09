import { useState, useEffect } from 'react';
import { db, secondaryAuth, storageRef} from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable, } from 'firebase/storage';
import { doc, serverTimestamp, setDoc} from 'firebase/firestore';

export default function useRegister() {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    const registerUser = async (email, password, firstName, lastName) => {
        setError(null) 
        setIsPending(true)

        try {
            //signup user
            const res = await createUserWithEmailAndPassword(secondaryAuth, email, password, name, lastName)
            console.log("User " + res.user.uid + " created successfully!");

            if (!res){
                throw new Error('Could not register the new user')
            }

            // add display name to user
            await updateProfile(res.user, {displayName: firstName + '' + lastName })


            //add info to collection
            const userRef= await doc(db, 'users', res.user.uid);
            await setDoc(userRef, {email, firstName, lastName, credentials: 'user', 'Documentos': {}, termsandconditions: false, createdAt: serverTimestamp()})
            
            await signOut(secondaryAuth)

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

    return {error, isPending, registerUser}
}

