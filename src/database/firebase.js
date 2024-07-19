const {
  getDatabase,
  query,
  ref,
  orderByChild,
  equalTo,
  get,
  limitToFirst,
} = require('firebase/database');
require('dotenv').config();

const NOT_FOUND = 'NOT_FOUND';

// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_API_KEY}`,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL:
    'https://chat-app-dc0cd-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const signIn = async (username) => {
  const usersRef = ref(db, 'users');
  const usersQuery = query(
    usersRef,
    orderByChild('username'),
    equalTo(username),
    limitToFirst(1),
  );

  return get(usersQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      } else {
        return NOT_FOUND;
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return error;
    });
};

module.exports = {
  db,
  signIn,
};
