import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9MkcTYz5qRIMGWihTnirhlqPLS6218eg",
  authDomain: "task-1726f.firebaseapp.com",
  projectId: "task-1726f",
  storageBucket: "task-1726f.appspot.com",
  messagingSenderId: "956035894763",
  appId: "1:956035894763:web:9dbd18b93d81ce96071dae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {app, auth};