import {useState, useEffect} from 'react'
import { doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db, storageRef} from '../firebase/config';
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';


export default function useUploadDoc() {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const [docArray, setDocArray] = useState([])

    const [documents, setDocuments] = useState([])
    const [userRef, setUserRef] = useState([])
    const [carpet, setCarpet] = useState()

    const [counter, setCounter] = useState(0)

    

    useEffect(() => {
        
        if (docArray.length > 0){
            
            setSuccess(false)
            if (carpet === 'Mensuales' || carpet === 'Anuales' ){
                updateDoc(userRef, ({
                    ['Documentos' +'.Declaraciones' + `.${carpet}`]: arrayUnion(...docArray) 
                }))
            } else if (carpet === 'IMSS' || carpet === 'AFORE' || carpet === 'INFONAVIT' || carpet === 'Tesoreria' ){
                updateDoc(userRef, ({
                    ['Documentos' +'.Comprobantes' + `.${carpet}`]: arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Estados Financieros' || carpet === 'Constancia'){
                updateDoc(userRef, ({
                    ['Documentos' + `.${carpet}`]: arrayUnion(...docArray)
                }))
            }  else if (carpet === 'Opinión'){
                return; 
            }
            setCounter(counter + 1)   
        }

        if (documents.length > 0 && counter === documents.length) {
            setSuccess(true)
        }
        
        
      }, [docArray, documents, isPending])

    

    const addDocuments= async(id, carpet, documents) => {
        setSuccess(false)
        setError(null)
        setIsPending(true)
        setDocuments(documents)
        setCarpet(carpet)

        console.log(id, carpet, documents)


        const userRef= await doc(db, 'users', id );


        await setUserRef(userRef)
       
        
        //add and store contract
        const docRef = await ref(storageRef, `${id}/${carpet}/`)

        
        

        

        try {
        
          
        
        documents.map(async(file) => {

            console.log(file.name)

            let contractRef = await ref(docRef, `/${file.name}`)

            uploadBytes(contractRef, file).then(async(snapshot) => {
                // Let's get a download URL for the file.
                await getDownloadURL(snapshot.ref).then((url) => {
                    console.log('File available at', url);
                if(url != null){
                    setDocArray([...docArray, {
                        docName: file.name,
                        url: (url)
                    }])
                    console.log(docArray)
                    setIsPending(false)
                    
                }
                });
                }).catch((error) => {
                console.error('Upload failed', error);
                setError(error)
                });
        })

        } catch(err){
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

        return {userRef, documents}
    }

    
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    

    return {addDocuments , error, isPending, success}
}
