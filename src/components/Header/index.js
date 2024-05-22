import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="left-section">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dbdke7gop/image/upload/v1714473137/Frame_274_eoxvxk.png"
              alt="website logo"
            />
          </Link>
          <p className="company-name">Tasty Kitchens</p>
        </div>
        <div className="right-section">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link home">
                Home
              </Link>
            </li>
            <li className="nav-menu-item cart">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
