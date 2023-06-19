import React, { useEffect, useState } from "react";
import { useStoreContext } from "../context/store_context";
import { toast } from "react-toastify";
import FormRow from "./FormRow";
import { categories } from "../utils/constants";

const ProductInfo = ({ prevProduct }) => {
  const { addProduct, updateProduct } = useStoreContext();
  const [img, setImg] = useState({ selectedFile: null });
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
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
    if (prevProduct) {
      console.log("Before sending update fetch: ", img, product);
      updateProduct(img, product);
    } else addProduct(img, product);
  };

  useEffect(() => {
    if (prevProduct) {
      setProduct({
        id: prevProduct.id,
        name: prevProduct.name,
        price: prevProduct.price,
        image: "",
        company: prevProduct.compane,
        description: prevProduct.description,
        category: "Men's Fashion",
        inventory: "",
      });
    }
  }, []);
  return (
    <main>
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
            {prevProduct ? "Update product" : "Add product"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProductInfo;
