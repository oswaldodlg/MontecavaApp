import React, {useState, useEffect} from 'react';

export default function useGetSubscriptionData() {
    const [subscriptionData, setSubscriptionData] = useState(null)
    const [loading, setIsLoading] = useState(false)

    const retrieveSubscriptionData = (subscriptionId) => {
        setIsLoading(true)
        fetch("/api/retrieve-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
                subscriptionId: subscriptionId
              }
          }),
        })
          .then((res) =>  res.json())
          .then((data) => setSubscriptionData(data));
    }

    return {retrieveSubscriptionData, subscriptionData, loading}
}