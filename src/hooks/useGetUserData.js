import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'

export const useGetUserData = () => {

    const [userData, setUserData] = useState(null)

    const getUserData = (c, id) => {
        try{
            let ref = collection(db, c)
            let docRef = doc(ref, id) 
            onSnapshot(docRef, (doc) => {
                setUserData(doc.data()) 
            })
           
        } catch (err){
            console.log(err)
        }
       
    }        

    useEffect(() => {
      console.log(userData)
    }, [userData])
    
    

    
    
    return ({userData, getUserData})
}