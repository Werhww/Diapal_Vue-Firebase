<script setup lang="ts">
import { auth } from './firebase/index'
import { ref } from 'vue'
import { 
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const loggedIn = ref(false)

const Logout = () => {
  signOut(auth)
}

onAuthStateChanged(auth, (user)=>{
  if(user){
    console.log('user is logged in:', user)
    loggedIn.value = true
  } else{
    console.log('user is logged out', user)
    loggedIn.value = false
  }
})

</script>

<template>
  <header class="header">
    <router-link to="/">Home</router-link>
    <div>	
      <a href="#" @click="Logout" v-if="loggedIn">Logout</a>
      <a href="#" v-if="loggedIn">Account</a>
      <router-link to="/login" v-if="!loggedIn">Log in</router-link>
    </div>
  </header>
  <router-view/>
</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.header div{
  display: flex;
  gap: 1rem;
}
</style>