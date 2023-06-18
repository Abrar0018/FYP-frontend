import React, { useEffect } from "react";
import ProductInfo from "../components/ProductInfo";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}recQ0fMd8T0Vk211E`);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <main>
      <PageHero title="My Store / Update Product" />
      <ProductInfo prevProduct={product} />
    </main>
  );
};

export default UpdateProductPage;
