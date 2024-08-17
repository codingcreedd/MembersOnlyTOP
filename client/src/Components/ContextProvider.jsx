import React, { createContext, useState } from 'react';
import logs from '../apis/logs';

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [user, setUser] = useState(19); //for user id
    const [userInfo, setUserInfo] = useState({});
    const [messages, setMessages] = useState([]);

    const fetchUser = async () => {
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
        messages, setMessages
    }

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider