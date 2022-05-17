import React, {useState, useEffect} from 'react';
import { useAuthContext } from './useAuthContext';

export default function useGetStripeCustomer() {
    const [customer, setCustomer] = useState()
    const [loading, setIsLoading] = useState(false)

    const {user, data} = useAuthContext()

    const retrieveStripeCustomer = async(user) => {
        setIsLoading(true)
        fetch("api/retrieve-stripe-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                  id: user.email
              }
          }),
        })
          .then((res) => {res.json()})
          .then(async(data) => {
          await setCustomer(data)
          setIsLoading(false)
        });
    }

    const createStripeCustomer = async(user) => {
        setIsLoading(true)
        fetch("api/create-stripe-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                  email: user.email,
                  name: data.firstName + '' + data.lastName 
              }
          }),
        })
          .then((res) => res.json())
          .then(async(data) => {
          await setCustomer(data)
          setIsLoading(false)
        });
    }


    return {retrieveStripeCustomer, createStripeCustomer, customer}
}
