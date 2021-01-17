import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import {ApolloClient, gql, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  url: 'http://localhost:2000/graphql',
  cache: new InMemoryCache()
})

client
  .query({
    query: gql`
    {
       books{
        name
        genre
      }
    }
    `
  })
  .then(res => console.log(res))


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <BookList /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
