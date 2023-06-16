import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({});

  const loginWithRedirect = async (email, password) => {
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      setMyUser({ name: res.data.user.name, id: res.data.user.id });
    } catch (error) {
      setMyUser(null);
      console.log(error);
      toast.error("Login failed");
    }
  };
  const logout = () => {
    setMyUser(null);
  };
  const registerUser = (user) => {
    console.log("registering");
    console.log(user);
  };
  return (
    <UserContext.Provider
      value={{ loginWithRedirect, logout, registerUser, myUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
