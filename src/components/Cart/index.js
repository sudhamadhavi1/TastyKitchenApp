import {useState, useContext} from 'react'
import './index.css'
import {useCartItemContext} from '../../context/CartItemsContext'

const Cart = () => {
  const {cartItems} = useCartItemContext()
  console.log('inCart', cartItems)
  const saved = localStorage.getItem('cartItems')
  const initialValue = JSON.parse(saved)
  console.log('initial Value is ', initialValue)
  return (
    <>
      <h1>Cart</h1>
      {initialValue.cart.length > 0
        ? initialValue.cart.map(eachCartItem => (
            <div>
              <div>{eachCartItem.name}</div>
              <div>{eachCartItem.count}</div>
            </div>
          ))
        : null}
    </>
  )
}

export default Cart
