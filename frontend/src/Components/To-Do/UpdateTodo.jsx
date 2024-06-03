import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTodo = () => {
  // ⭐ Getting the ID from router with useparams
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(id);
  const [titleoftodo, Settitleoftodo] = useState('')
  const [descriptionoftodo, Setdescriptionoftodo] = useState('')


  // ⭐ Fetching Single To-Do with ID to make the update possible
  const FetchSignletodo = () => {
    axios.get(`http://localhost:3000/singletodo/${id}`).then((res) => {
      console.log(res);
      Settitleoftodo(res?.data?.title)
      Setdescriptionoftodo(res?.data?.description)
    }).catch((err) => {
      console.log(err);
    })
  }


  // ⭐ Updating the To-Do with ID
  const HandleUpdate = () => {
    axios.put(`http://localhost:3000/updatetodo/${id}`, { titleoftodo, descriptionoftodo }).then((res) => {
      console.log("update response...", res);
      if (res.status === 200) {
        navigate('/')
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  //  ⭐ Calling the function to fetch the single to do.
  useEffect(() => {
    FetchSignletodo()
  }, [])
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font relative min-h-screen">

        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-gray-900 shadow-md rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0 relative z-10">
            <h2 className="text-white mb-8 font-medium title-font mx-auto font-Raleway text-2xl">Update To-Do</h2>

            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-400">To-do Title</label>
              <input type="text" value={titleoftodo} onChange={(e) => Settitleoftodo(e.target.value)} placeholder='todo title ' id="title" name="title" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-400">To-Do Description</label>
              <textarea id="message" value={descriptionoftodo} onChange={(e) => Setdescriptionoftodo(e.target.value)} placeholder='todo description' name="message" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button onClick={HandleUpdate} className="text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Update To-Do</button>

          </div>
        </div>
      </section>
    </>
  )
}

export default UpdateTodo
