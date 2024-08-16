import React, { createContext, useState } from 'react';

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [user, setUser] = useState({});

    const states = {
        authState, setAuthState, user, setUser
    }

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider