import React from 'react'
import {useRouter} from 'next/router'
import {authContextProvider} from '../context/AuthContext'

import { useAuthContext } from '../hooks/useAuthContext'

export function withPublic(Component) {
  return function WithPublic(props){
    const {user} = useAuthContext()
    const router = useRouter();

    if (user.authIsReady){
      router.replace("/");
      // return <h1>Loading...</h1>
    }
    return <Component user={user} {...props} />
  }
}
