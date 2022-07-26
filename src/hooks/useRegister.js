import { useState, useEffect } from 'react';
import { db, secondaryAuth, storageRef} from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable, } from 'firebase/storage';
import { doc, serverTimestamp, setDoc} from 'firebase/firestore';
import useGetStripeCustomer from './useGetStripeCustomer';

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
            await updateProfile(res.user, {displayName: firstName + ' ' + lastName })


            //add info to collection
            const userRef= await doc(db, 'users', res.user.uid);

            const stripeCustomerId = async() => {
                fetch("/api/create-stripe-customer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                      items: { 
                          email: res.user.email,
                          name: res.user.displayName
                      }
                  }),
                })
                .then((res) => res.json())
                .then(async(data) => {
                await setDoc(userRef, {email, firstName, lastName, credentials: 'user', 'Documentos': {}, 'stripeCustomerId': data.id, termsandconditions: false, createdAt: serverTimestamp()},  )
              });
            }
            
            await stripeCustomerId()
            
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

