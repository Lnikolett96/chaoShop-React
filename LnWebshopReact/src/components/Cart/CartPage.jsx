import React, { useEffect, useState } from 'react'
import './CartPage.css'
import user from '../../assets/user.webp'
import Table from '../common/Table'
import remove from '../../assets/remove.png'
import QuantityInput from '../SingleProduct/QuantityInput'

const CartPage = ({ cart }) => {
    const [subTotal, setSubtotal] = useState(0)

    useEffect(() => {
        let total = 0
        cart.forEach(item => {
            total += item.product.price * item.quantity
        })
        setSubtotal(total)
    }, [cart])
  return (
    <section className="align_center cart_page">
        <div className="align_center user_info">
            <img src={user} alt="user profile" />
            <div>
                <p className="user_name">
                    Charley
                </p>
                <p className="user_email">
                    Charley@gmail.com
                </p>
            </div>
        </div>
        <Table headings={["item", "Price", "Quantity", "Total", "Remove"]}>
            <tbody>
                {cart.map(({product, quantity}) => 
                <tr key={product._id}>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td className='align_center table_quantity_input'> <QuantityInput quantity={quantity} stock={product.stock} /> </td>
                    <td>${parseInt(product.price) * quantity}</td>
                    <td><img src={remove} alt="remove icon" className='cart_remove_icon' /></td>
                </tr>


                )}
            </tbody>
        </Table>
        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>SubTotal</td>
                    <td>${subTotal}</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$9</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>${subTotal + 9}</td>
                </tr>
            </tbody>
        </table>
        <button className="search_button checkout_button">
            Checkout
        </button>
    </section>
  )
}

export default CartPage
