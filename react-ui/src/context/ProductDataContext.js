import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const ProductDataContext = createContext();

export const useProductData = () => {
  return useContext(ProductDataContext);
};

export const ProductDataProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    api
      .get(`Product`)
      .then((result) => {
        // console.log(result.data);
        setProductData(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <ProductDataContext.Provider value={productData}>
      {children}
    </ProductDataContext.Provider>
  );
};
