import {useState, useEffect} from 'react'
import { useAuthContext } from './useAuthContext'
import useUpdateUserDoc from './useUpdateDocUser'

function useCartActions() {
  const [cartId, setCartId] = useState()
  const [cart, setCart] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const {user, data} = useAuthContext()
  const {updateUserDoc} = useUpdateUserDoc()

  useEffect(() => {
    data && setCartId(data.cartId)
  }, [cartId])



  const createCart = (product) => {
        console.log(product)
        setIsLoading(true)
        fetch("../api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                product: product
              }
          }),
        })
          .then((res) =>  res.json())
          .then((data) => {
            setCartId(data.order.id)
            updateUserDoc(user, 'cartId', cartId)
            setIsLoading(false)
          })
  }

  const addToCart = (product) => {
    setIsLoading(true)
    fetch("../api/update-add-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: { 
            id: cartId,
            product: product
          }
      }),
    })
      .then((res) =>  res.json())
      .then((data) => {
        console.log(data)
        setCart(data)
      })
      .then(() => setIsLoading(false))
  }

  const retrieveCart = (cartId) => {
    setIsLoading(true)
    fetch("../api/retrieve-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: { 
            id: cartId
          }
      }),
    })
      .then((res) =>  res.json())
      .then((data) => setCart(data))
      .then(() => setIsLoading(false))
  }

  return {createCart, addToCart, retrieveCart, cart, isLoading, cartId}
}

export default useCartActions