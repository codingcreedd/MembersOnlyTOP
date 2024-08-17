import React, { createContext, useState, useEffect } from 'react';
import logs from '../apis/logs';
import messages_api from '../apis/messages'

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [user, setUser] = useState(0); //for user id
    const [userInfo, setUserInfo] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch initial data (e.g., site info)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await logs.get('/').then(response => {
          console.log(response.data.message);
          if(response.data.user) {
            setUser(response.data.user)
          }
        });

        await messages_api.get('/').then(response => {
          setMessages(response.data.data.messages);
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Fetch user data when the user ID changes
  useEffect(() => {
    if (user) {
      fetchUser(user);
    }
  }, [user]); // Runs when `user` changes

    const fetchUser = async (user_id) => {
      try {
        await logs.get(`/${user}`)
          .then(response => {
            // console.log(user)
            if(response.data.data) {
              setUserInfo(response.data.data.user);
              console.log(response.data.data.user)
              if(response.data.data.authenticated) {
                setAuthState(true);
              } else {
                setAuthState(false);
              }
            }
          })
      } catch(err) {
        console.log(err);
      }
    }

    

    const states = {
        authState, setAuthState, 
        user, setUser, fetchUser,
        userInfo,
        messages, setMessages,
        loading, setLoading
    }

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider