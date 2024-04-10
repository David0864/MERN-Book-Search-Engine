// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const connectDB = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

async function startServer() {
  await connectDB(); // Call the connectDB function here

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch(err => console.error('Error starting server:', err));
