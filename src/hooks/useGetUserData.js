import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'

export const useGetUserData = () => {

    const [userData, setUserData] = useState(null)


    const getUserData = (c, id) => {
        try{
            let ref = collection(db, c)

            // getDoc(docRef).then((doc) => setLogedUserData(doc.data()))
            const unsubscribe = onSnapshot(doc(ref, id), (doc) => {
                setUserData(doc.data()) 
                
            })
            
            
        } catch (err){
            console.log(err)
        }
        
    }        

    useEffect(() => {
     return setUserData(null)
    }, [])
    
    

    
    
    return ({userData, getUserData})
}