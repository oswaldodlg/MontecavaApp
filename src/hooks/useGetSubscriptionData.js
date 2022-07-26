import React, {useState, useEffect} from 'react';

export default function useGetSubscriptionData() {
    const [subscriptionData, setSubscriptionData] = useState(null)
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
      setError(null)
    }, [])
    

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
          // .then((data) => {
          //   try{
          //     setSubscriptionData(data)
          //   } catch(err){
          //     console.log(err)
          //     setError(err)
          //   }
            
          // })
          .then((data) => {
            setSubscriptionData(data)
          })
          .catch((error) => {
            setError(error)
          });
        setIsLoading(false)
    }

    return {retrieveSubscriptionData, subscriptionData, error}
}