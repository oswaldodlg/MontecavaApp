import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot, getDoc} from 'firebase/firestore'


export const useGetLogedUserData = () => {

    const [logedUserData, setLogedUserData] = useState(null)




    useEffect(() => {
      console.log(logedUserData)
    }, [logedUserData])
    
    

    const getLogedUserData = async(c, id) => {
       
        try{
            console.log(c, id)
            const ref = collection(db, c)
            const docRef = doc(ref, id) 
            getDoc(docRef).then((doc) => setLogedUserData(doc.data()))
            // const unsub= () => onSnapshot(docRef, (doc) => {
            //     setLogedUserData(doc.data()) 
            // })
            // return unsub()
           
        } catch (err){
            console.log(err)
        }
       
    }        

        
    
    return ({logedUserData, getLogedUserData})
}