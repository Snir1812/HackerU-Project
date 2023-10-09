import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const CategoryDataContext = createContext();

export const useCategoryData = () => {
  return useContext(CategoryDataContext);
};

export const CategoryDataProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    api
      .get("Category")
      .then((result) => {
        console.log(result.data);
        setCategoryData(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <CategoryDataContext.Provider value={categoryData}>
      {children}
    </CategoryDataContext.Provider>
  );
};
