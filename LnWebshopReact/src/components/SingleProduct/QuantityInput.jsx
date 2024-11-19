import React from "react";
import './QuantityInput.css'

const QuantityInput = ({ quantity, setQuantity, stock }) => {
  return (
    <div style={{display: 'flex', margin: '20px'}}>
      <button className="quantity_input_button" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button className="quantity_input_button" disabled={quantity >= stock} onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
};

export default QuantityInput;
