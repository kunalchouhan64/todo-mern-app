import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllTodos from './Components/To-Do/AllTodos'
import CreateTodo from './Components/To-Do/CreateTodo'
import UpdateTodo from './Components/To-Do/UpdateTodo'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<AllTodos />} />
        <Route path='/create' element={<CreateTodo />} />
        <Route path='/update/:id' element={<UpdateTodo />} />
      </Routes>
    </>
  )
}

export default App
