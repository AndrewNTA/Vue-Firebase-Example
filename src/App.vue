<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <SignUp :users="users"/>
    <Spin/>
  </div>
</template>

<script>
  import { db } from './config/firebase';
  import SignUp from './components/SignUp.vue'
  import Spin from './components/Spin.vue'

  export default {
    name: 'app',
    data() {
      return {
        users: []
      }
    },
    components: {
      SignUp,
      Spin
    },
    firestore() {
      return {
        users: db.collection('users'),
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .logo {
    width: 250px;
  }
</style>
