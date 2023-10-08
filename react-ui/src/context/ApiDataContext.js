import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const ApiDataContext = createContext();

export const useApiData = () => {
  return useContext(ApiDataContext);
};

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    api
      .get("Category")
      .then((result) => {
        console.log(result.data);
        setApiData(result.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  return (
    <ApiDataContext.Provider value={apiData}>
      {children}
    </ApiDataContext.Provider>
  );
};
