const { initializeApp } = require('@firebase/app')

const firebaseConfig = {
  apiKey: 'AIzaSyDYdaZvG5wjEOxR36lUqT7XY-b5N7oSVsY',
  authDomain: 'data-cycle-361207.firebaseapp.com',
  projectId: 'data-cycle-361207',
  storageBucket: 'data-cycle-361207.appspot.com',
  messagingSenderId: '10635649137',
  appId: '1:10635649137:web:35611f20af5f41cb217bd0',
}

const app = initializeApp(firebaseConfig)

module.exports = app
