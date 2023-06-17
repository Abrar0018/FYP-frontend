import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UserContext = React.createContext();
const initialState = {
  loading: false,
  error: false,
};
export const UserProvider = ({ children }) => {
  const [loginDetails, setLoginDetails] = useState(initialState);
  const [user, setUser] = useState(null);

  const loginWithRedirect = async (email, password) => {
    setLoginDetails({ ...loginDetails, loading: true });
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      setUser({ name: res.data.user.name, id: res.data.user.userId });
      setLoginDetails({
        loading: false,
        error: true,
      });
    } catch (error) {
      console.log(error);
      setLoginDetails({ loading: false, error: true });
      toast.error("Login failed");
    }
  };
  const logout = () => {
    setLoginDetails({
      loading: false,
      error: false,
    });

    setUser(null);
  };
  const registerUser = (user) => {
    console.log("registering");
    console.log(user);
  };
  return (
    <UserContext.Provider
      value={{ loginWithRedirect, logout, registerUser, ...loginDetails, user }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
