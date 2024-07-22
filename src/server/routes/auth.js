const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { signIn } = require('../../database/firebase');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/login', async (req, res) => {
  try {
    const { username } = req.body;
    const result = await signIn(username);
    const user = result.find((row) => row?.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'your-secret-key',
      {
        expiresIn: '1h',
      },
    );

    if (
      req.headers.origin &&
      ['http://localhost:3000', 'http://localhost:3001'].includes(
        req.headers.origin,
      )
    ) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    return res.status(200).json({ username, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
