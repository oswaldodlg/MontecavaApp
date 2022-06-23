import React, {useState, useEffect} from 'react';
import { useAuthContext } from './useAuthContext';

export default function useGetSubscriptionData() {
    const [subscriptionData, setSubscriptionData] = useState()
    const [loading, setIsLoading] = useState(false)

    const retrieveSubscriptionData = async(subscriptionId) => {
        setIsLoading(true)
        fetch("api/retrieve-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                subscriptionId: subscriptionId
              }
          }),
        })
          .then((res) => res.json())
          .then((data) => {
          setSubscriptionData(data)
          console.log(data)
          setIsLoading(false)
        });
    }

    return {retrieveSubscriptionData, subscriptionData, loading}
}