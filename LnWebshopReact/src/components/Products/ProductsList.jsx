import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const [page, setPage] = useState(1)
  const category = search.get("category") || "";
  const searchQuery = search.get("search")  
  const { data, error, loading } = useData(
    "/products", 
    { params: { search: searchQuery, category, perPage: 10, page } }, 
    [searchQuery, category, page]
  );
  const skeletons = Array(8).fill(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1 && !loading && data && page < data.totalPages) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [data, loading])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, category])
  
 

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="sortingSelect" className="product_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data?.products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        {loading
          && skeletons.map((_, index) => <ProductCardSkeleton key={index} />)}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductsList;
