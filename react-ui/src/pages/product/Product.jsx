import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import "./Product.css";
import "../../pages/General.css";
import SearchBar from "../../components/searchBar/SearchBar";
import { useProductData } from "../../context/ProductDataContext";

const Products = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const productData = useProductData();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  useEffect(() => {
    if (productData) {
      if (categoryID === "all") {
        setProducts(productData);
      } else {
        // const productFromContext = productData.filter(
        //   (item) => item.product.categoryID == categoryID
        // );
        setProducts(
          productData.filter((item) => item.product.categoryID == categoryID)
        );
      }
    }
  }, [categoryID, productData]); // Make sure to include productData in dependencies

  const filteredProducts = products.filter((item) =>
    item.product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (cartItem) => cartItem.productID === item.product.id
    );

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({
        productID: item.product.id,
        productName: item.product.productName,
        pricePerItem: item.product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="generalPage">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="cardList">
        {filteredProducts.map((item) => (
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
