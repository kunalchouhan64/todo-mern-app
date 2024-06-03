const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const subTodo = require('./models/todos/sub_todo.models')


const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/todo-app')


app.get('/', (req, res) => {
    res.send('Hello Backend...')
})


//⭐⭐ Fetching all the todo that we have created
app.get('/alltodos', (req, res) => {
    subTodo.find({}).then((response) => {
        res.status(200).json(response)
    }).catch((err) => {
        res.status(500).json(err)
    })
})


//⭐⭐ Creating the todo with post method
app.post('/create', (req, res) => {
    try {
        subTodo.create(req.body).then((response) => {
            console.log(response, 'success...');
            res?.json(response)
        })
    } catch (error) {
        console.log('error...');
        res.json(error)
    }
})

//⭐⭐ Updating the ToDo Based On ID
// app.put('/updatetodo/:id', (req, res) => {
//     const { id } = req.params;
//     // console.log('this is the backend', id);
//     const { titleoftodo, descriptionoftodo } = req.body;  // The data to update
//     subTodo.findByIdAndUpdate(id, { titleoftodo, descriptionoftodo }, { new: true }).then((response) => {
//         res.json(response)
//     }).catch((error) => {
//         res.json(error)
//     })
// })



app.put('/updatetodo/:id', (req, res) => {
    const { id } = req.params;
    const { titleoftodo, descriptionoftodo } = req.body;  // The data to update

    // Correct usage of findByIdAndUpdate
    subTodo.findByIdAndUpdate({ _id: id }, { title: titleoftodo, description: descriptionoftodo },
    ).then((response) => { res.json(response) })
        .catch((error) => {
            res.json(error);
        });
});

//⭐⭐ Getting single todo...so that we can update.
app.get('/singletodo/:id', (req, res) => {
    const { id } = req.params;

    subTodo.findById(id).then((response) => {
        if (response) {
            res.json(response);
        } else {
            res.json({ message: 'Todo not found' });
        }
    })
})


//⭐⭐ Deleting the todo based on the todo id
app.post('/:id', (req, res) => {
    const { id } = req.params;  // get the id from the URL parameter
    subTodo.findByIdAndDelete(id)  // use the id from the URL parameter
        .then((response) => {
            if (response) {
                res.json({ message: 'Document deleted successfully', data: response });
            } else {
                res.status(404).json({ message: 'Document not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error deleting document', error: err });
        });
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend is running....${PORT}`)
})