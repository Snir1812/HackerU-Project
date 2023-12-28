import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  useEffect(() => {
    if (productData) {
      if (categoryID === "all") {
        setProducts(productData);
      } else {
        setProducts(
          productData.filter((item) => item.product.categoryID == categoryID)
        );
      }
    }
  }, [categoryID, productData]);

  const filteredProducts = products
    .filter((item) =>
      item.product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "lowToHigh":
          return a.product.price - b.product.price;
        case "highToLow":
          return b.product.price - a.product.price;
        case "aToZ":
          return a.product.productName.localeCompare(b.product.productName);
        case "zToA":
          return b.product.productName.localeCompare(a.product.productName);
        default:
          return 0;
      }
    });

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

    alert("Item added to the cart successfully!");
  };

  return (
    <div className="generalPage">
      <div className="d-flex align-items-center justify-content-center flex-row gap-3">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <label className="sortLabel">
          Sort by :
          <select
            className="sortInput"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="aToZ">Name: A to Z</option>
            <option value="zToA">Name: Z to A</option>
          </select>
        </label>
      </div>
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
              className="cardButton"
              onClick={() => {
                navigate(`/products/details/${item.product.id}`);
              }}
            >
              More Details
            </button>
            <button className="cardButton" onClick={() => addToCart(item)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
