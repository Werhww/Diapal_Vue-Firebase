<template>
    <form
    class="login-form"
    @submit.prevent="loginEmailPassword"
    >
        <h1>Sign in</h1>

        <div>
            <input type="email" placeholder="Email" v-model="newUserEmail">
            <input type="password" placeholder="Password" v-model="newUserPassword">
            <button>Sign in</button>
        </div>
    </form>
</template>

<script setup lang="ts">
    /* 
        Imports
    */

    import { ref } from 'vue'
    import { connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth'
    import { auth } from '@/firebase' 

    
    /* 
        Firebase Authentification
    */
    const newUserEmail = ref('')
    const newUserPassword = ref('')


    connectAuthEmulator(auth, 'http://localhost:9099')

    const loginEmailPassword = async () => {
        const loginEmail = newUserEmail.value
        const loginPassword = newUserPassword.value

        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

        console.log(userCredential.user)
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