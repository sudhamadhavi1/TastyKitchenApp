import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import FoodItem from '../FoodItem/index'
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'Initial',
  success: 'Success',
  inProgress: 'InProgress',
  failure: 'Failure',
}

const RestaurantDetails = props => {
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
      const updatedData = fetchedData.food_items.map(eachItem => ({
        name: eachItem.name,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        count: 0,
      }))
      console.log(updatedData)
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
    <ul>
      {menuDetails.map(eachFoodItem => (
        <FoodItem key={eachFoodItem.id} eachFoodItem={eachFoodItem} />
      ))}
    </ul>
  )
}

export default RestaurantDetails
