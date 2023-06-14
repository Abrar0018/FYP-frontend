import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues } from "../utils/helpers";
import { Link } from "react-router-dom";

const StoresPage = () => {
  const { all_products: products, showStoreProducts } = useFilterContext();
  const companies = getUniqueValues(products, "company").filter(
    (c) => c !== "all"
  );

  const openStore = (e) => {
    const storeName = e.target.firstChild.data;
    showStoreProducts(storeName);
  };

  return (
    <main className="page-100">
      <PageHero title="stores" />
      <Wrapper>
        <div className="section-center">
          <div className="stores-container">
            {companies.map((company) => {
              return (
                <div key={company} className="store" onClick={openStore}>
                  <Link to="/products">
                    <h2>{company}</h2>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .stores-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, auto));
    gap: 1rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .store {
    height: 250px;
    background-color: var(--clr-primary-10);
    display: grid;
    place-content: center;
    text-transform: capitalize;
    border-radius: 1rem;
    box-shadow: var(--light-shadow);
    transition: var(--transition);
  }

  .store:hover {
    box-shadow: var(--dark-shadow);
    transform: scale(1.01);
  }

  .store h2 {
    color: var(--clr-primary-1);
  }
`;
export default StoresPage;
