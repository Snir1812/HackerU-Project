import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const ProductDetails = () => {
  const { productID } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true); // Added a loading state

  useEffect(() => {
    api
      .get(`Product/${productID}`)
      .then((result) => {
        console.log(result.data);
        setItem(result.data);
        setLoading(false); // Set loading to false when data is available
      })
      .catch((ex) => {
        console.log(ex);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [productID]);

  return (
    <div className="detailsDiv">
      {loading ? (
        <p>Loading...</p> // Display a loading message while data is being fetched
      ) : (
        <div>
          <div className="itemList">{item.product && item.product.id}</div>
          <div className="itemList">
            {item.product && item.product.productName}
          </div>
          <div className="itemList">
            {item.product && item.product.categoryID}
          </div>
          <div className="itemList">
            {item.product && item.product.description}
          </div>
          <div className="itemList">{item.product && item.product.price}</div>
          <div className="itemList">
            {item.product && item.product.stockQuantity}
          </div>
          <img
            src={`data:image/jpeg;base64,${item.imageBase64}`} // Adjust the format accordingly
            alt={item.product && item.product.productName}
            className="productImage"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
