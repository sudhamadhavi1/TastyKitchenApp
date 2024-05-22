import React, {useContext} from 'react'

const CartItemsContext = React.createContext()

export const useCartItemContext = () => {
  const cartContext = useContext(CartItemsContext)

  return cartContext
}

export default CartItemsContext
