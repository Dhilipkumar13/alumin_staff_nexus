// SessionContext.js
import React, { createContext, useState, useContext } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [role,setRole]  = useState('');

  return (
    <SessionContext.Provider value={{ name, setName, pass, setPass,role,setRole }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
