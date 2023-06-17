import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/store_reducer";
import {
  GET_STORE_PRODUCTS_BEGIN,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_ERROR,
  ADD_STORE_PRODUCT,
  DELETE_STORE_PRODUCT,
  UPDATE_STORE_PRODUCT,
  GET_STORE_INFO,
  GET_STORE_BEGIN,
  GET_STORE_SUCCESS,
  GET_STORE_ERROR,
} from "../actions";
import axios from "axios";
import { useUserContext } from "./user_context";
const products_url = "/api/v1/products";

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  store: null,
  store_loading: false,
  store_error: false,
};
const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useUserContext();

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

  const fetchStore = async (id) => {
    dispatch({ type: GET_STORE_BEGIN });
    try {
      const res = await axios.get(`/api/v1/users/${id}/stores`);
      dispatch({ type: GET_STORE_SUCCESS, payload: res.data.stores[0] });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_STORE_ERROR });
    }
  };

  useEffect(() => {
    if (user) {
      fetchStore(user.id);
    }
  }, [user]);

  const addProduct = (img, product) => {
    dispatch({ type: ADD_STORE_PRODUCT, payload: { img, product } });
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
      value={{
        ...state,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
