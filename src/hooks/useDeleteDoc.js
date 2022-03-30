import {useState, useEffect} from 'react'
import { doc, updateDoc, arrayRemove} from "firebase/firestore";
import { db, projectStorage} from '../firebase/config';
import { ref, deleteObject} from 'firebase/storage';



export default function useDeleteDoc() {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    

    const deleteDoc = async(id, currentDocData, carpet) => {
       
        try {
        const userRef= await doc(db, 'users', id);


        let docRef = await ref(projectStorage, `${currentDocData.url}`)
    
        

        if (carpet === 'Declaraciones Mensuales'){
            updateDoc(userRef, ({
                'Declaraciones Mensuales': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Declaraciones Anuales'){
            updateDoc(userRef, ({
                'Declaraciones Anuales': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Comprobantes IMSS'){
            updateDoc(userRef, ({
                'Comprobantes IMSS': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Comprobantes AFORE'){
            updateDoc(userRef, ({
                'Comprobantes AFORE': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Comprobantes INFONAVIT'){
            updateDoc(userRef, ({
                'Comprobantes INFONAVIT': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Comprobantes Tesoreria'){
            updateDoc(userRef, ({
                'Comprobantes Tesoreria': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Estados Financieros'){
            updateDoc(userRef, ({
                'Estados Financieros': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Constancia Situación Fiscal'){
            updateDoc(userRef, ({
                'Constancia Situación Fiscal': arrayRemove(currentDocData) 
            }))
        } else if (carpet === 'Opinión'){
            updateDoc(userRef, ({
                'Opinión': arrayRemove(currentDocData) 
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
    

    return {deleteDoc , isPending, success}
}
