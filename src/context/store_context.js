import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/store_reducer";
import {
  GET_STORE_PRODUCTS_BEGIN,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_ERROR,
  ADD_STORE_PRODUCT,
  DELETE_STORE_PRODUCT,
  UPDATE_STORE_PRODUCT,
} from "../actions";
import axios from "axios";
const products_url = "/api/v1/products";

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
};
const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async (url) => {
    dispatch({ type: GET_STORE_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data.products;
      console.log(products);
      dispatch({ type: GET_STORE_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_STORE_PRODUCTS_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(products_url);
  }, []);

  const addProduct = (formdata, product) => {
    dispatch({ type: ADD_STORE_PRODUCT, payload: { formdata, product } });
  };
  const updateProduct = (product) => {
    dispatch({ type: UPDATE_STORE_PRODUCT, payload: product });
  };
  const deleteProduct = (product_id) => {
    console.log("in context" + product_id);
    dispatch({ type: DELETE_STORE_PRODUCT, payload: product_id });
  };

  return (
    <StoreContext.Provider
      value={{ ...state, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
