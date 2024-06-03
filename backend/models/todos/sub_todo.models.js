const mongoose = require('mongoose')


const subTodoSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

    // content: {
    //     type: String,
    //     required: true,
    // },
    // iscomplete: {
    //     type: Boolean,
    //     default: false
    // },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }


}, { timestamps: true })

const subTodo = mongoose.model('SubTodo', subTodoSchema)

module.exports = subTodo

