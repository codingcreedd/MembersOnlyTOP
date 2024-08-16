import { useContext, useState } from 'react'
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom';
import { Context } from './Components/ContextProvider';

function App() {

  const {authState, setAuthState, user} = useContext(Context);

  return (
    <div className='flex flex-col h-screen w-full'>
        <Nav />
        <div className='flex flex-col justify-center items-center gap-10 mt-10 mb-auto'>
          {
            !authState ? (
              <div className='flex flex-col'>
                  <h1 className='text-center text-3xl font-bold'>Welcome to MembersOnly, if you like to be a member today, please sign up for a new account!</h1>     
                  <Link to="/register" className='px-10 py-2 text-white bg-black rounded-lg'>Become a Member</Link>       
              </div>
            ) : (
              <div> 
                  Welcome {user.first_name}{user.last_name}
              </div>
            )
          }
        </div>
        <Footer />
    </div>
  )
}

export default App
