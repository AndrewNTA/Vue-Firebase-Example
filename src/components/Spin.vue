<template>
  <div class="spinspin">
    <h1 class="titleSpin">Spin Spin - Go to coffee now !!!</h1>
    <div>
      <h2 class="titleInput">Please input your name</h2>
      <input type="text"
        v-model="member"
        @keyup.enter="spinCoffee">
      <button  @click="spinCoffee" class="spinBtn">
        Spin Spin
      </button>
      <p>{{result}}</p>
    </div>
  </div>
</template>

<script>
import { random, difference, isEmpty, isNull } from 'lodash';
import { db } from '../config/firebase';

const usersDB = db.collection('users');

const suggestCoffee = (allUsersList, availableUsersList) => {
  const suggestList = difference(allUsersList, availableUsersList);
  if(isEmpty(suggestList)) {
    return null;
  }
  const maxIndex = suggestList.length - 1;
  const index = random(0, maxIndex);
  return suggestList[index];
};

export default {
  name: "Spin",
  data() {
    return {
      member: '',
      result: ''
    }
  },
  methods: {
    spinCoffee: function() {
      let allUsersName = [];
      let suggestMember = null;
      usersDB.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allUsersName = [...allUsersName, doc.data().name];
        });
      });

      usersDB
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { name, relationship } = doc.data();
          if(name === this.member) {
            const timesCoffee = relationship.length + 1;
            suggestMember = suggestCoffee(allUsersName, [...relationship, name]);
            if(isNull(suggestMember)) {
              this.result = 'You\'ve already caffeinated with everyone!';
              this.member = '';
            } else {
              usersDB.doc(doc.id).update({ relationship: [...relationship, suggestMember]});
              this.result = `Get coffee with: ${suggestMember},
                here's how many times you've had coffee with them: ${timesCoffee}`;
              this.member = '';              
            }
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spinspin {
    margin-bottom: 50px;
  }
  .spinBtn {
    margin-left: 20px;
  }
  .titleSpin {
    color: brown;
    padding-top: 20px;
  }
  .titleInput {
    font-weight: 600;
  }
</style>
