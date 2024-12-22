import React from 'react'
import HeroSection from './HeroSection'
import FeatureProducts from './FeatureProducts'
import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'

const HomePage = () => {
  return (
    <div>
      <HeroSection title={'Buy Iphone 14 Pro'} subtitle={"Experience the power of Iphone 14 Pro with our most pro camera ever"} link={'/products/6718fdb05cbf2cebf47faf47'} image={iphone} />
      <FeatureProducts />
      <HeroSection title={'Build The Ultimate Setup'} subtitle={"You can add Studio display and color-matched accessories to your bag after you configure your Mac mini"} link={'/products/6718fdb05cbf2cebf47faf4f'} image={mac} />
    </div>
  )
}

export default HomePage
