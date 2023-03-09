
<template>
  <main class="loginforum">
    <div>
      <input id="textEmail" type="email">
      <label>Email</label>
    </div>
    <div>
      <input id="txtpassword" type="password">
      <label>password</label>
    </div>
    <div>
      <button id="login">Log in</button>
    </div>
    <div>
      <button id="signup">Sign up</button>
    </div>
    
  </main>
</template>

<style scoped>
.loginforum {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
}
</style>
