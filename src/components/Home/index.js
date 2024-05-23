import {Link} from 'react-router-dom'
import SimpleSlider from '../SimpleSlider/index'
import PopularRestaurants from '../PopularRestaurants/index'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Home = () => (
  <div>
    <div className="container">
      <Header />
      <SimpleSlider />
      <PopularRestaurants />
    </div>
    <Footer />
  </div>
)

export default Home
