import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import App from '../../components/App/App'
import HeroSection from '../../components/HeroSection/HeroSection'

const Home = () => {
  const [category,setCategory] = useState("All");

  return (
    <div>
      <HeroSection/>
      {/* <Header/> */}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      <App/>
    </div>
  )
}

export default Home