<template>
    <div class="login-form">
        <div>
            <form 
                v-if="showLoginForm"
                @submit.prevent="loginEmailPassword"
            >
                <h1>Log in</h1>
                <input type="email" placeholder="Email" v-model="newUserEmail">
                <input type="password" placeholder="Password" v-model="newUserPassword">
                <button
                :disabled="!newUserEmail || !newUserPassword"
                >Log in</button>
            </form>

            <form 
                v-if="!showLoginForm"
                @submit.prevent="createAccont"
            >

                <h1>Sign up</h1>
                <input type="text" placeholder="Username" v-model="newUserUsername">
                <input type="email" placeholder="Email" v-model="newUserEmail">
                <input type="password" placeholder="Password" v-model="newUserPassword">
                <button
                :disabled="!newUserEmail || !newUserPassword || !newUserUsername"
                >Log in</button>
            </form>
            
            <a
            href="#"
            @click="showLoginForm = !showLoginForm"
            >Sign Up</a>
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
    updateProfile,
    signOut,
} from 'firebase/auth'
import { auth } from '../firebase/index' 


/* Firebase Authentification */

const showLoginForm = ref(true)

const newUserEmail = ref('')
const newUserPassword = ref('')
const newUserUsername = ref('')


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
        updateProfile(userCredential.user, { displayName: newUserUsername.value })
        console.log(userCredential.user)

    } catch (error) {
        console.log("There Were An Error")
        console.log(error)
    }
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

.login-form > div > form{
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