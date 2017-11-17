<template>
  <div class="d-flex flex-column">
    <h6 class="header">Chatroom</h6>
    <ul class="list-group fill">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(user, index) in users" :key="index">
        {{user.name}}
        <span class="badge badge-primary badge-pill">{{user.badge}}</span>
      </li>
    </ul>
    <div class="header input-group flex1" v-if="!loggedIn">
      <input class="form-control" v-model="username" placeholder="Enter Username" v-on:keypress.enter.prevent="login()">
      <button v-on:click="login()" class="input-group-addon">Login</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'friends-list',
    data: function () {
      return {
        username: ''
      }
    },

    computed: {
      ...mapState({
        users: state => state.Firebase.users,
        loggedIn: state => state.Firebase.loggedIn
      })
    },
    methods: {
      login () {
        if (!this.username || this.username.length < 3) {
          alert('Username too short')
          return
        }
        this.$store.dispatch('login', this.username)
      }
    }
  }
</script>

<style>
  .list-group-item {
    border-radius: 0 !important;
    border-width: 0 0 1px 0 !important;
    margin: 0;
    min-height: 44px !important;
  }
</style>
