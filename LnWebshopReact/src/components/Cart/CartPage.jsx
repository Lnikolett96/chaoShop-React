import React from 'react'
import './CartPage.css'
import user from '../../assets/user.webp'
import Table from '../common/Table'
import remove from '../../assets/remove.png'
import QuantityInput from '../SingleProduct/QuantityInput'

const CartPage = () => {
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
                <tr>
                    <td>Iphone 14 Pro</td>
                    <td>$990</td>
                    <td className='align_center table_quantity_input'> <QuantityInput /> </td>
                    <td>$999</td>
                    <td><img src={remove} alt="remove icon" className='cart_remove_icon' /></td>
                </tr>
            </tbody>
        </Table>
        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>SubTotal</td>
                    <td>$990</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$9</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>$999</td>
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
