import {useState, useContext} from 'react'
import './index.css'
import CartItemsContext from '../../context/CartItemsContext'

const FoodItem = props => {
  const {eachFoodItem} = props
  const {cartItems, increase, decrease, addToCart} = useContext(
    CartItemsContext,
  )
  const currentItem = cartItems.cart.filter(
    cartItem => cartItem.id === eachFoodItem.id,
  )
  if (currentItem.length > 0) {
    console.log('currentValue', currentItem[0].count)
  }
  //   const currentCountValue = currentItem.count
  //   console.log(currentCountValue)
  const count = currentItem.length > 0 ? currentItem[0].count : 0

  return (
    <li key={eachFoodItem.id}>
      <p>ItemsAdd</p>
      <button type="button" onClick={() => decrease(eachFoodItem)}>
        -
      </button>
      <p>{count}</p>
      <button type="button" onClick={() => addToCart(eachFoodItem)}>
        Add
      </button>
      <button type="button" onClick={() => increase(eachFoodItem)}>
        +
      </button>
      {eachFoodItem.name}
    </li>
  )
}

export default FoodItem
