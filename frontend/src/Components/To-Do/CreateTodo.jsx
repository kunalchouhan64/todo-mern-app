import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateTodo = () => {
    const [title, SetTitle] = useState()
    const [description, SetDescription] = useState()
    const navigate = useNavigate()

    const Handlesubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/create`, { title, description })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    // alert('Success...')
                    navigate('/')
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <section class="text-gray-400 bg-gray-900 body-font relative min-h-screen">

                <div class="container md:px-5 md:py-24 mx-auto flex">
                    <form class="lg:w-1/3 md:w-1/2 bg-gray-900 shadow-md rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0 relative z-10" onSubmit={Handlesubmit}>
                        <h2 class="text-white mb-8 font-medium title-font mx-auto font-Raleway text-2xl">Create To-Do</h2>

                        <div class="relative mb-4">
                            <label for="title" class="leading-7 text-gray-200 font-Raleway text-base">To-Do Title</label>
                            <input type="text" required value={title} onChange={(e) => SetTitle(e.target.value)} placeholder='Todo Title ' id="title" name="title" class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="relative mb-4">
                            <label for="message" class="leading-7 text-gray-200  font-Raleway text-base">To-Do Description</label>
                            <textarea id="message" required value={description} onChange={(e) => SetDescription(e.target.value)} placeholder='Todo Description ( About To do )' name="message" class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button type='submit' class="text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create New To-Do</button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateTodo
