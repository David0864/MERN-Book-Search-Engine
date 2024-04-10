const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { secret, expiration } = require('../config/connection'); 

module.exports = {
  authMiddleware: function (context) {
    let token = context.req.headers.authorization;

    if (token) {
      token = token.split(' ').pop().trim();
    } else {
      throw new AuthenticationError('You must provide a token');
    }

    if (!token) {
      throw new AuthenticationError('Authentication token is missing');
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      
      context.user = data;
    } catch (err) {
      throw new AuthenticationError('Invalid token');
    }

    return context;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
