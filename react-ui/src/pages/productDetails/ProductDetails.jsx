import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { useProductData } from "../../context/ProductDataContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productID } = useParams();
  // const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true); // Added a loading state

  const productData = useProductData();

  // useEffect(() => {
  //   api
  //     .get(`Product/${productID}`)
  //     .then((result) => {
  //       console.log(result.data);
  //       setItem(result.data);
  //       setLoading(false); // Set loading to false when data is available
  //     })
  //     .catch((ex) => {
  //       console.log(ex);
  //       setLoading(false); // Set loading to false in case of an error
  //     });
  // }, [productID]);

  // Find the product with the matching ID in the context
  // Ensure productData is not null before using it
  if (!productData) {
    return <p>Loading...</p>; // Or handle the loading state in another way
  }

  // Find the product with the matching ID in the context
  const item = productData.find((item) => item.product.id == productID);

  return (
    <div className="detailsPage">
      {item ? (
        <div className="detailsDiv">
          <div className="detailsItem">{item.product.id}</div>
          <div className="detailsItem">{item.product.productName}</div>
          <div className="detailsItem">{item.product.categoryID}</div>
          <div className="detailsItem">{item.product.description}</div>
          <div className="detailsItem">{item.product.price}</div>
          <div className="detailsItem">{item.product.stockQuantity}</div>
          <img
            src={`data:image/jpeg;base64,${item.imageBase64}`}
            alt={item.product.productName}
            className="detailsImage"
          />
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
