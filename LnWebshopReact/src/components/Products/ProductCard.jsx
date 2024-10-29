import React from "react";
import './ProductCard.css'
import iphone from '../../assets/iphone.jpg'
import star from '../../assets/white-star.png'
import basket from '../../assets/basket.png'

const ProductCard = ( { image } ) => {
  return (
  <article className="product_card">
    <div className="product_image">
        <a href="product/1"><img src={iphone} alt="Product Image" /></a>
    </div>
    <div className="product_details">
        <h3 className="product_price">$1199</h3>
        <p className="product_title">Iphone 14 Pro</p>
        <footer className="align_center product_info_footer">
            <div className="align_center">
                <p className="align_center product_rating"> <img src={star} alt="star" /> 5.0</p>
                <p className="product_review_count">120</p>
                <button className="add_to_cart">
                    <img src={basket} alt="cart icon" />
                </button>
            </div>
        </footer>
    </div>
  </article>
)
};

export default ProductCard;
