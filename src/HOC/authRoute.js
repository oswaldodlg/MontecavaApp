import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuthContext } from "src/hooks/useAuthContext"
import Home from "src/pages"
import Login from "src/pages/login"
import { route } from "next/dist/server/router"

const AuthRoute = ({ children }) => {
    const {authIsReady, user, credentials} = useAuthContext()
    const router = useRouter()

    const [allowed, setAllowed] = useState(true)


    useEffect(() => {
      if (!user && authIsReady)
      {router.push("/login")}
      

      const permission = async() => {
      
        if (router.pathname.startsWith("/admin") && credentials === "user"){
          setAllowed(null)
          await setAllowed(false)
          return <></>
          }
          if (router.pathname.startsWith("/user") && credentials === "admin"){
          await setAllowed(false)
          return <></>
          }
       
      }
    console.log(allowed)
    return permission()
     
    }, [user, authIsReady, credentials])


    // useEffect(() => {

    //   const setCredentials = async() => {
    //     if (router.pathname.startsWith("/admin") && credentials !== "admin"){
    //       await router.replace("/user");
    //       return;
    //     }
    //     if (router.pathname.startsWith("/user") && credentials !== "user"){
    //         await router.replace("/admin");
    //         return;
    //     }
    // }  
    
  
    // }, [credentials])
    
    
    
  if (user && authIsReady && credentials ==='admin') {
    return <>{!allowed ? <Home allowed= {allowed} setAllowed={setAllowed}/>  : children}</>
  } else if (user && authIsReady && credentials ==='user'){
      return <>{!allowed ? <Home allowed= {allowed} setAllowed={setAllowed}/>  : children}</> 
  }
  else if(!authIsReady && credentials === null){
    return <></>
  } 
  else if(allowed === null || allowed === false){
    return <></>
  }
  else if(!user && authIsReady && router.pathname.startsWith("/login")) {
    return <Login />
  }
  else{
    return <></>
  }
}

export default AuthRoute;
