import {
  GET_STORE_PRODUCTS_BEGIN,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_ERROR,
  ADD_STORE_PRODUCT,
  DELETE_STORE_PRODUCT,
  UPDATE_STORE_PRODUCT,
} from "../actions";

const products_reducer = ( state, action ) =>
{
    
    if (action.type === GET_STORE_PRODUCTS_BEGIN) {
      return { ...state, products_loading: true };
    }
    //need to change this to get only the current store products
    if (action.type === GET_STORE_PRODUCTS_SUCCESS) {
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      };
    }
    if (action.type === GET_STORE_PRODUCTS_ERROR) {
      return { ...state, products_loading: false, products_error: true };
    }





  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
