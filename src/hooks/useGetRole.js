import {useState, useEffect} from 'react';
import { db } from '../firebase/config';
import { auth } from "../firebase/config";

//firebase Imports
import {collection, doc, getDoc, onSnapshot} from 'firebase/firestore'

export const useGetRole = (c, id) => {


    const [credentials, setCredentials] = useState(null)
    

    useEffect(() => {

        const getRole = async() => {
            try{
               console.log(c, id)
                let ref = collection(db, c)
                let docRef = doc(ref, id) 
                return getDoc(docRef).then((doc) =>  setCredentials(doc.data().credentials))
            } catch{
                return setCredentials(null);
            }
           
        }        
        return getRole()
    }, [c, id])


    

    
    
    return ({credentials, setCredentials})
}