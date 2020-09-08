//imports
const express = require('express');
const schema = require('./schema/schema')
const mongoose  = require('mongoose')
//importing express graphql package
const {graphqlHTTP} = require('express-graphql');
//Enclosing in curly braces works and its destructured to const graphqlHTTP = require('express-graphql').graphqlHTTP; 


//initializing application
const app = express()

//connecting to the database
mongoose.connect('{mongoDB_connection_string}', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', ()=> {
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //this allows us to use the graphiql client
}));




//Setting up Port 
const port = process.env.PORT || 2000
app.listen(port, ()=> {
    console.log(`now listening to requests on port ${port}`)
}) 
