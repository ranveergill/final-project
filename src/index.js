import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./App"
import firebase from "firebase/app"
import { firebaseConfig } from "./secrets"

const firebaseApp = firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)
