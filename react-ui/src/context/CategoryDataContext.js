import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const CategoryDataContext = createContext();

export const useCategoryData = () => {
  return useContext(CategoryDataContext);
};

export const CategoryDataProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryData === null) {
      api
        .get("Category")
        .then((result) => {
          setCategoryData(result.data);
          setLoading(false);
        })
        .catch((ex) => {
          console.log(ex);
          setLoading(false);
        });
    }
  }, [categoryData]);

  return (
    <CategoryDataContext.Provider value={categoryData}>
      {loading ? <p>Loading...</p> : children}
    </CategoryDataContext.Provider>
  );
};
