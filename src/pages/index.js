import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import { useAuthContext } from 'src/hooks/useAuthContext';

export default function Home({allowed, setAllowed}) {

    const {authIsReady, user, data} = useAuthContext()

    const router = useRouter()

    useEffect(() => {

        const setCredentials = async() => {
            if (user && authIsReady && data.credentials === "admin") {
                await router.push("/admin");
            }
            else if (user && authIsReady && data.credentials === "user") {
                data.subscriptionId ? router.push("/user") : router.push("/user/suscripcion")
            }
            else if (!user && authIsReady && data.credentials === null) {
                await router.push("/login");
            }
        //     else if (router.pathname.startsWith("/user") && data && data.credentials === "user" && !data.subscriptionId) {
        //        await router.replace('/user/suscripcion')
        //    }
            else if (router.pathname.startsWith("/admin") && data.credentials === "user" && allowed === false){
                await router.push("/user")
                setAllowed(true)
           }
           else if (router.pathname.startsWith("/user") && data.credentials === "admin"){
                await router.push("/admin");
                setAllowed(true)
           }
           
            
        }  
      
        return setCredentials() 
      }, [user, data.credentials, authIsReady])
      
      return (
          <>Loading...</>
      )

}
