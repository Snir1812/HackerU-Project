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

  // localStorage.clear();
  // console.log(localStorage.getItem("cart"));

  // Step 1: Initialize the cart in local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  // Step 2: Function to add a product to the cart
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // const productID = item.product.id;

    // Check if the product with the same ID is already in the cart
    const existingProduct = cart.find(
      (cartItem) => cartItem.productID === item.product.id
    );

    if (existingProduct) {
      // If the product exists, increase its quantity by 1
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      cart.push({
        productID: item.product.id,
        productName: item.product.productName,
        pricePerItem: item.product.price,
        quantity: 1, // Start with quantity 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    api
      .get(`Product/Category/${categoryID}`)
      .then((result) => {
        // console.log(result.data);
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
            <button onClick={() => addToCart(item)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
