<template>
  <div>
    <div>Sign up new user</div>
    <div>
      <input type="text"
        v-model="newUser"
        @keyup.enter="addUser">
      <button  @click="addUser">
        Add User
      </button>
    </div>
    <div class="titleList">List current users</div>
    <ul class="userList">
      <li v-for="user in users" :key="user.name">
        {{ user.name }} - {{user.relationship}}
        <button @click="deleteUser(user)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '../config/firebase';

export default {
  name: "SignUp",
  props: {
    users: Array
  },
  data() {
    return {
      newUser: ''
    }
  },
  methods: {
    addUser: function() {
      db.collection('users')
      .add(
        {
          name: this.newUser,
          relationship: []
        }
      );
      this.newUser = '';
    },
    deleteUser: function(user) {
      db.collection('users').doc(user['.key']).delete();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .userList {
    list-style: none;
    padding: 0;
  }
  .titleList {
    color: rgb(38, 0, 255);
    padding-top: 20px;
  }
</style>
