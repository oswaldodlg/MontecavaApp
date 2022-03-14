import { useState, useEffect } from 'react'
import { db, secondaryAuth, projectStorage, storageRef} from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes, uploadString, } from 'firebase/storage';
import { useAuthContext } from './useAuthContext';
import { collection, doc, setDoc} from 'firebase/firestore';


// https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551

export const useRegisterUser= () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const [urlArray, setUrlArray] = useState([])


    getBlob= (uri, mime) => {
      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          // .then((blob) => {
          //   uploadBlob = blob
          //   return imageRef.put(blob, { contentType: mime })
          // })
          // .then(() => {
          //   uploadBlob.close()
          //   return getDownloadURL()
          // })
          // .then((url) => {
          //   resolve(url)
          // })
          .catch((error) => {
            reject(error)
        })
      })
    }

    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {
    
          const xhr = new XMLHttpRequest();
    
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };
          
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
    
          // this helps us get a blob
          xhr.responseType = 'blob';
    
          xhr.open('GET', uri, true);
          xhr.send(null);
    
        });
    
      }

    const registerUser = async (email, password, name, lastName, initialDate, finalDate, amount, term, modality, docArray) => {
        setError(null) 
        setIsPending(true)

        try {
            //signup user
            const res = await createUserWithEmailAndPassword(secondaryAuth, email, password)
            console.log("User " + res.user.uid + " created successfully!");

            if (!res){
                throw new Error('Could not register the new user')
            }

            // add display name to user
            await updateProfile(res.user, {displayName: name})
            
            
            //add and store contracts
            const docRef = ref(storageRef, `${res.user.uid}/`)
            console.log(docArray.uri)
            
            let contractRef = ref(docRef, docArray.name)

            const blob = await new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.onload = function () {
                resolve(xhr.response);
              };
              xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
              };
              xhr.responseType = "blob";
              xhr.open("GET", docArray.uri, true);
              xhr.send(null);
            });
          
               uploadBytesResumable(contractRef, blob).then((snapshot) => {
                   //console.log('File metadata:', snapshot.metadata);
                   // Let's get a download URL for the file.
                   getDownloadURL(snapshot.ref).then((url) => {
                     console.log('File available at', url);
                     setUrlArray(url)
                     // ...
                   });
                 }).catch((error) => {
                   console.error('Upload failed', error);
                   setError(error)
                   // ...
                 });
            // })


            //add info to collection
            console.log(docArray)
            const userRef= await doc(db, 'users', res.user.uid);
            await setDoc(userRef, {email, name, lastName, initialDate, finalDate, amount, term, modality, credentials: 'user', contratos: urlArray})
            
            await signOut(secondaryAuth)

            if (!isCancelled){
                setIsPending(false)
                setError(null)
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


    return {error, isPending, registerUser}
}