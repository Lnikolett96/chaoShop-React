import React from 'react'
import './LinkWithIcon.css'

const LinkWithIcon = ({ title, link, emoji }) => {
  return (
    <a href={link} className='align_center'>{title} <img className='link_emoji' src={emoji} alt={`${title}-emoji`} /> </a>
  )
}

export default LinkWithIcon
