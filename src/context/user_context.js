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
        error: false,
      });
    } catch (error) {
      console.log(error);
      setLoginDetails({ loading: false, error: true });
      toast.error("Login failed");
    }
  };
  const logout = async () => {
    try {
      const res = axios.get("/api/v1/auth/logout");
      console.log("In logout log: ", res);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
    // setUser(null);
    // localStorage.removeItem("token");
    // console.log("User after logout: ", user);
  };

  const registerUser = async (user) => {
    try {
      const res = await axios.post(`/api/v1/auth/register`, user);
      setUser({ name: res.data.user.name, id: res.data.user.userId });
    } catch (error) {
      const msg = error.response.data.msg;
      toast.error(msg);
    }
  };

  const fetchCurrUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("no token present");
      return;
    }
    try {
      const res = await axios.get(`/api/v1/users/showMe`);
      setUser({
        name: res.data.curUser.name,
        id: res.data.curUser._id,
      });
    } catch (error) {
      console.log("No user is present in the cookies.. :)");
    }
  };

  useEffect(() => {
    fetchCurrUser();
  }, []);

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
