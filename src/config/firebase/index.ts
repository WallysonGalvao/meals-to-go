import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAPk75Hx9XxoPqOWW-pgZZbcqH2YUX4ObI',
  authDomain: 'mealstogo-cd7bc.firebaseapp.com',
  projectId: 'mealstogo-cd7bc',
  storageBucket: 'mealstogo-cd7bc.appspot.com',
  messagingSenderId: '662836931070',
  appId: '1:662836931070:web:98e489e3990920bee0b8af',
  measurementId: 'G-QZVY50BPW4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
