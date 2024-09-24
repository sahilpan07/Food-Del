import React from 'react'
import App from '../../components/App/App'
import HeroSection from '../../components/HeroSection/HeroSection'
import Service from '../../components/Service/Service'
import Banner from '../../components/Banner/Banner'

const Home = () => {

  return (
    <div className='flex flex-col gap-12'>
      <HeroSection/>
      <Service/>
      <Banner/>
      <App/>
    </div>
  )
}

export default Home