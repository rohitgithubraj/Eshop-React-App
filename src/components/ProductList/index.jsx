import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">All Products</h2>
      <div class="row">
        {products.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
