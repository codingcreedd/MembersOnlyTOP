import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Components/ContextProvider'
import { Link } from 'react-router-dom';
import logs from '../apis/logs';

const MessagesPage = () => {

    const {messages} = useContext(Context);
    const [username, setUsername] = useState([]);


  return (
    <div className='w-full px-40 py-10 flex flex-col'>
        <div className='flex justify-between items-center'>
            <div className='px-6 py-2 bg-black text-white font-bold text-sm'>Total Messages: {messages.length}</div>
            <Link to="/create-message" className='px-6 py-2 bg-black text-white font-bold text-sm'>Create Message</Link>
        </div>

        <div className='h-[calc(100vh-300px)] overflow-y-auto grid grid-cols-4 gap-5 mt-10'>
            {
                messages.map(message => (
                    <div key={message.id} className='flex flex-col px-6 py-10 gap-8 rounded-lg shadow-lg border border-black'>
                        <h1 className='text-2xl font-bold'>{message.title}</h1>
                        <p className='text-sm'>{message.description}</p>
                        <p>By <span className='text-sm text-blue-800'>@{message.username}</span> - {message.created_at}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MessagesPage