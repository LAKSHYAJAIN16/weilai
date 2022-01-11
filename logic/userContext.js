import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedin] = useState(false);

    return (
        <>
            <UserContext.Provider value={{
                user,
                setUser,
                loggedIn,
                setLoggedin
            }}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}

export default function useUserContext(){
    return useContext(UserContext);
}