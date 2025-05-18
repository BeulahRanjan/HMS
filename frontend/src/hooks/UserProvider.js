import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null);

export const UserProvider= ({children}) => {
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Function to update user and toggle boolean

const setUserGlobalData=(userId, username)=>{
  console.log(userId + " " + username);
    setUserId(userId);
    setUsername(username);
}

useEffect(() => {
  console.log("userId changed to:", userId);
}, [userId]);

  return (
    <UserContext.Provider value={{ userId, username, setUserGlobalData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};