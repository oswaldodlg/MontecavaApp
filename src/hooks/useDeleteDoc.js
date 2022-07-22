import {useState, useEffect} from 'react'
import { doc, updateDoc, arrayRemove} from "firebase/firestore";
import { db, projectStorage} from '../firebase/config';
import { ref, deleteObject} from 'firebase/storage';



export default function useDeleteDoc() {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState()
    const [isPending, setIsPending] = useState(false)
    

    const deleteDoc = async(id, currentDocData, carpet, order) => {
       
        try {
        const userRef= await doc(db, 'users', id);


        let docRef = await ref(projectStorage, `${currentDocData.url}`)


        if (carpet === 'Mensuales' || carpet === 'Anuales' ){
            updateDoc(userRef, ({
                ['Documentos' +'.Declaraciones' + `.${carpet}`]: arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'IMSS' || carpet === 'AFORE' || carpet === 'INFONAVIT' || carpet === 'Tesoreria' ){
            updateDoc(userRef, ({
                ['Documentos' +'.Comprobantes' + `.${carpet}`]: arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Orders' && order ){
            updateDoc(userRef, ({
                ['Ordenes' + `.${order}`]: arrayRemove(currentDocData) 
            }))
        } else if (carpet){
            updateDoc(userRef, ({
                ['Documentos' + `.${carpet}`]: arrayRemove(currentDocData)
            }))
        } 
    

        if (docRef) {
            await deleteObject(docRef)
        }



        } catch(err){
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }


    }

    
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    

    return {deleteDoc , isPending}
}
