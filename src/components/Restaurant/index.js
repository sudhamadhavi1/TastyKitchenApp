import {Link} from 'react-router-dom'

import StarIcon from '../../Icons/StarIcon'
import './index.css'

const Restaurant = props => {
  const {details} = props
  return (
    <Link to={`/restaurant/${details.id}`} className="link-style">
      <div className="restaurant-container">
        <img
          src={details.imageUrl}
          alt={details.name}
          className="imageContainer"
        />
        <div className="restaurant-brief-details">
          <span className="restaurant-name">{details.name}</span>
          <span className="cuisine">{details.cuisine}</span>
          <div>
            <StarIcon />
            <span className="rating">{details.userRating.rating}</span>
            <span className="number-ratings">
              ({details.userRating.totalReview} ratings)
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Restaurant
