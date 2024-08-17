import React, { useContext, useEffect } from 'react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom';
import { Context } from './Components/ContextProvider';
import logs from './apis/logs';
import messages_api from './apis/messages';
import MessagesPage from './Routes/MessagesPage';
import Loader from './Components/Loader';

function App() {
  const { authState, loading} = useContext(Context);

  if(loading) {
    return <Loader />
  }

  return (
    <div className='flex flex-col h-screen w-full'>
      <Nav />
      <div className='flex flex-col justify-center items-center gap-10 mt-10 mb-auto'>
        {
          !authState ? (
            <div className='flex flex-col'>
              <h1 className='text-center text-3xl font-bold'>
                Welcome to MembersOnly, if you like to be a member today, please sign up for a new account!
              </h1>
              <Link to="/register" className='px-10 py-2 text-white bg-black rounded-lg mt-10 m-auto'>
                Become a Member
              </Link>
            </div>
          ) : (
            <div className='w-full'>
              <MessagesPage />
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
