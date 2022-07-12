import { arrayUnion } from 'firebase/firestore'
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import { useAuthContext } from './useAuthContext'
import useUpdateUserDoc from './useUpdateDocUser'

function useCartActions() {
  const [cartId, setCartId] = useState()
  const [cart, setCart] = useState()
  const [clientSecret, setClientSecret] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const {user, data} = useAuthContext()
  const {updateUserDoc} = useUpdateUserDoc()
  
  const router = useRouter() 

  // useEffect(() => {
  //   data && setCartId(data.cartId)
    
  // }, [cartId])

  // useEffect(() => {
  //   return () => {retrieveCart(cartId)}
  // }, [cartId])
  





  const createOrder = async(items, customerId) => {

        let line_items = []
        items.map((item) => line_items.push({product: item.id, quantity: item.quantity}))
        

        setIsLoading(true)
        fetch("../api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                products: line_items,
                customer: customerId
              }
          }),
        })
          .then((res) =>  res.json())
          .then(async(data) => {
            console.log(data)
            setIsLoading(false)
            router.push(`/user/checkout?cartId=${data.order.id}&paymentId=${data.order.payment.payment_intent}`)
          })
      
  }

  const retrieveOrder = (cartId) => {
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

  const retrievePaymentIntent = (paymentId) => {
    setIsLoading(true)
    fetch("../api/retrieve-payment-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: { 
            paymentId: paymentId
          }
      }),
    })
      .then((res) =>  res.json())
      .then((data) => {
        console.log(data)
        setClientSecret(data.clientSecret)}
        )
      .then(() => setIsLoading(false))
  }

  return {createOrder, retrieveOrder, retrievePaymentIntent, clientSecret, cart, isLoading}
}

export default useCartActions