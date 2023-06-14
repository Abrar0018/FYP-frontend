import React, { useState } from "react";
import { PageHero } from "../components";
import { useStoreContext } from "../context/store_context";

const categories = [
  "Men's Fashion",
  "Mother & Baby",
  "Home & Lifestyle",
  "Electronic Devices",
  "Electronic Accessories",
  "TV & Home Appliances",
  "Sports & Outdoor",
  "Watches, Bags & Jewelry",
  "Automotive & Motorbike",
];
const AddProductPage = () => {
  const { addProduct } = useStoreContext();
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
  const [img, setImg] = useState({ selectedFile: null });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };
  const handleImgChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });

    const file = e.target.files[0];
    setImg({ selectedFile: file });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", img.selectedFile, img.selectedFile.name);

    addProduct(formdata, product);
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
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            alt="image name"
            id="image"
            name="image"
            value={product.image}
            onChange={handleImgChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={product.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="inventory">Inventory</label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            value={product.inventory}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
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
