import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import {motion} from 'motion/react'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithIcon from './LinkWithIcon';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userContext from '../../contexts/UserContext'
import cartContext from '../../contexts/CartContext'
import { getSuggestionsAPI } from '../../services/productServices'

const Navbar = () => {

  const [ search, setSearch ] = useState("")
  const user = useContext(userContext)
  const { cart } = useContext(cartContext)
  const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState(-1)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim() !== ""){
      navigate(`/products?search=${search.trim()}`)
      setSuggestions([])
    }
  }

  const handlekeyDown = (e) => {
    if (selectedItem < suggestions.length) {

      if (e.key === 'ArrowDown') {
        setSelectedItem(current => current === suggestions.length - 1 ? 0 :  current + 1)
      }else if (e.key === 'ArrowUp') {
        setSelectedItem(current => current === 0 ? suggestions.length - 1 : current - 1)
      } else if (e.key === 'Enter' && selectedItem > -1) {
        const suggestion = suggestions[selectedItem]
        navigate(`/products?search=${suggestion.title}`)
        setSearch("")
        setSuggestions([])
      }
    } else {
      setSelectedItem(-1)
    }
  }

  useEffect(() => {
    if (search.trim() !== ""){
      getSuggestionsAPI(search).then(resp => setSuggestions(resp.data)).catch(err => console.log(err))
    } else {
      setSuggestions([])
    }
  }, [search])

  return (
    <motion.nav className='navbar align_center' initial={{ opacity: 0, y: -30 }} animate={{opacity: 1, y: 0}} transition={{duration: 3, ease: "easeInOut"}}>
      <div className='align_center'>
        <h1 className='navbar_heading'>Chao<div className='s-word'>S</div>hop</h1>
        <form action="" className="align_center navbar_form" onSubmit={handleSubmit}>
          <input type="text" name="" id="" className='navbar_search' placeholder='Search Products' value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handlekeyDown} />
          <button type='submit' className="search_button">Search</button>
          {suggestions.length > 0 && 
            <ul className="search_result">
              {suggestions.map((sug, index) => 
                <li className={selectedItem === index ? "search_suggestion_link active" : "search_suggestion_link"} key={sug._id}>
                  <Link to={`/products?search=${sug.title}`} onClick={() => { setSearch(""), setSuggestions([]) }}>
                    {sug.title}
                  </Link>
                </li>
              )}
            </ul>
          }
        </form>
      </div>
      <div className='navbar_links align_center'>
        <LinkWithIcon title={'Home'} link={"/"} emoji={rocket} />
        <LinkWithIcon title={'Products'} link={"/products"} emoji={star} />
        {!user && <> 
          <LinkWithIcon title={'Log In'} link={"/login"} emoji={idButton} />
          <LinkWithIcon title={'Sign Up'} link={"/signup"} emoji={memo} /> 
        </>}
        {user && <> 
          <LinkWithIcon title={'Orders'} link={"/myorders"} emoji={order} />
          <LinkWithIcon title={'Log out'} link={"/logout"} emoji={lock} />
          <NavLink to="/cart" className='align_center'>
            Cart  <p className='align_center cart_counts'> { cart.length || 0 }</p>
          </NavLink> 
          </>}
      </div>
    </motion.nav>
  )
}

export default Navbar
