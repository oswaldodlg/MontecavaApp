import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuthContext } from "src/hooks/useAuthContext"
import { CircularProgress, Box, Grid } from "@mui/material"
import Login from "src/pages/login"

const AuthRoute = ({ children }) => {
    const {authIsReady, user, data} = useAuthContext()
    const router = useRouter()

    const [allowed, setAllowed] = useState(false)

    useEffect(() => {  
     const routeProtection = async() => {

      if (!user && authIsReady){
        await router.push("/login")
        setAllowed(true)
      }

      else if (user && authIsReady && data){
        if (router.pathname.startsWith("/user") && data.credentials === "user" || router.pathname.startsWith("/admin") && data.credentials === "admin" ){
          if (router.pathname.startsWith("/user/confirmacionPago")){
            setAllowed(true)
          } else {
            data.credentials === "user" &&   data.subscriptionId ?  await router.push("/user") : await router.push("/user/suscripcion")
            data.credentials === "admin" && await router.push("/admin")
            setAllowed(true)
          }
        } 
        else if(router.pathname.startsWith("/admin") && data.credentials === "user"){
          !data.subscriptionId ? await router.push("/user/suscripcion") : await router.push("/user")
          setAllowed(true)
        } else if(router.pathname.startsWith("/user") && data.credentials === "admin"){
          await router.push("/admin")
          setAllowed(true)
        } 
        else if (router.pathname.startsWith("/user") && data.credentials === "user" && !data.subscriptionId){
          await router.push("/user/suscripcion")
          setAllowed(true)
        } 
        else if (router.pathname.startsWith("/login")){
          data.credentials === "user" &&   data.subscriptionId ?  await router.push("/user") : await router.push("/user/suscripcion")
          data.credentials === "admin" && await router.push("/admin")
          setAllowed(true)
        }
      }
    }
     
    return routeProtection()

      
  }, [user, authIsReady, data])


  useEffect(() => {
    console.log(allowed)
  }, [allowed])
  
  

  if (user && authIsReady && data && allowed) {
    return children
  } 
  else if (!user && authIsReady && allowed){
    return <Login />
  }
  else {
    return (
    <Box sx={{minHeight: '100vh', alignItems: 'center', justifyContent: 'center', alignItems: 'center'}} >
    <Grid container sx={{minHeight: '100vh', paddingY: '15vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'neutral.900', color: 'white', textAlign: 'center'}}>
    <CircularProgress size={50} color='inherit'/> 
    </Grid>
    </Box>
    )
  }

}

export default AuthRoute;
