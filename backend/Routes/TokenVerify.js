
const express = require('express');
const routerToken = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ================================================
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'].split(' ')[1];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
   
    req.role = decoded.role
    req.id = decoded.id
    next();
  });
};
routerToken.get('/club', verifyToken, (req, res) => {
  res.status(200).json({ id: req.id, role: req.role })
});
// ======================================================

const verifyTokenAdmin = (req, res, next) => {
  const token = req.headers['token-admin'].split(' ')[1];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.role = decoded.role
    req.id = decoded.id
    if(req.role !== 'Admin') return res.status(403).send({ auth: false, message: 'Unauthorized' });
    next();
  });
};


routerToken.get('/admin', verifyTokenAdmin, (req, res) => {
  res.status(200).json({ id: req.id, role: req.role })
});


module.exports = routerToken;

