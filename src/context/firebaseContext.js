import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseAUTH } from '../firebase';

// Create Context
const FirebaseContext = createContext();

// This function will help Comp to use Firebase
export const useFirebase = () => {
    return useContext(FirebaseContext);
}

// Create a Firebase provider func comp which serves userdata to its children
export const FirebaseProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = firebaseAUTH.onAuthStateChanged((user) => {
            setLoading(false);
            setCurrentUser(user);
        });
        return unsubscribe
      }, []);

    // Login
    const login = (email, password) => {
        return firebaseAUTH.signInWithEmailAndPassword(email, password);
    }
    const signUp = (email,password) => {
        return firebaseAUTH.createUserWithEmailAndPassword(email, password)
    }

    const signOut = () => {
        localStorage.removeItem('uid');
        return firebaseAUTH.signOut();
    }
    
    const value = {
        user: currentUser,
        login,
        signUp,
        signOut
    }

    return(
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContext;
