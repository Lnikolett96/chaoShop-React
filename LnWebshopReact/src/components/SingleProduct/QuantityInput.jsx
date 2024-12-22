import React from "react";
import './QuantityInput.css'

const QuantityInput = ({ quantity, setQuantity, stock, cartPage, productId }) => {
  return (
    <div style={{display: 'flex', margin: '20px'}}>
      <button className="quantity_input_button" onClick={() => cartPage ? setQuantity('decrease', productId) : setQuantity(quantity - 1)} disabled={quantity === 1}>
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button className="quantity_input_button" disabled={quantity >= stock} onClick={() => cartPage ? setQuantity('increase', productId) : setQuantity(quantity + 1)}>+</button>
    </div>
  );
};

export default QuantityInput;
