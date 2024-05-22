import {Route, Switch, Redirect} from 'react-router-dom'
import {useState, useEffect} from 'react'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
// import Products from './components/Products'
// import ProductItemDetails from './components/ProductItemDetails'
// import Cart from './components/Cart'
// import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartItemsContext from './context/CartItemsContext'
import Cart from './components/Cart/index'

import './App.css'

const App = () => {
  const [cartItems, setItems] = useState({cart: []})
  console.log('inside App.Js', cartItems)

  const addToCart = itemAdded => {
    const updatedValue = [...cartItems.cart, {...itemAdded, count: 1}]
    console.log('checking added value', updatedValue)
    setItems({cart: updatedValue})
  }

  //   const cartItemDetails = itemAdded => {
  //     const indexItem = cartItems.findIndex(each => each.id === itemAdded.id)
  //     console.log('indexitem', indexItem)

  //     if (indexItem === -1) {
  //       const listItems = [...cartItems, itemAdded]
  //       setItems(listItems)
  //     }
  //   }

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  //   const data = JSON.stringify(localStorage.getItem('cartItems'))

  const increase = itemAdded => {
    setItems({
      cart: cartItems.cart.map(cartItem =>
        cartItem.id === itemAdded.id
          ? {...cartItem, count: cartItem.count + 1}
          : cartItem,
      ),
    })
  }

  const decrease = item => {
    setItems({
      cart: cartItems.cart.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1}
          : cartItem,
      ),
    })
  }

  return (
    <CartItemsContext.Provider
      value={{cartItems, addToCart, increase, decrease}}
    >
      {/* <h1>Check</h1>
      {cartItems.cart.map(each => (
        <div key={each.id}>{each.name}</div>
      ))} */}
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        {/* <ProtectedRoute exact path="/products" component={Products} /> */}
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={RestaurantDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        {/* <Route path="/not-found" component={NotFound} /> */}
        {/* <Redirect to="not-found" /> */}
      </Switch>
    </CartItemsContext.Provider>
  )
}

export default App
