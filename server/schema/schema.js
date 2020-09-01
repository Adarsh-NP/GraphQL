const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql


//designing the schema

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

//dummy data
const books = [

    {
        name:'The Jungle Book',
        genre: 'Kids',
        id:'1'
    },
    {
        name:'The Alchemist',
        genre: 'Men',
        id:'2'
    },
    {
        name:'Problems in general Physics',
        genre: 'Legends',
        id:'3'
    },
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                args.id
                //querying the data from the database / other sources
               return _.find(books, {id:args.id})
            }
        }
    }
})

module.export = new GraphQLSchema({
    query: RootQuery
})