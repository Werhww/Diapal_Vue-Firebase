<template>
  <header class="header">
    <router-link to="/">Home</router-link>
    <div>	
      <a href="#">Logout</a>
      <a href="#">Account</a>
      <router-link to="/login">Log in</router-link>
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