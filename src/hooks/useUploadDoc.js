import {useState, useEffect} from 'react'
import { doc, updateDoc, arrayUnion, setDoc} from "firebase/firestore";
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

    useEffect(() => {
        console.log(docArray)
        
        if (docArray.length > 0){
           
            if (carpet === 'Declaraciones Mensuales'){
                updateDoc(userRef, ({
                    'Declaraciones Mensuales': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Declaraciones Anuales'){
                updateDoc(userRef, ({
                    'Declaraciones Anuales': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Comprobantes IMSS'){
                updateDoc(userRef, ({
                    'Comprobantes IMSS': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Comprobantes AFORE'){
                updateDoc(userRef, ({
                    'Comprobantes AFORE': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Comprobantes INFONAVIT'){
                updateDoc(userRef, ({
                    'Comprobantes INFONAVIT': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Comprobantes Tesoreria'){
                updateDoc(userRef, ({
                    'Comprobantes Tesoreria': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Estados Financieros'){
                updateDoc(userRef, ({
                    'Estados Financieros': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Constancia Situación Fiscal'){
                updateDoc(userRef, ({
                    'Constancia Situación Fiscal': arrayUnion(...docArray) 
                }))
            } else if (carpet === 'Opinión'){
                updateDoc(userRef, ({
                    'Opinión': arrayUnion(...docArray) 
                }))
            } 
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

        setUserRef(userRef)
       
        
        //add and store contract
        const docRef = await ref(storageRef, `${id}/${carpet}/`)

        
        

        

        try {
        
          
        
        documents.map(async(file) => {
            //convert files path to blobs

            // const blob = await new Promise((resolve, reject) => {
            //   const xhr = new XMLHttpRequest();
            //   xhr.onload = function () {
            //     resolve(xhr.response);
            //   };
            //   xhr.onerror = function (e) {
            //     console.log(e);
            //     reject(new TypeError("Network request failed"));
            //   };
            //   xhr.responseType = "blob";
            //   xhr.open("GET", file, true);
            //   xhr.send(null);
            // });

            console.log(file.name)

            let contractRef = await ref(docRef, `/${file.name}`)

            uploadBytes(contractRef, file).then(async(snapshot) => {
                // Let's get a download URL for the file.
                await getDownloadURL(snapshot.ref).then(async(url) => {
                    console.log('File available at', url);
                if(url != null){
                    await setDocArray([...docArray, {
                        docName: file.name,
                        url: (url)
                    }])
                    setIsPending(false)
                if (docArray.length === documents.length){
                    setSuccess(true)
                }
                    
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
