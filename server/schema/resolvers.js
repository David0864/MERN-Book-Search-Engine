const { AuthenticationError } = require('apollo-server-express');
const UserController = require('../controllers/user-controller');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await UserController.getSingleUser({ user: context.user }, {});
      }
      throw new AuthenticationError('You must be logged in to view this information.');
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      return await UserController.login({ body: { email, password } }, {});
    },
    addUser: async (_, { username, email, password }) => {
      return await UserController.createUser({ body: { username, email, password } }, {});
    },
    saveBook: async (_, { bookData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to save a book.');
      }
      return await UserController.saveBook({ user: context.user, body: bookData }, {});
    },
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to remove a book.');
      }
      return await UserController.deleteBook({ user: context.user, params: { bookId } }, {});
    },
  },
};

module.exports = resolvers;
