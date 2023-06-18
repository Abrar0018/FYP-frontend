import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../context/store_context";
import { FormRow } from "../components";
// imageName={store.image.split("/")[store.image.split("/").length - 1]}
const StoreInfo = ({ store }) => {
  const { createStore, updateStore } = useStoreContext();
  const [storeDetails, setStoreDetails] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
  });

  const [img, setImg] = useState({ selectedFile: null });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStoreDetails({ ...storeDetails, [name]: value });
  };
  const handleImgChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const file = e.target.files[0];

    if (file.size > 2000000) {
      toast.error("File size must not be greater than 2mbs");
      return;
    }

    setStoreDetails({ ...storeDetails, [name]: value });
    setImg({ selectedFile: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !storeDetails.title ||
      !storeDetails.description ||
      !storeDetails.image
    ) {
      toast.error("Please provide all the details before creating the store");
      return;
    }
    if (store) {
      console.log(img, storeDetails);
      updateStore(img, storeDetails);
    } else createStore(img, storeDetails);
  };

  useEffect(() => {
    if (store) {
      setStoreDetails({
        id: store._id,
        title: store.title,
        description: store.description,
        image: "",
      });
    }
  }, []);

  return (
    <form
      className="form"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <FormRow
        type="text"
        name="title"
        value={storeDetails.title}
        handleChange={handleChange}
      />
      <FormRow
        type="text"
        name="description"
        value={storeDetails.description}
        handleChange={handleChange}
      />
      <FormRow
        type="file"
        name="image"
        value={storeDetails.image}
        handleChange={handleImgChange}
      />
      <button className="btn" onClick={handleSubmit}>
        {console.log("in store info component: ", store)}
        {store ? "Update Store" : "Create Store"}
      </button>
    </form>
  );
};

export default StoreInfo;
