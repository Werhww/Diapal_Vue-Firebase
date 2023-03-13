<template>
    <div class="login-form">
        <h1>Sign in</h1>

        <div>
            <input type="email" placeholder="Email" v-model="newUserEmail">
            <input type="password" placeholder="Password" v-model="newUserPassword">
            <button
            @click="loginEmailPassword"
            :disabled="!newUserEmail || !newUserPassword"
            >Log in</button>

            <button
            @click="createAccont"
            :disabled="!newUserEmail || !newUserPassword"
            >Sign Up</button>
        </div>
    </div>
</template>

<script setup lang="ts">

/* 
    Imports
*/

import { ref } from 'vue'
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,

    /* Authenticator Emulator */
    connectAuthEmulator, 
} from 'firebase/auth'
import { auth } from '../firebase/index' 

(auth as unknown as any)._canInitEmulator = true;
/* 
    Firebase Authentification
*/
const newUserEmail = ref('')
const newUserPassword = ref('')

/* Authenticator Emulator */
connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
    disableWarnings: true,
})



const loginEmailPassword = async () => {
    const loginEmail = newUserEmail.value
    const loginPassword = newUserPassword.value

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        console.log(userCredential.user) 
    } catch (error) {
        console.log("There Were An Error")
        console.log(error)
    }
}

const createAccont = async () => {
    const loginEmail = newUserEmail.value
    const loginPassword = newUserPassword.value

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
        console.log(userCredential.user)

    } catch (error) {
        console.log("There Were An Error")
        console.log(error)
    }
}

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if(user) {
            console.log(user)
            location.href = '/'
        } 
        else {
            /* showLoginForm() */
        }
    })
}

</script>

<style scoped>
.login-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-form > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.login-form > div input{
    width: 20rem;
    height: 2.8rem;
    border-radius: .5rem;
    padding: 0.3rem;

    border: 2px solid lightgray;
    font-size: 1.25rem;
}

.login-form > div input:focus{
    outline: none;
    border: 2px solid gray;
}


.login-form > div button{
    width: 20rem;
    height: 3.5rem;
    border-radius: .5rem;
    font-size: 1.25rem;

    border: none;
    background-color: #005eff;
    color: #fff;
}

.login-form > div button:hover{
    cursor: pointer;
}

</style>