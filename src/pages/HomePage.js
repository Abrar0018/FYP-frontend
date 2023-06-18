import React, { useEffect } from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import axios from "axios";
import { useUserContext } from "../context/user_context";
const HomePage = () => {
  const { loginWithRedirect } = useUserContext();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("no token present");
      return;
    }
    try {
      const res = axios.get(`/api/v1/users/showMe`);
      console.log(res);
      console.log(res.data.curUser);
      loginWithRedirect(res.data.curUser.email, res.data.curUser.password);
    } catch (error) {
      console.log("error in checking token bushahah", error);
    }
  }, []);
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
