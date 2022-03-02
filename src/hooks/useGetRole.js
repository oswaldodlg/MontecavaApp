import {useState, useEffect} from 'react';
import { db } from '../firebase/config';
import { auth } from "../firebase/config";

//firebase Imports
import {collection, doc, getDoc, onSnapshot} from 'firebase/firestore'
import { useRouter } from 'next/router';

export const useGetRole = (c, id) => {

    const router = useRouter()

    const [credentials, setCredentials] = useState(null)
    

    useEffect(() => {

        const getRole = async() => {
            try{
               console.log(c, id)
                let ref = collection(db, c)
                let docRef = doc(ref, id) 
                return getDoc(docRef).then(async(doc) =>  await setCredentials(doc.data().credentials))
            } catch{
                return setCredentials(null);
            }
           
        }        

        console.log(credentials)
        return getRole()
    }, [c, id, credentials])


    

    
    
    return ({credentials, setCredentials})
}