import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';


// create context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const contextValue = useFirebase();

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;