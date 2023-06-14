import axios from "axios";
import {
  GET_STORE_PRODUCTS_BEGIN,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_ERROR,
  ADD_STORE_PRODUCT,
  DELETE_STORE_PRODUCT,
  UPDATE_STORE_PRODUCT,
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
  throw new Error(`No Matching "${action.type}" - action type`);
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`${products_url}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export default products_reducer;
