import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDoc } from "firebase/firestore"

createApp(App).mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyD44HyyUnZ-Z11RPR_WTq-tnH2idhydtX4",
  authDomain: "diapal-firebase.firebaseapp.com",
  projectId: "diapal-firebase",
  storageBucket: "diapal-firebase.appspot.com",
  messagingSenderId: "921369543580",
  appId: "1:921369543580:web:90d257c082ae684478fe59",
  measurementId: "G-HN2QM8C3BX"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('Logged inn')
    } else {
        console.log('No user')
    }
})
