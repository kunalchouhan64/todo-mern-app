import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
    },
    iscomplete: {
        type: Boolean,
        default: false
    },
    // Here we difining the relation that by whome is created this todo
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Defining the relation of the models here
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubTodo'
        }
    ] // Array of Sub ToDos..... This will contains our sub-todos in the array of objects..

}, { timestamps: true })


export const Todo = mongoose.model('Todo', todoSchema)