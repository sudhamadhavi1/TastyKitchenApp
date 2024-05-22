import {Link} from 'react-router-dom'
import SimpleSlider from '../SimpleSlider/index'
import PopularRestaurants from '../PopularRestaurants/index'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="container">
    <Header />
    <SimpleSlider />
    <PopularRestaurants />
  </div>
)

export default Home
