const express = require('express');
const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { signIn } = require('../../database/firebase');

router.post('/login', async (req, res) => {
  try {
    const { username } = req.body;
    const result = await signIn(username);
    const user = result.find((row) => row?.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: 'Authentication failed' });
    // }
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    //   expiresIn: '1h',
    // });
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (
      req.headers.origin &&
      ['http://localhost:3000', 'http://localhost:3001'].includes(
        req.headers.origin,
      )
    ) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log('ee', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
