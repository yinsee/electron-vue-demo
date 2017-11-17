
// import firebase
// import { EventEmitter } from 'events'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyASp83HdxN25_g3FJfnTDwQtggNL7Y8nFE',
  authDomain: 'vuedemo-47094.firebaseapp.com',
  databaseURL: 'https://vuedemo-47094.firebaseio.com',
  projectId: 'vuedemo-47094',
  storageBucket: 'vuedemo-47094.appspot.com',
  messagingSenderId: '549626048649'
}
firebase.initializeApp(config)
const db = firebase.database()
const usersRef = db.ref('users')
const topicRef = db.ref('topic')
const chatsRef = db.ref('chats')

usersRef.on('value', (snapshot) => {
  mutations.set_users(state, snapshot.val())
})

topicRef.on('value', (snapshot) => {
  mutations.set_topic(state, snapshot.val())
})

chatsRef.limitToLast(5).on('child_added', (snapshot) => {
  mutations.new_chat(state, snapshot.val())
})
// })

// end import firebase
const state = {
  username: '',
  loggedIn: false,
  topic: 'Chatroom',
  users: [],
  chats: []
}

const mutations = {

  set_topic (state, topic) {
    state.topic = topic
  },

  set_users (state, users) {
    state.users = users
  },

  set_chats (state, chats) {
    state.chats = chats
  },

  new_chat (state, chat) {
    state.chats.push(chat)
  },

  set_username (state, username) {
    state.username = username
    state.loggedIn = true
  }
}

const actions = {

  login (context, username) {
    db.ref('users/' + username).set({ name: username, badge: '' })
    context.commit('set_username', username)
  },

  add_chat (context, message) {
    chatsRef.push({ username: state.username, message: message })
  },

  set_topic (context, topic) {
    topicRef.set(topic)
  }
}

export default {
  state,
  actions,
  mutations
}
