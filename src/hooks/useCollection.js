import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, onSnapshot, orderBy, query, limit, startAfter, getDocs,} from 'firebase/firestore'

export const useCollection = (c) => {
    const [documents, setDocuments] = useState(null)
    const [lastItem, setLastItem] = useState(null)
    const [allDocsRetrieved, setAllDocsRetrieved] = useState(false)

    let ref = collection(db, c)
    const q = query(ref, orderBy("createdAt", 'desc'), limit(10));
    

    const nextq = query(ref, orderBy("createdAt", 'desc'), startAfter(lastItem && lastItem.createdAt), limit(10));

    useEffect(() => {
        
        const unsub = onSnapshot(q, (querySnapshot) => {
            let results = []
            setAllDocsRetrieved(false)
            querySnapshot.forEach(function(doc) {
                results.push({ key: doc.id, ...doc.data() });
            });
            console.log('first item ', results[0])
            console.log('last item ', results[results.length-1])
            setDocuments(results);
            setLastItem(results[results.length-1])
        })
        return () => unsub()

    }, [c])

    const showNext = () => {
        
            const fetchNextData = async () => {
                
                onSnapshot(nextq, (querySnapshot) => {

                        let results = [];
                        
                        querySnapshot.forEach(function(doc) {
                            results.push({ key: doc.id, ...doc.data() });
                        });
                        console.log(results)
                        if (results.length > 0) {
                            setDocuments([...documents, ...results]);  
                        } else {
                                setAllDocsRetrieved(true)
                                return console.log('No more docs')
                        }
                    
                        setLastItem(results[results.length-1])
                        
                        console.log(documents)
                    })
            };
            return fetchNextData();
        
    };


    return ({documents, showNext, allDocsRetrieved})
}



