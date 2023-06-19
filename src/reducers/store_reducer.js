import axios from "axios";
import {
  GET_STORE_PRODUCTS_BEGIN,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_ERROR,
  ADD_STORE_PRODUCT,
  DELETE_STORE_PRODUCT,
  UPDATE_STORE_PRODUCT,
  GET_STORE_BEGIN,
  GET_STORE_SUCCESS,
  GET_STORE_ERROR,
  CREATE_STORE,
  UPDATE_STORE,
  CLEAR_STORE,
} from "../actions";

const products_url = "/api/v1/products";
const products_reducer = (state, action) => {
  if (action.type === GET_STORE_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  //need to change this to get only the current store products
  if (action.type === GET_STORE_PRODUCTS_SUCCESS) {
    return { ...state, products: action.payload };
  }
  if (action.type === GET_STORE_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  if (action.type === DELETE_STORE_PRODUCT) {
    let id = action.payload;
    console.log(id);
    deleteProduct(id);
    let tempProducts = state.products.filter((p) => {
      return p.id !== id;
    });
    return { ...state, products: tempProducts };
  }

  if (action.type === ADD_STORE_PRODUCT) {
    addProduct(action.payload);
    return { ...state };
  }

  if (action.type === GET_STORE_BEGIN) {
    return { ...state, store_loading: true };
  }
  if (action.type === GET_STORE_SUCCESS) {
    return { ...state, store: action.payload };
  }
  if (action.type === GET_STORE_ERROR) {
    return { ...state, store_loading: false, store_error: true };
  }
  if (action.type === CREATE_STORE) {
    createStore(action.payload);
    return { ...state };
  }
  if (action.type === UPDATE_STORE) {
    console.log("in update store reducer", action.payload);
    updateStore(action.payload);
    return { ...state };
  }

  if (action.type === CLEAR_STORE) {
    return { ...state, store: null };
  }

  if (action.type === UPDATE_STORE_PRODUCT) {
    updateProduct(action.payload);
    return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`${products_url}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (payload) => {
  const img = payload.img;
  const prod = payload.product;
  const data = new FormData();

  try {
    const res = await axios.patch(`${products_url}/${prod.id}`, prod);
    let imgDetails = `${res.data.product._id}.${
      img.selectedFile.type.split("/")[1]
    }`;
    data.append("image", img.selectedFile, imgDetails);
    await axios.post(`${products_url}/uploadImage`, data);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (payload) => {
  const img = payload.img;
  const prod = payload.product;
  const data = new FormData();

  try {
    const res = await axios.post(`${products_url}`, prod);
    let imgDetails = `${res.data.finalProduct.id}.${
      img.selectedFile.type.split("/")[1]
    }`;
    data.append("image", img.selectedFile, imgDetails);
    await axios.post(`${products_url}/uploadImage`, data);
  } catch (error) {
    console.log(error);
  }
};

const createStore = async (payload) => {
  const img = payload.img;
  const store = payload.storeDetails;
  const data = new FormData();

  try {
    const res = await axios.post("/api/v1/stores", store);
    let imgDetails = `${res.data.store._id}.${
      img.selectedFile.type.split("/")[1]
    }`;
    data.append("image", img.selectedFile, imgDetails);
    await axios.post(`/api/v1/stores/uploadImage`, data);
  } catch (error) {
    console.log(error);
  }
};

const updateStore = async (payload) => {
  const img = payload.img;
  const store = payload.storeDetails;
  const data = new FormData();

  try {
    const res = await axios.patch(`/api/v1/stores/${store.id}`, store);
    let imgDetails = `${res.data.store._id}.${
      img.selectedFile.type.split("/")[1]
    }`;
    data.append("image", img.selectedFile, imgDetails);
    await axios.post(`/api/v1/stores/uploadImage`, data);
  } catch (error) {
    console.log(error);
  }
};

export default products_reducer;
