<template>
  <div class="d-flex flex-column">
    <h6 v-if="!editTopic" class="header editable" v-on:click="edit_topic()">{{topic||'Welcome!'}}</h6>
    <div class="header input-group" v-if="editTopic">
      <input type="text" class="form-control" placeholder="Enter message" v-model="newtopic" v-on:keypress.enter.prevent="set_topic()">
      <button class="input-group-addon" v-on:click="set_topic()">Set Topic</button>
    </div>

    <div id="chatlist" class="fill">
      <div v-for="(chat, index) in chats" :key="index" class="p-2">
        <div class="username">{{chat.username}}</div>
        <span class="chat alert" :class="(chat.username==username) ? 'alert-light' : 'alert-primary'">{{chat.message}}</span>
      </div>
      <div class="p-2">
        <div class="alert alert-info" v-if="!loggedIn">
          Login to join the chat
        </div>
      </div>
    </div>

    <div class="header input-group" v-if="loggedIn">
      <input type="text" class="form-control" placeholder="Enter message" v-model="message" v-on:keypress.enter.prevent="send()">
      <button class="input-group-addon" v-on:click="send()">Send</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'welcome',
    data: function () {
      return {
        message: '',
        newtopic: '',
        editTopic: false
      }
    },
    computed: {
      ...mapState({
        topic: state => state.Firebase.topic,
        chats: state => state.Firebase.chats,
        loggedIn: state => state.Firebase.loggedIn,
        username: state => state.Firebase.username
      })
    },
    methods: {
      send () {
        this.$store.dispatch('add_chat', this.message).then(() => {
          this.message = ''
        })
      },
      edit_topic () {
        this.newtopic = this.topic
        this.editTopic = true
      },
      set_topic () {
        this.$store.dispatch('set_topic', this.newtopic)
        this.editTopic = false
      }
    },
    watch: {

    }
  }
</script>

<style>
  .username {
    font-size: 0.75em;
    opacity: 0.5;
  }
  .chat {
    display: inline-block;
  }
  .editable {
    cursor: text;
  }
</style>
