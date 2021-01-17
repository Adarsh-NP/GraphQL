const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLNonNull , GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

//model imports
const Book = require('../models/book')
const Author = require('../models/author')
const { find } = require('../models/book')




//designing the schema
//dummy data
// let books = [

//     {
//         name:'The Jungle Book',
//         genre: 'Kids',
//         id:'1',
//         authId: '1'
//     },
//     {
//         name:'The Alchemist',
//         genre: 'Men',
//         id:'2',
//         authId: '2'
//     },
//     {
//         name:'Problems in general Physics',
//         genre: 'Legends',
//         id:'3',
//         authId: '3'
//     },
//     {
//         name:'The Rich and the poor',
//         genre: 'Men',
//         id:'2',
//         authId: '2'
//     },
//     {
//         name:'Problems in quantum mechanics',
//         genre: 'Physics Legends',
//         id:'3',
//         authId: '3'
//     },
// ]
// let authors = [

//     {
//         name:'Mowgli',
//         age: 34,
//         id:'1'
//     },
//     {
//         name:'Stan',
//         age: 38,
//         id:'2'
//     },
//     {
//         name:'IE Irodov',
//         age: 90,
//         id:'3'
//     },
// ]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorName: {type: GraphQLString},
        author: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return _.find(authors, {id:parent.authId})
                return Author.find({
                    name: parent.authorName
                })
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
            type: new GraphQLList(BookType), //not just BookType because each author can have a list of books
            resolve(parent, args){
                //return _.filter(books, {authId:parent.id})
                return Book.find({
                    authorName: parent.name
                })
            }
        }
    })
})

//making mutations, these allow us the adding and deletion of the data in the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({  //model
                    name: args.name,
                    age: args.age
                })
                return author.save()
                .then(console.log('entry added '))
                .catch(err=>{
                    console.log('error saving the data');
                })
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: {type:new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorName: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let book = new Book({
                    title: args.title,
                    genre: args.genre,
                    authorName: args.authorName
                })
                return book.save()
                .then('entry added ')
                .catch(err=> console.log(err))
                
            }
        }

    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {title: {type: GraphQLString}},
            resolve(parent, args){
                //querying the data from the database / other sources
               //return _.find(books, {id:args.id})
              return Book.find(args.name)
            }
        },
        author: {
            type: AuthorType,
            args: {name: {type: GraphQLString}},
            resolve(parent, args){
                args.name
                //querying the data from the database / other sources
               //return _.find(authors, {id:args.id})
              return Author.find(args.name)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args){
                //return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args){
                //return authors
                return Author.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})