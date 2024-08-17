import { useContext, useEffect } from 'react'
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom';
import { Context } from './Components/ContextProvider';
import logs from './apis/logs';
import messages from './apis/messages';

function App() {

  const {authState,fetchUser, userInfo} = useContext(Context);

  useEffect(() => {
      const fetch = async () => {
          try {
            await logs.get('/')
              .then(response => {
                console.log(response.data.message)
              });

            //is authenticated (implement this if the one in the log in doesnt work)
            fetchUser();

            await messages.get('/')
              .then(response => {
                
              })

        } catch(err) {
          console.log(err);
        }
      }

      fetch();
  }, [])

  return (
    <div className='flex flex-col h-screen w-full'>
        <Nav />
        <div className='flex flex-col justify-center items-center gap-10 mt-10 mb-auto'>
          {
            !authState ? (
              <div className='flex flex-col'>
                  <h1 className='text-center text-3xl font-bold'>Welcome to MembersOnly, if you like to be a member today, please sign up for a new account!</h1>     
                  <Link to="/register" className='px-10 py-2 text-white bg-black rounded-lg mt-10 m-auto'>Become a Member</Link>       
              </div>
            ) : (
              <div> 
                  Welcome {userInfo?.first_name}{userInfo?.last_name}
              </div>
            )
          }
        </div>
        <Footer />
    </div>
  )
}

export default App
