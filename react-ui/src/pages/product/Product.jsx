import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../utils/api";
import "./Product.css";
import "../../pages/General.css";

const Products = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`Product/Category/${categoryID}`)
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
      })
      .catch((ex) => console.log(ex));
  }, [categoryID]);

  return (
    <div className="generalPage">
      <div className="cardList">
        {products.map((item) => (
          <div className="cardDiv" key={item.product.id}>
            <img
              src={`data:image/jpeg;base64,${item.imageBase64}`}
              alt={item.productName}
              className="cardImage"
            />
            <div className="cardItem">{item.product.productName}</div>
            <div className="cardItem">{item.product.price}$</div>
            <button
              className="cardItem"
              onClick={() => {
                navigate(`/products/details/${item.product.id}`);
              }}
            >
              More Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
