import React from 'react'
import SignUpForm from '../Components/SignUpForm'
import Footer from '../Components/Footer'

const RegisterPage = () => {
  return (
    <div className='flex h-screen w-full flex-col'>
        <SignUpForm />
        <Footer />
    </div>
  )
}

export default RegisterPage