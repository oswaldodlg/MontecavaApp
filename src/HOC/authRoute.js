import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuthContext } from "src/hooks/useAuthContext"

const AuthRoute = ({ children }) => {
    const {authIsReady, user, credentials} = useAuthContext()
    const router = useRouter()


    useEffect(() => {
      if (!user && authIsReady)
      {router.push("/login")} 
    }, [user, authIsReady])
    
    
  if (user && authIsReady) {
    return <>{children}</>
  } else if(!authIsReady){
    return <></>
  } 
  else{
    return <>{children}</>
  }
}

export default AuthRoute;
