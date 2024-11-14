import React from 'react'
import App from '../../components/App/App'
import HeroSection from '../../components/HeroSection/HeroSection'
import Service from '../../components/Service/Service'
import Banner from '../../components/Banner/Banner'
import OrderCount from '../../components/aboutUsComponents/OrderCount'
import RecentFood from '../../components/RecentFood/RecentFood'

const Home = () => {

  return (
    <div className='flex flex-col gap-14'>
      <HeroSection/>
      <Service/>
      <RecentFood/>
      <Banner/>
      <OrderCount/>
      <App/>
    </div>
  )
}

export default Home