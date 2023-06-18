import React, { useEffect } from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import axios from "axios";
import { useUserContext } from "../context/user_context";
const HomePage = () => {
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
