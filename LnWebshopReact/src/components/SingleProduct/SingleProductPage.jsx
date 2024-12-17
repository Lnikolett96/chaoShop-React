import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import useData from "../../hooks/useData";
import Loader from "../common/Loader"

const SingleProductPage = ({ addToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [ quantity, setQuantity ] = useState(1)
  const { id } = useParams();
  const { data: product, error, loading } = useData(`/products/${id}`);
  
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error.message}</em>}
      {loading && <Loader />}
      {Object.entries(product).length > 0 && 
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
                {product.images?.map((image, index) => (
                  <img
                    className={selectedImage === index ? "selected_image" : ""}
                    onClick={() => setSelectedImage(index)}
                    src={`http://localhost:5000/products/${image}`}
                    alt={product.title}
                  />
                ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className=" single_product_details">
            <h2 className="single_product_title">{product.title}</h2>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price?.toFixed(2)}</p>
            <h2 className="quantity_title">Quantity:</h2>
            <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
            <button className="search_button add_cart_button" onClick={() => addToCart(product, quantity)}>Add to Cart</button>
          </div>
        </>
      }
    </section>
  );
};

export default SingleProductPage;
