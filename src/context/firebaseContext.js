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
    const [authState, setAuthState] = useState(() => {
        return localStorage.getItem("uid") ? localStorage.getItem("uid") : null
    });
    // Get LoggedIn user UID whichs helps to get users Field, Labour, Tractor, Pesticdes expenses
    const [userUID, setUserUID] = useState(localStorage.getItem("uid"));

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

    const signOut = async () => {
        localStorage.removeItem("uid");
        setAuthState(null);
        return firebaseAUTH.signOut();
    }

    // Save unique ID in Local storage
    const setUIDInLocalStorage = async (uid) => {
        localStorage.setItem("uid", uid);
        setAuthState(uid);
        setUserUID(uid);
    }
    
    const value = {
        user: currentUser,
        login,
        signUp,
        signOut,
        authState,
        setUIDInLocalStorage,
        userUID
    }

    return(
        <FirebaseContext.Provider value={value}>
            {!loading && children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContext;
