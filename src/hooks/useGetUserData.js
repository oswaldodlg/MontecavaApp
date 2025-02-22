import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'

export const useGetUserData = (c, id) => {
    const [userData, setUserData] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        if (id){
            setIsPending(true)
            let ref = collection(db, c)
            let docRef = doc(ref, id) 
    
            const unsub = onSnapshot(docRef,(doc) => {
                console.log("Current data: ", doc.data());
                setUserData(doc.data())
                setIsPending(false)
            })
            return () => unsub()
        }

    }, [c, id])
    
    return ({userData, isPending})
}

// const [isCancelled, setIsCancelled] = useState(false)
    // const [error, setError] = useState(null)
    // const [userData, setUserData] = useState(null)

    // const [isPending, setIsPending] = useState(false)


    // const getUserData = (c, id) => {
    //     try{
    //         setIsPending(true)
    //         let ref = collection(db, 'users')

    //         // getDoc(docRef).then((doc) => setLogedUserData(doc.data()))
    //         const unsubscribe = onSnapshot(doc(ref, id), (doc) => {
    //             setUserData(doc.data()) 
                
    //         })
            
    //         if (!isCancelled){
    //             setIsPending(false)
    //             setError(null)
    //         }
    //     } catch (err){
    //         if (!isCancelled){
    //             console.log(err.message)
    //             setError(err.message)
    //             setIsPending(false)
    //         }
    //     }
        
    // }        

    // useEffect(() => {    
    //     return () => {
    //       setIsCancelled(true)
    //     }
    //   }, [])   
    
    

    
    
    // return ({userData, getUserData, isPending})