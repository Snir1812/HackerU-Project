import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productID } = useParams();
  return <div>{productID}</div>;
};

export default ProductDetails;
