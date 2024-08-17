import React, { useContext } from 'react'
import CreateMessageForm from '../Components/CreateMessageForm'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Context } from '../Components/ContextProvider'
import Loader from '../Components/Loader'

const CreateMessagePage = () => {

  const {loading} = useContext(Context);

  if(loading) {
    return <Loader />
  }

  return (
    <div className='w-full h-screen flex flex-col'>
        <Nav />
        <header className='space-y-1 mt-10 text-center'>
            <h2 className='text-4xl font-bold'>Create Message</h2>
            <p className="text-muted-foreground">Fill out the form to send a new message.</p>
        </header>
        <div className='flex justify-center w-full'>
          <CreateMessageForm />
        </div>
        <div className='mt-auto'>
        <Footer />
        </div>
    </div>
  )
}

export default CreateMessagePage