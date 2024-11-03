import React from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams()
  const category = search.get('category')

  const { data, error, loading} = useData('/products', {params: {
    category
  }}, [category])
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]

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
        {loading && skeletons.map((skeleton => <ProductCardSkeleton key={skeleton} />))}
        {error ? <em className="form_error">{error.message}</em> : null }
        {data && data.products.map(product => <ProductCard key={product._id} id={product._id} image={product.images[0]} title={product.title} price={product.price} rating={product.reviews.rate} ratingCount={product.reviews.counts} stock={product.stock} />)}
      </div>
    </section>
  );
};

export default ProductsList;
