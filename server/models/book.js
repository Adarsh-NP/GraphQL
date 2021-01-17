const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {type: String, required: true },
    genre: {type: String, required: true},
    authorName: {type: String, required: true}
//defining id in not required as mongo itself attatches one to any collection that's added
})

module.exports = mongoose.model('Book', bookSchema)