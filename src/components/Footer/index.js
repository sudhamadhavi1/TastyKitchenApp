import * as React from 'react'

import './index.css'
import TastyKitchenFooterIcon from '../../Icons/TastyKitchenFooterIcon'
import PinterestIcon from '../../Icons/PinterestIcon'

import InstagramIcon from '../../Icons/InstagramIcon'
import TwitterIcon from '../../Icons/TwitterIcon'
import FacebookIcon from '../../Icons/FacebookIcon'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-and-name">
        <TastyKitchenFooterIcon />
        <span className="name">Tasty Kitchens</span>
      </div>
      <div className="tag-line">
        The only thing we are serious about is food.
      </div>
      <div className="contact-us-text">Contact us on</div>
      <div className="contact-us-icons">
        <div className="pinterest-icon-container">
          <PinterestIcon />
        </div>
        <InstagramIcon />
        <TwitterIcon />
        <div className="facebook-icon-container">
          <FacebookIcon />
        </div>
      </div>
    </div>
  )
}
