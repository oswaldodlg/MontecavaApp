import {useState, useEffect} from 'react'
import { doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db, storageRef} from '../firebase/config';
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';


export default function useUploadDoc() {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    

    const addDocuments= async(id, carpet, documents) => {
        setSuccess(false)
        setError(null)
        setIsPending(true)

        console.log(id, carpet, documents)

        try {
        
        const userRef= await doc(db, 'users', id);

       
        
        //add and store contract
        const docRef = ref(storageRef, `${id}/${carpet}/`)
        
                
      
        
        documents.map((file) => {
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

            console.log(file)

            let contractRef = ref(docRef, `/${file.file.name}`)

            uploadBytes(contractRef, file.file, file.metadata).then(async(snapshot) => {
                // Let's get a download URL for the file.
                await getDownloadURL(snapshot.ref).then((url) => {
                    console.log('File available at', url);
                if(url != null){
                    if (carpet === 'Declaraciones Mensuales'){
                        updateDoc(userRef, {
                            'Documentos': 
                            arrayUnion({
                                'DeclaracionesMensuales' : {
                                   docName: file.file.name,
                                   url: (url)
                                }
                            }) 
                        })
                    } 
                    // else if (carper === 'Declaraciones Anuales'){
                    //     updateDoc(userRef, {
                    //         documents: {
                    //             doc : url
                    //         } 
                    //     })
                    // }
                    
                    setIsPending(false)
                    setSuccess(true)
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


    }

    
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    

    return {addDocuments , error, isPending, success}
}
