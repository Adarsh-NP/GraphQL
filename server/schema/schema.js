const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql


//designing the schema



//dummy data
let books = [

    {
        name:'The Jungle Book',
        genre: 'Kids',
        id:'1',
        authId: '1'
    },
    {
        name:'The Alchemist',
        genre: 'Men',
        id:'2',
        authId: '2'
    },
    {
        name:'Problems in general Physics',
        genre: 'Legends',
        id:'3',
        authId: '3'
    },
    {
        name:'The Rich and the poor',
        genre: 'Men',
        id:'2',
        authId: '2'
    },
    {
        name:'Problems in quantum mechanics',
        genre: 'Physics Legends',
        id:'3',
        authId: '3'
    },
]
let authors = [

    {
        name:'Mowgli',
        age: 34,
        id:'1'
    },
    {
        name:'Stan',
        age: 38,
        id:'2'
    },
    {
        name:'IE Irodov',
        age: 90,
        id:'3'
    },
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authId: {type: GraphQLID},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id:parent.authId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                args.id
                //querying the data from the database / other sources
               return _.find(books, {id:args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                args.id
                //querying the data from the database / other sources
               return _.find(authors, {id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})