import {useState, useEffect} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default function SimpleSlider() {
  const [carouselImages, setCarouselImages] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getCarouselImages = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(carouselImage => ({
        id: carouselImage.id,
        imageUrl: carouselImage.image_url,
      }))
      setCarouselImages(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getCarouselImages()
  }, [])

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => <div>FailureView</div>

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  const renderSuccessView = () => (
    <div className="slider-container">
      <Slider {...settings} className="slider" slick-dots>
        {carouselImages.map(image => (
          <div key={image.id}>
            <img src={image.imageUrl} alt="offer" className="offer-image" />
          </div>
        ))}
      </Slider>
    </div>
  )

  const renderAllOffers = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <>{renderAllOffers()}</>
}
