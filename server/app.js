//imports
const express = require('express');
const schema = require('./schema/schema')
//importing express graphql package
const {graphqlHTTP} = require('express-graphql');
//Enclosing in curly braces works and its destructured to const graphqlHTTP = require('express-graphql').graphqlHTTP; 

//initializing application
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //this allows us to use the graphiql client
}));




//Setting up Port 
const port = process.env.PORT || 2000
app.listen(port, ()=> {
    console.log(`now listening to requests on port ${port}`)
}) 
