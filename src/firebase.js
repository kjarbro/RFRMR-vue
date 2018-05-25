import {initializeApp} from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyAxLpcAs0ttaEMHgw8R53YInc2x3GtqaxI',
  authDomain: 'rfrmr-6d59e.firebaseapp.com',
  databaseURL: 'https://rfrmr-6d59e.firebaseio.com',
  projectId: 'rfrmr-6d59e',
  storageBucket: 'rfrmr-6d59e.appspot.com',
  messagingSenderId: '20026491897'
});

export const db = app.database();
export const seedsRef = db.ref('seeds');
export const sproutsRef = db.ref('sprouts');
export const usersRef = db.ref('rfrmrUser');
