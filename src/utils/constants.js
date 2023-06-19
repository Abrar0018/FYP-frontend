import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
  {
    id: 4,
    text: "stores",
    url: "/stores",
  },
  {
    id: 5,
    text: "my store",
    url: "/mystore",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Empowering individuals with seamless access to a diverse range of high-quality products, delivered with exceptional service, to enhance their digital lifestyle.",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: " Enriching lives through a seamless online shopping experience, connecting people with innovative products that inspire and elevate their everyday lives.",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Established in 2023, DigiDealz emerged as a pioneering e-commerce website, revolutionizing the online shopping experience for tech enthusiasts with its diverse range of cutting-edge electronics",
  },
];

export const categories = [
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

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
