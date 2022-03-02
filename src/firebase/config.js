import  {initializeApp} from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import 'firebase/storage';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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