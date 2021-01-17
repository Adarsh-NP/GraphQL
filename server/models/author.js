const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: {type: String, required: true },
    age: {type: Number, required: true, default:33},
//defining id in not required as mongo itself attatches one to any collection that's added
})

module.exports = mongoose.model('Author', authorSchema)