import React, { useState } from "react";
import { PageHero, FormRow } from "../components";
import { useStoreContext } from "../context/store_context";
import { categories } from "../utils/constants";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const { addProduct } = useStoreContext();
  const [img, setImg] = useState({ selectedFile: null });
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    colors: [],
    company: "",
    description: "",
    category: "Men's Fashion",
    inventory: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };
  const handleImgChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const file = e.target.files[0];

    if (file.size > 2000000) {
      toast.error("File size must not be greater than 2mbs");
      return;
    }

    setProduct({ ...product, [name]: value });
    setImg({ selectedFile: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.price ||
      !product.image ||
      !product.company ||
      !product.description ||
      !product.inventory
    ) {
      toast.error("Please provide all the details before adding the product");
      return;
    }
    addProduct(img, product);
  };
  return (
    <main>
      <PageHero title="My Store / Add Products" />
      <div className="title section">
        <h2>Provide Details</h2>
        <div className="underline"></div>
      </div>
      <form
        className="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <FormRow
          type="text"
          name="name"
          value={product.name}
          handleChange={handleChange}
        />
        <FormRow
          type="number"
          name="price"
          value={product.price}
          handleChange={handleChange}
        />
        <FormRow
          type="file"
          name="image"
          value={product.image}
          handleChange={handleImgChange}
        />
        <FormRow
          type="text"
          name="company"
          value={product.company}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="description"
          value={product.description}
          handleChange={handleChange}
        />
        <FormRow
          type="number"
          name="inventory"
          value={product.inventory}
          handleChange={handleChange}
        />
        <div className="form-control">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-input"
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
            style={{ background: "white" }}
          >
            {categories.map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-submit">
          <button type="submit" className="btn">
            Add product
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddProductPage;
