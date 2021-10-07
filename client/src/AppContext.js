import React, { createContext, useEffect, useState } from "react"
import withFirebaseAuth from "react-with-firebase-auth"
import "firebase/auth"
import { useHistory } from "react-router-dom"
import firebaseApp from "./firebase"

import { v4 as uuidv4 } from "uuid"

export const AppContext = createContext(null)

const firebaseAppAuth = firebaseApp.auth(firebaseApp)

const providers = {
    googleProvider: new firebaseApp.auth.GoogleAuthProvider(),
}

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
    const [appUser, setAppUser] = useState({})
    const [message, setMessage] = useState("")
    let history = useHistory()

    const handleSignOut = () => {
        signOut()
        setAppUser({})
        history.push(`/`)
    }

    useEffect(() => {
        if (user) {
            fetch(`/users`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    handle: user.displayName,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    setAppUser(json.data)
                    setMessage(json.message)
                })
        }
    }, [user])

    return (
        <AppContext.Provider
            value={{ appUser, signInWithGoogle, message, handleSignOut }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(AppProvider)
