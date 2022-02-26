import  {initializeApp} from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import 'firebase/storage';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDRV4JO93Bb90m74P2__oHTWxs_qIUn8AA",
    authDomain: "montecavaapp-7bcee.firebaseapp.com",
    projectId: "montecavaapp-7bcee",
    storageBucket: "montecavaapp-7bcee.appspot.com",
    messagingSenderId: "719527505966",
    appId: "1:719527505966:web:b80e93bb570a55a13f2fbf",
    measurementId: "G-BWT82WW5FN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, 'secondary');

// init services
//const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth()
const secondaryAuth = getAuth(secondaryApp)

const projectStorage = getStorage()
// const createUser = createUserWithEmailAndPassword()

// collection ref
const colRef = collection(db, 'users')

//storage ref
const storageRef = ref(projectStorage)

// get colection data
const colData= getDocs(colRef)
    


//exports
export { db, colData, auth, projectStorage, storageRef, secondaryApp, secondaryAuth}