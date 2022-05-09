import {useState, useEffect} from 'react';
import { db } from '../firebase/config';
import { auth } from "../firebase/config";

//firebase Imports
import {collection, doc, getDoc, onSnapshot} from 'firebase/firestore'
import { useRouter } from 'next/router';
import { CollectionsOutlined } from '@mui/icons-material';

export const useGetData = (c, id) => {

    const router = useRouter()

    const [data, setData] = useState(null)
    

    useEffect(() => {

        const getData = async() => {
            try{
                console.log(c, id)
                let ref = collection(db, c)
                let docRef = doc(ref, id) 
                return getDoc(docRef).then(async(doc) => setData(doc.data()))
            } catch{
                return setData(null);
            }
           
        }        

        console.log(data)
        return getRole()
    }, [c, id])

    useEffect(() => {
      console.log(data)
    }, [data])
    
    

    
    
    return ({data})
}