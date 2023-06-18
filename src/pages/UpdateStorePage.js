import React from "react";
import { PageHero, StoreInfo } from "../components";
import { useStoreContext } from "../context/store_context";

const UpdateStorePage = () => {
  const { store } = useStoreContext();
  return (
    <main>
      <PageHero title="My Store / Update Store" />
      <article className="page-100">
        <StoreInfo store={store} />
      </article>
    </main>
  );
};

export default UpdateStorePage;
