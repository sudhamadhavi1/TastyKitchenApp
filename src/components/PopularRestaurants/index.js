import {useState, useEffect} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Restaurant from '../Restaurant/index'
import SortIcon from '../../Icons/SortIcon'
import ChevronLeftIcon from '../../Icons/ChevronLeftIcon'
import ChevronRightIcon from '../../Icons/ChevronRightIcon'

const apiStatusConstants = {
  initial: 'Initial',
  success: 'Success',
  inProgress: 'InProgress',
  failure: 'Failure',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const LIMIT = 9

const PopularRestaurants = () => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedSortByOptions, setSelectedSortByOptions] = useState(
    sortByOptions[1].value,
  )
  const [popularRestaurants, setPopularRestaurants] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const maxPage = Math.round(total / LIMIT) + 1

  const getPopularRestaurants = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const offset = (page - 1) * LIMIT

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByOptions}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(offset)
      const updatedData = fetchedData.restaurants.map(eachRestaurant => ({
        hasOnlineDeliver: eachRestaurant.has_online_delivery,
        userRating: {
          ratingText: eachRestaurant.user_rating.rating_text,
          ratingColor: eachRestaurant.user_rating.rating_color,
          totalReview: eachRestaurant.user_rating.total_reviews,
          rating: eachRestaurant.user_rating.rating,
        },
        name: eachRestaurant.name,
        hasTableBooking: eachRestaurant.has_table_booking,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        imageUrl: eachRestaurant.image_url,
        id: eachRestaurant.id,
        menuType: eachRestaurant.menu_type,
        location: eachRestaurant.location,
        opensAt: eachRestaurant.opens_at,
        groupByTime: eachRestaurant.group_by_time,
      }))
      setTotal(fetchedData.total)
      setPopularRestaurants(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getPopularRestaurants()
  }, [selectedSortByOptions, page])

  const renderFailure = () => <div>Failure</div>

  const renderLoadingView = () => (
    <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
  )
  const renderSuccess = () => (
    <div className="restaurants-container">
      {popularRestaurants.map(eachRestaurantDetail => (
        <Restaurant
          key={eachRestaurantDetail.id}
          details={eachRestaurantDetail}
        />
      ))}
    </div>
  )

  const renderDisplayView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccess()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailure()
      default:
        return null
    }
  }

  const onChangeSortedValue = event => {
    setSelectedSortByOptions(event.target.value)
  }

  const onCLickDecrement = () => {
    console.log(page)
    const value = page - 1
    if (value > 0) {
      setPage(value)
    } else {
      setPage(1)
    }
  }

  const onCLickIncrement = () => {
    const changeValue = page + 1
    if (changeValue > maxPage) {
      setPage(maxPage)
    } else {
      setPage(changeValue)
    }
  }

  return (
    <div className="popular-restaurant-container">
      <h1 className="popular-restaurant-heading">Popular Restaurants</h1>
      <div className="caption-sorting-container">
        <p className="caption">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sorting-container">
          <SortIcon height={24} width={24} fill="#475569" />
          <span className="sortBy-text">Sort by </span>
          <select
            className="sorting-select"
            value={selectedSortByOptions}
            onChange={onChangeSortedValue}
          >
            {sortByOptions.map(eachOption => (
              <option
                className="sorting-option"
                key={eachOption.id}
                value={eachOption.value}
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr className="line" />
      {renderDisplayView()}
      <div className="pagination">
        <button
          type="button"
          className="pagination-button"
          onClick={onCLickDecrement}
          aria-label="Previous page"
        >
          <ChevronLeftIcon height={16} width={16} />
        </button>
        <p className="pagination-text">
          {page} of {maxPage}
        </p>
        <button
          type="button"
          className="pagination-button"
          onClick={onCLickIncrement}
          aria-label="Next page"
        >
          <ChevronRightIcon height={16} width={16} />
        </button>
      </div>
    </div>
  )
}

export default PopularRestaurants
