import { useState, useEffect } from 'react';
import { db, secondaryAuth, storageRef} from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable, } from 'firebase/storage';
import { doc, setDoc} from 'firebase/firestore';

export default function useRegister() {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    const registerUser = async (email, password, firstName, lastName) => {
        setError(null) 
        setIsPending(true)

        try {
            //signup user
            const res = await createUserWithEmailAndPassword(secondaryAuth, email, password, name, lastName)
            console.log("User " + res.user.uid + " created successfully!");

            if (!res){
                throw new Error('Could not register the new user')
            }

            // add display name to user
            await updateProfile(res.user, {displayName: firstName + '' + lastName })


            //add info to collection
            const userRef= await doc(db, 'users', res.user.uid);
            await setDoc(userRef, {email, firstName, lastName, credentials: 'user',})
            
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

    return {error, isPending, registerUser}
}



            // //add and store contracts
            // const docRef = ref(storageRef, `${res.user.uid}/`)
            // console.log(docArray.uri)
            
            // let contractRef = ref(docRef, docArray.name)

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
            //   xhr.open("GET", docArray.uri, true);
            //   xhr.send(null);
            // });
          
            //    uploadBytesResumable(contractRef, blob).then((snapshot) => {
            //        //console.log('File metadata:', snapshot.metadata);
            //        // Let's get a download URL for the file.
            //        getDownloadURL(snapshot.ref).then((url) => {
            //          console.log('File available at', url);
            //          setUrlArray(url)
            //          // ...
            //        });
            //      }).catch((error) => {
            //        console.error('Upload failed', error);
            //        setError(error)
            //        // ...
            //      });
            // // })