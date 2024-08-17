import React, { useContext } from 'react';
import Footer from '../Components/Footer';
import LoginForm from '../Components/LoginForm';
import { Context } from '../Components/ContextProvider';
import Loader from '../Components/Loader';

const LoginPage = () => {

  const {loading} = useContext(Context);

  return (
    <div className='flex h-screen w-full flex-col relative'>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
          <Loader />
        </div>
      )}
      <LoginForm />
      <Footer />
    </div>
  )
}

export default LoginPage