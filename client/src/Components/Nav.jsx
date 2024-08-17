import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './ContextProvider';
import logs from '../apis/logs';

const Nav = () => {
  
  const {user, setUser, authState, setAuthState, userInfo} = useContext(Context);

  const logout = async () => {
    try {
      await logs.get('/logout/user-logout')
        .then(response => {
          console.log(response.data.message);
          setAuthState(false);
        })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <nav className="bg-gray-900 h-16 flex justify-between items-center px-4">
      <h1 className="text-2xl text-white font-bold">MembersOnly</h1>
      <div className="flex items-center">
        {
          !authState ? (
            <div className='flex'>
              <Link to="/login" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-2 px-4 rounded">Login</Link>
              <Link to="/register" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-2 px-4 rounded ml-2">Sign Up</Link>
            </div>
          ) : (
            <div className='flex text-white items-center'>
              {user.first_name}
              <button onClick={logout}  className='ml-10 px-10 py-2 bg-white rounded-lg text-black font-bold text-sm'>Logout</button>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Nav