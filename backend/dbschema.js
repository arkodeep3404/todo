const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://arkodeep3404:v1iStwhqZTwhAInE@todo.bbmunuu.mongodb.net');

const schema = mongoose.Schema;
const model = mongoose.model

const userSchema = new schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

const todoSchema = new schema({
    ID: schema.Types.ObjectId,
    title: String,
    description: String
});

const User = model('User', userSchema);
const Todo = model('Todo', todoSchema);

module.exports = {
    User,
    Todo
}