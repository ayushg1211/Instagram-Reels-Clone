import React, {useState, useEffect} from 'react'
import {auth} from "../firebase" 
export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true) ;
    
    const signUp = (email, password)=>{
        return auth.createUserWithEmailAndPassword(email, password) ;
    }
    const logIn = (email, password)=>{
        return auth.signInWithEmailAndPassword(email, password) ;
    }
    const logOut = (email, password)=>{
        return auth.signOut() ;
    }
    
    const sendEmail = (email)=>{  // for Forgot password
        return auth.sendPasswordResetEmail(email) ;
    }

     
    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user) ;
            setLoading(false) ;
        })
        return()=>{
            unsub() ;
        }
    },[])

    const store={
        user,
        signUp,
        logIn,
        logOut,
        sendEmail
    }
  return (
    <AuthContext.Provider value={store}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider