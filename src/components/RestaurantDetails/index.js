import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import FoodItem from '../FoodItem/index'
import './index.css'
import Header from '../Header'
import StarIcon from '../../Icons/StarIcon'

const apiStatusConstants = {
  initial: 'Initial',
  success: 'Success',
  inProgress: 'InProgress',
  failure: 'Failure',
}

const RestaurantDetails = props => {
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [menuDetails, setMenuDetails] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getRestaurantMenu = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const {match} = props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedRestaurantDetails = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        location: fetchedData.location,
        name: fetchedData.name,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
      }
      const updatedData = fetchedData.food_items.map(eachItem => ({
        name: eachItem.name,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        count: 0,
      }))

      setRestaurantDetails(updatedRestaurantDetails)
      setMenuDetails(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getRestaurantMenu()
  }, [])

  return (
    <div className="restaurant-header">
      <Header />
      <div className="landing-section-container">
        <div className="landing-section-details">
          <img
            className="restaurant-image"
            src={restaurantDetails.imageUrl}
            alt={restaurantDetails.name}
          />
          <div className="landing-left-section">
            <p className="landing-restaurant-name">{restaurantDetails.name}</p>
            <p className="landing-restaurant-cuisine">
              {restaurantDetails.cuisine}
            </p>
            <p className="landing-restaurant-location">
              {restaurantDetails.location}
            </p>
            <div className="ratings-cost-of-two-container">
              <div className="ratings-container">
                <StarIcon height={12} width={12} fill="#FFFFFF" />
                <span className="ratings">{restaurantDetails.rating}</span>
                <p className="reviews-count">
                  {restaurantDetails.reviewsCount}+ Ratings
                </p>
              </div>
              <div className="cost-for-two-container">
                <span className="cost">
                  &#8377; {restaurantDetails.costForTwo}
                </span>
                <p className="count-for-two">Cost for Two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul>
        {menuDetails.map(eachFoodItem => (
          <FoodItem key={eachFoodItem.id} eachFoodItem={eachFoodItem} />
        ))}
      </ul>
    </div>
  )
}

export default RestaurantDetails
