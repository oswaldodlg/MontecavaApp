import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, onSnapshot} from 'firebase/firestore'

export const useCollection = (c) => {
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        let ref = collection(db, c) 

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            console.log(snapshot)
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setDocuments(results)
        })
        return () => unsub()
    }, [c])
   
    return ({documents})
}