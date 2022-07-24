import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'


export const useGetLogedUserData = () => {

    const [logedUserData, setLogedUserData] = useState(null)


    // useEffect(() => {
    //   getLogedUserData('users', user.uid)
    // }, [user])
    

    const getLogedUserData = (c, id) => {
        try{
            let ref = collection(db, c)
            let docRef = doc(ref, id) 
            onSnapshot(docRef, (doc) => {
                setLogedUserData(doc.data()) 
            })
           
        } catch (err){
            console.log(err)
        }
       
    }        

        
    
    return ({logedUserData, getLogedUserData})
}