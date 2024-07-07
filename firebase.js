// Firebase Backend
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA5wG1HtkFweADcxnzexi8HG4KMyNS93zA",
    authDomain: "dishduo-authentication.firebaseapp.com",
    projectId: "dishduo-authentication",
    storageBucket: "dishduo-authentication.appspot.com",
    messagingSenderId: "730353220777",
    appId: "1:730353220777:web:61f4818d6ef9cac0707db8",
    measurementId: "G-90GBYY3NLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
