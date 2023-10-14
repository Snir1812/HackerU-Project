import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const ProductDataContext = createContext();

export const useProductData = () => {
  return useContext(ProductDataContext);
};

export const ProductDataProvider = ({ children, categoryID }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Make an API request when categoryID changes
    if (categoryID) {
      api
        .get(`Product/Category/${categoryID}`)
        .then((result) => {
          console.log(result.data);
          // Set product data in the state
          setProductData(result.data);
        })
        .catch((ex) => console.log(ex));
    }
  }, [categoryID]); // Only re-run the effect if categoryID changes

  return (
    <ProductDataContext.Provider value={productData}>
      {children}
    </ProductDataContext.Provider>
  );
};
