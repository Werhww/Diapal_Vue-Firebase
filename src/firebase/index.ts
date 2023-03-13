// Firebase stuff ///
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD44HyyUnZ-Z11RPR_WTq-tnH2idhydtX4',
  authDomain: 'diapal-firebase.firebaseapp.com',
  projectId: 'diapal-firebase',
  storageBucket: 'diapal-firebase.appspot.com',
  messagingSenderId: '921369543580',
  appId: '1:921369543580:web:90d257c082ae684478fe59',
  measurementId: 'G-HN2QM8C3BX'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Emulator stuff ///
const emulatorDB = getFirestore()

export { db, auth, emulatorDB }