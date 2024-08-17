import React, { useContext, useState } from 'react'
import { Context } from './ContextProvider'
import messages_api from '../apis/messages';
import { useNavigate } from 'react-router-dom';

const CreateMessageForm = () => {

    const {user, userInfo, setLoading} = useContext(Context);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const addMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await messages_api.post('/add', {
                user_id: user,
                title,
                description
            }).then(() => {
                setLoading(false);
                navigate('/');
                navigate(0);
            })
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <form className="flex flex-col gap-4 mt-10 mx-auto w-[50%]" onSubmit={addMessage}>
        <div className="grid gap-2">
          <label htmlFor="user-id">User ID</label>
          <div className="rounded px-3 py-2 bg-gray-200">{user} : {userInfo.username}</div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="Enter message title" className="border rounded px-3 py-2" 
          onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        <div className="grid gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter message description"
            rows={4}
            className="border rounded px-3 py-2"
            onChange={(e) => {setDescription(e.target.value)}}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-black floatl text-white text-sm rounded px-4 py-2">
            Send Message
          </button>
        </div>
      </form>
  )
}

export default CreateMessageForm