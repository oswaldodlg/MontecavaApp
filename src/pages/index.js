import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import { useAuthContext } from 'src/hooks/useAuthContext';

export default function Home({allowed, setAllowed}) {

    const {authIsReady, user, credentials} = useAuthContext()

    const router = useRouter()

    useEffect(() => {

        const setCredentials = async() => {
            if (user && authIsReady && credentials === "admin") {
                await router.replace("/admin");
            }
            if (user && authIsReady && credentials === "user") {
                await router.replace("/user");
            }
            if (!user && authIsReady && credentials === null) {
                await router.push("/login");
            }
            if (router.pathname.startsWith("/admin") && credentials === "user" && allowed === false){
                await router.push("/user")
                setAllowed(true)
           }
           if (router.pathname.startsWith("/user") && credentials === "admin"){
                await router.push("/admin");
                setAllowed(true)
           }
            
        }  
      
        return setCredentials() 
      }, [user, credentials, authIsReady])
      
      return (
          <>Loading...</>
      )

}
