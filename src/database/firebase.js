const {
  getDatabase,
  query,
  ref,
  orderByChild,
  equalTo,
  get,
  set,
  limitToFirst,
} = require('firebase/database');
require('dotenv').config();

const NOT_FOUND = 'NOT_FOUND';

const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: `${process.env.REACT_API_KEY}`,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL:
    'https://websocket-chat-ff59e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

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

const signUp = async (userData) => {
  const { username, displayName, email } = userData;

  const existingUser = await signIn(username);
  if (existingUser !== NOT_FOUND) {
    throw new Error('Username already exists');
  }

  try {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newUser = {
      id: userId,
      username,
      displayName,
      email,
      createdAt: new Date().toISOString(),
    };


    await set(ref(db, `users/${userId}`), newUser);

    console.log('User registered successfully:', userId);
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const initializeChannels = async () => {
  const channelsRef = ref(db, 'channels');
  const snapshot = await get(channelsRef);

  if (snapshot.exists()) {
    console.log('Channels already exist');
    return;
  }

  const defaultChannels = [
    {
      id: 'general',
      name: 'General',
      description: 'General discussion channel',
      createdAt: new Date().toISOString(),
      participants: {},
    },
    {
      id: 'random',
      name: 'Random',
      description: 'Random topics',
      createdAt: new Date().toISOString(),
      participants: {},
    },
    {
      id: 'announcements',
      name: 'Announcements',
      description: 'Important announcements',
      createdAt: new Date().toISOString(),
      participants: {},
    },
    {
      id: 'help',
      name: 'Help',
      description: 'Ask for help here',
      createdAt: new Date().toISOString(),
      participants: {},
    },
  ];

  try {
    for (const channel of defaultChannels) {
      await set(ref(db, `channels/${channel.id}`), channel);
    }
    console.log('Channels initialized successfully');
  } catch (error) {
    console.error('Error initializing channels:', error);
  }
};

module.exports = {
  db,
  signIn,
  signUp,
  initializeChannels,
};