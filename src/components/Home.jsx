import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/products/${product.id}/image`,
                { responseType: "blob" },
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error,
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          }),
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img
          src={unplugged}
          alt="Error"
          style={{ width: "100px", height: "100px" }}
        />
      </h2>
    );
  }
  return (
    <>
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } =
              product;
            return (
              <div
                className={`card product-card mb-3 ${productAvailable ? "" : "out-of-stock-card"}`}
                key={id}
              >
                <Link to={`/product/${id}`} className="product-card-link">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="product-card-image"
                  />
                  <div className="product-card-body">
                    <div>
                      <h5 className="product-card-title">
                        {name.toUpperCase()}
                      </h5>
                      <i className="product-card-brand">{"~ " + brand}</i>
                    </div>
                    <hr className="hr-line" />
                    <div className="product-card-price">
                      <i className="bi bi-currency-rupee" />
                      <span>{price}</span>
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  className="btn-hover color-9 product-card-button"
                  onClick={() => addToCart(product)}
                  disabled={!productAvailable}
                >
                  {productAvailable ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
