import React from "react";
import "../General.css";
import { useApiData } from "../../context/ApiDataContext";
import { useEffect } from "react";

const Home = () => {
  const apiData = useApiData();

  useEffect(() => {
    // Check if apiData is available
    if (apiData) {
      // Now you can safely use apiData
      console.log(apiData);
    }
  }, [apiData]);

  return (
    <div>
      {apiData ? (
        // Render data here when it's available
        apiData.map((item) => <div key={item.id}>{item.name}</div>)
      ) : (
        // Render loading state or handle error
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
