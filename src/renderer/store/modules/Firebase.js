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

// add a little SQLITE
const Database = require('better-sqlite3')
var sqldb = new Database('app.sqlite')
sqldb.exec('create table if not exists storage (name char(100), value char(100))')
var username = sqldb.prepare('select * from storage where name=?').get('username')

// end import firebase
const state = {
  username: username ? username.value : '',
  loggedIn: (username !== undefined),
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
    sqldb.prepare('insert or replace into storage (name, value) values (?, ?)').run('username', username)
  },

  unset_username (state, username) {
    state.username = ''
    state.loggedIn = false
    sqldb.prepare('delete from storage where name=?').run('username')
  }
}

const actions = {

  login (context, username) {
    db.ref('users/' + username).set({ name: username, badge: '' })
    context.commit('set_username', username)
  },

  logout (context) {
    db.ref('users/' + state.username).remove((error) => {
      console.log('delete', error)
    })
    context.commit('unset_username')
  },

  add_chat (context, message) {
    chatsRef.push({ username: state.username, message: message })
  },

  set_topic (context, topic) {
    topicRef.set(topic)
  },

  init_firebase (context) {
    usersRef.on('value', (snapshot) => {
      context.commit('set_users', snapshot.val())
      // mutations.set_users(state, snapshot.val())
    })

    topicRef.on('value', (snapshot) => {
      context.commit('set_topic', snapshot.val())
      // mutations.set_topic(state, snapshot.val())
    })

    chatsRef.limitToLast(5).on('child_added', (snapshot) => {
      context.commit('new_chat', snapshot.val())
      // mutations.new_chat(state, snapshot.val())
    })
  }
}

export default {
  state,
  actions,
  mutations
}
