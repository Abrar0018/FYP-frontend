import React, { useEffect, useState } from "react";
import { StoreInfo, FormRow, PageHero } from "../components";
import styled from "styled-components";
import aboutImg from "../assets/hero-bcg.jpeg";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import { useStoreContext } from "../context/store_context";
import axios from "axios";
import { toast } from "react-toastify";

const prod_url = "/api/v1/products";
const MyStore = () => {
  const {
    products,
    deleteProduct,
    store,
    store_loading,
    store_error,
    createStore,
  } = useStoreContext();

  if (!store) {
    return (
      <NoStoreWrapper className="page-100">
        <section>
          <h3>You have not created a store yet..</h3>
          <StoreInfo />
        </section>
      </NoStoreWrapper>
    );
  }

  return (
    <main>
      <PageHero title="My Store" />
      <Wrapper className="page section section-center">
        <article className="store-info">
          <img src={store.image} alt="nice desk" />
          <article>
            <div className="title">
              <h2>{store.title}</h2>
              <div className="underline"></div>
            </div>
            <p>{store.description}</p>
          </article>
          <Link to="/updatestorepage">
            <button className="btn">Update Store</button>
          </Link>
        </article>

        <section className="store-products">
          <article>
            <div className="title">
              <h2>Store Products</h2>
              <div className="underline"></div>
            </div>

            <div className="products-container">
              {products.map(({ image, name, price, id }) => {
                return (
                  <div key={id}>
                    <div className="container">
                      <img src={image} alt={name} />
                    </div>
                    <footer>
                      <h5>{name}</h5>
                      <p>{formatPrice(price)}</p>
                    </footer>
                    <div className="btn-container">
                      <button className="btn">
                        <Link to={`/mystore/products/updateProduct/${id}`}>
                          Update
                        </Link>
                      </button>
                      <button className="btn" onClick={() => deleteProduct(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
          <div className="title">
            <Link to="/addproduct" className="btn add-prod-btn">
              Add Products
            </Link>
          </div>
        </section>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  .store-info {
    display: grid;
    gap: 4rem;

    img {
      width: 100%;
      display: block;
      border-radius: var(--radius);
      height: 500px;
      object-fit: cover;
    }

    p {
      line-height: 2;
      max-width: 45em;
      margin: 0 auto;
      margin-top: 2rem;
      color: var(--clr-grey-5);
    }
    .title {
      text-align: left;
    }
    .underline {
      margin-left: 0;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .store-products {
    margin-top: 4rem;
  }
  .products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    gap: 1rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    height: 200px;
    display: block;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }

  .btn-container {
    padding: 1rem;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .add-prod-btn {
    width: 200px;
    font-size: large;
  }
`;

const NoStoreWrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

const productsData = [
  {
    id: "recZkNf2kwmdBcqd0",
    name: "accent chair",
    price: 25999,
    image: "https://www.course-api.com/images/store/product-1.jpeg",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    company: "marcos",
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    category: "office",
    shipping: true,
  },
  {
    id: "recEHmzvupvT8ZONH",
    name: "albany sectional",
    price: 109999,
    image: "https://www.course-api.com/images/store/product-2.jpeg",
    colors: ["#000", "#ffb900"],
    company: "liddy",
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    category: "living room",
  },
  {
    id: "rec5NBwZ5zCD9nfF0",
    name: "albany table",
    price: 309999,
    image: "https://www.course-api.com/images/store/product-3.jpeg",
    colors: ["#ffb900", "#0000ff"],
    company: "liddy",
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    category: "kitchen",
  },
  {
    id: "recd1jIVIEChmiwhe",
    name: "armchair",
    price: 12599,
    image: "https://www.course-api.com/images/store/product-4.jpeg",
    colors: ["#000", "#00ff00", "#0000ff"],
    company: "marcos",
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    category: "bedroom",
    shipping: true,
  },
  {
    id: "recotY5Nh00DQFdkm",
    name: "dining table",
    price: 42999,
    image: "https://www.course-api.com/images/store/product-5.jpeg",
    colors: ["#00ff00", "#0000ff", "#ff0000"],
    company: "ikea",
    description:
      "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    category: "dining",
    shipping: true,
  },
];

export default MyStore;
