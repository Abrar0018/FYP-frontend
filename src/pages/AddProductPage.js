import React from "react";
import { PageHero } from "../components";

const AddProductPage = () => {
  return (
    <main>
      <PageHero title="My Store / Add Products" />
      <div className="title section">
        <h2>Provide Details</h2>
        <div className="underline"></div>
      </div>
      <form className="form page-100"></form>
    </main>
  );
};

export default AddProductPage;
