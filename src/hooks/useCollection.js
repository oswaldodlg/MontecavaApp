import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, onSnapshot} from 'firebase/firestore'

export const useCollection = () => {
    const [documents, setDocuments] = useState(null)

    const getAllDocuments = (c) => {
        let ref = collection(db, c) 

        onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setDocuments(results)
        })
    } 

    // useEffect(() => {
    //     let ref = collection(db, c) 

    //     const unsub = onSnapshot(ref, (snapshot) => {
    //         let results = []
    //         snapshot.docs.forEach(doc => {
    //             results.push({...doc.data(), id: doc.id})
    //         })
    //         setDocuments(results)
    //     })
    //     return () => unsub()
    // }, [c])
   
    return ({documents, getAllDocuments})
}