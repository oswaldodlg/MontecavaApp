import React, { useEffect } from 'react'
import { useAuthContext } from 'src/hooks/useAuthContext';

export default function Home() {

    const {authIsReady, user, credentials} = useAuthContext()

    useEffect(() => {

        const setCredentials = async() => {
            if (user && authIsReady && credentials === "admin") {
                await router.replace("/admin");
            }
            if (user && authIsReady && credentials === "user") {
                await router.replace("/user");
            }
            if (!user && authIsReady && credentials === null) {
                await router.replace("/login");
            }

            return setCredentials()
        }   
      }, [user, credentials])
      
      return (
          <></>
      )

}
