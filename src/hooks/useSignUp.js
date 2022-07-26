import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { doc, serverTimestamp, setDoc} from 'firebase/firestore';
import { db } from "../firebase/config";
import { useGetLogedUserData } from "./useGetLogedUserData";

export const useSignUp = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()
    const {logedUserData, getLogedUserData} = useGetLogedUserData()

    useEffect(() => {
        dispatch( { type: 'DATA_IS_READY', data: logedUserData})
    }, [logedUserData])
    

    const signup = async(email, password, firstName, lastName) => {
        setError(null)
        setIsPending(true)

        try {
            //SignUp User
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log("User " + res.user.uid + " created successfully!");


            if (res === null){
                throw new Error('No se pudo registrar el usuario')
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
                  await setDoc(userRef, {email, firstName, lastName, credentials: 'user', 'Documentos': {}, 'stripeCustomerId': data.id, termsandconditions: false, createdAt: serverTimestamp()}, 
                  getLogedUserData('users', res.user.uid)
                )
                });
              }
              
              await stripeCustomerId()


              dispatch({
                type: 'LOGIN',
                payload: res.user
              }) 


            // dipatch login action
           

            
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

        } catch (err){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    useEffect(() => {    
        return () => {
          setIsCancelled(true)
        }
      }, [])

    return {error, isPending, signup}
}