import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  Stores,
  PrivateRoute,
  MyStore,
  AddProductPage,
  Register,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products />} />
        <Route path="stores" element={<Stores />} />
        <Route path="mystore" element={<MyStore />} />
        <Route path="register" element={<Register />} />
        <Route path="addproduct" element={<AddProductPage />} />
        <Route path="products/:id" element={<SingleProduct />} />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="error" element={<Error />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
