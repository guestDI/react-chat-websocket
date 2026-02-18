const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { signIn, signUp } = require('../../database/firebase');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/login', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    const result = await signIn(username);
    
    // Преобразуй объект в массив и найди пользователя
    const users = Object.values(result);
    const user = users.find((row) => row?.username === username);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const token = jwt.sign(
      { userId: user.id, username: user.username, displayName: user.displayName },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    if (req.headers.origin && 
        ['http://localhost:3000', 'http://localhost:3001'].includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    
    return res.status(200).json({ username, token, id: user.id, displayName: user.displayName });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, displayName, email } = req.body;

    if (!username || !displayName || !email) {
      return res
        .status(400)
        .json({ error: 'Username, displayName, and email are required' });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: 'Username must be at least 3 characters' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const newUser = await signUp({ username, displayName, email });

    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    if (
      req.headers.origin &&
      ['http://localhost:3000', 'http://localhost:3001'].includes(
        req.headers.origin
      )
    ) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
      email: newUser.email,
      token,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Registration error:', error);

    if (error.message === 'Username already exists') {
      return res.status(409).json({ error: 'Username already exists' });
    }

    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
