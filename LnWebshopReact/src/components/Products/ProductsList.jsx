import React from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";

const ProductsList = () => {
  const { data, error} = useData('/products')

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="sortingSelect" className="product_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price HIGHT to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGHT to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error ? <em className="form_error">{error.message}</em> : null }
        {data && data.products.map(product => <ProductCard key={product._id} id={product._id} image={product.images[0]} title={product.title} price={product.price} rating={product.reviews.rate} ratingCount={product.reviews.counts} stock={product.stock} />)}
      </div>
    </section>
  );
};

export default ProductsList;
