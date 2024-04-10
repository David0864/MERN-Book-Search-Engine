import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
      </Router>
    </ApolloProvider>
  );
}

export default App;
