import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'

export const useCollectionUserDetail = (c, id) => {
    const [details, setDetails] = useState(null)

    useEffect(() => {
        let ref = collection(db, c)
        let docRef = doc(ref, id) 

        const unsub = onSnapshot(docRef,(doc) => {
            let results = []
            console.log("Current data: ", doc.data());
            results.push(doc.data())
            setDetails(results)
        })
        return () => unsub()
    }, [c, id])
    
    return ({details})
}