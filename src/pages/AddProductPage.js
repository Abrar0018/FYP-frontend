import React, { useState } from "react";
import { PageHero, FormRow } from "../components";
import { useStoreContext } from "../context/store_context";
import { categories } from "../utils/constants";
import { toast } from "react-toastify";
import ProductInfo from "../components/ProductInfo";

const AddProductPage = () => {
  return (
    <main>
      <PageHero title="My Store / Add Products" />
      <ProductInfo />
    </main>
  );
};

export default AddProductPage;
