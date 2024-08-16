import React from 'react';
import Footer from '../Components/Footer';
import LoginForm from '../Components/LoginForm';

const LoginPage = () => {
  return (
    <div className='flex h-screen w-full flex-col'>
        <LoginForm />
        <Footer />
    </div>
  )
}

export default LoginPage