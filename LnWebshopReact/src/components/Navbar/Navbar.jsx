import React from 'react'
import './Navbar.css'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithIcon from './LinkWithIcon';
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar align_center'>
      <div className='align_center'>
        <h1 className='navbar_heading'>Chao<div className='s-word'>S</div>hop</h1>
        <form action="" className="align_center navbar_form">
          <input type="text" name="" id="" className='navbar_search' placeholder='Search Products' />
          <button type='submit' className="search_button">Search</button>
        </form>
      </div>
      <div className='navbar_links align_center'>
        <LinkWithIcon title={'Home'} link={"/"} emoji={rocket} />
        <LinkWithIcon title={'Products'} link={"/products"} emoji={star} />
        <LinkWithIcon title={'Log In'} link={"/login"} emoji={idButton} />
        <LinkWithIcon title={'Sign Up'} link={"/signup"} emoji={memo} />
        <LinkWithIcon title={'Orders'} link={"/myorders"} emoji={order} />
        <LinkWithIcon title={'Log out'} link={"/logout"} emoji={lock} />
        <NavLink to="/cart" className='align_center'>
          Cart  <p className='align_center cart_counts'> 0</p>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
