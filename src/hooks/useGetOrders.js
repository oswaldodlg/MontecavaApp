import React, {useState, useEffect} from 'react';
import { useAuthContext } from './useAuthContext';

export default function useGetOrderData() {
    const [orderData, setOrderData] = useState(null)
    const [loading, setIsLoading] = useState(false)

    

    const retrieveOrderData = (customerId) => {
        setIsLoading(true)
        fetch("/api/retrieve-orders-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                customer: customerId
              }
          }),
        })
          .then((res) =>  res.json())
          .then((data) => setOrderData(data));
    }

    return {retrieveOrderData, orderData, loading}
}