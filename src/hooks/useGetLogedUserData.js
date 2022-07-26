import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot, getDoc} from 'firebase/firestore'


export const useGetLogedUserData = () => {

    const [logedUserData, setLogedUserData] = useState(null)




    useEffect(() => {
        console.log(logedUserData)
      return setLogedUserData(null)
    }, [])
    
    const getLogedUserData = async(c, id) => {
        console.log(c, id)
        
            const ref = collection(db, c)
            const docRef = doc(ref, id)

            const unsubscribe = onSnapshot(docRef, (doc) => {
                    console.log(docRef)
                    setLogedUserData(doc.data()) 
                    unsubscribe()
            }, (error) => {
                console.log(error)
            })
        
      
    }        
        
    
    return ({logedUserData, getLogedUserData})
}