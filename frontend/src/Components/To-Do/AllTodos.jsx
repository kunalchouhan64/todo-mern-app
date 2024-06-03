import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const AllTodos = () => {


    const [alltodos, SetAllTodos] = useState([])

    const FetchTodos = () => {
        axios.get(`http://localhost:3000/alltodos`).then((res) => {
            console.log(res);
            SetAllTodos(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const HandleDeleteToDo = (ID) => {
        axios.post(`http://localhost:3000/${ID}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    console.log('todos - ', alltodos);

    useEffect(() => {
        FetchTodos()
    }, [])

    const [itodocomplete, SetIsToDoComplete] = useState(false)

    const checkboxRef = useRef(null);
    const handleCheckboxChange = () => {
        if (checkboxRef.current.checked) {
            SetIsToDoComplete(true)
        } else {
            SetIsToDoComplete(false)
        }
    };
    return (
        <>
            <div>

                <section className=" bg-gray-900 body-font overflow-hidden min-h-screen">
                    <div className='flex space-x-5 text-white text-lg p-5 w-full border-b border-green-500 items-center'>
                        <Link to='/' className='border border-green-400 py-1 px-4 rounded-3xl'>Home</Link>
                        <Link to='/create' className='border border-green-400 py-1 px-4 rounded-3xl'>Create To-Do</Link>
                    </div>
                    {
                        alltodos.length > 0 ?

                            <div className="container md:px-5 px-2 py-12 mx-auto">
                                <h3 className='text-white text-center font-Raleway md:text-3xl text-xl py-5'>All Created Todos</h3>
                                <div className="  space-y-2">
                                    {
                                        alltodos.map((item) => (

                                            <div key={item._id} className="py-3 flex flex-wrap md:flex-nowrap font-Montserrat border border-emerald-500  rounded-2xl">
                                                <div className='text-white px-5 flex justify-start items-start pt-1'>
                                                    <input ref={checkboxRef} onChange={handleCheckboxChange} type="checkbox" className={` checked:text-green-500 h-5 w-5`} />
                                                </div>

                                                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                                    <span className=" title-font text-white">Created At:</span>
                                                    <span className="mt-1 text-sm text-gray-300">{new Date(item.createdAt).toLocaleDateString()} - {new Date(item.createdAt).toLocaleTimeString()}</span>
                                                </div>
                                                <div className="md:flex-grow px-4">
                                                    <h2 className={`${itodocomplete ? 'line-through text-green-500' : 'no-underline'}  text-lg font-medium text-white title-font mb-2 capitalize font-Raleway md:text-xl`}><span className='text-gray-300 font-Raleway pr-2 text-base'>Title:</span>{item.title}</h2>
                                                    <p className={`${itodocomplete ? 'line-through text-green-500' : 'no-underline'} leading-relaxed text-white text-base md:text-xl font-Raleway`}><span className='text-gray-300 font-Raleway pr-2 capitalize'>Description:</span>{item.description}</p>

                                                </div>

                                                <div className='flex justify-center items-center md:space-x-6 space-x-4 py-5 md:py-0 mr-9 mx-auto'>
                                                    <Link to={`/update/${item._id}`}> <button className='bg-green-600 text-white py-2 px-3 md:px-6 text-sm md:text-lg'>Update Todo</button> </Link>
                                                    <button onClick={() => HandleDeleteToDo(item._id)} className='bg-red-600 text-white py-2 md:px-6 text-sm md:text-lg px-3'>Delete Todo</button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>

                            : <div className='flex flex-col justify-center items-center space-y-4'> <p className='text-white px-6 mt-10 text-center text-xl'>No To-do Found...Please Create New To-Do</p>
                                <Link className='bg-green-500 text-white font-Poppins py-2 px-5' to='/create'>Create To-Do</Link>
                            </div>
                    }

                </section>
            </div>
        </>
    )
}

export default AllTodos
