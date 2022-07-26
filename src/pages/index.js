import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import { CircularProgress } from '@mui/material';

export default function Home() {

const router = useRouter()

useEffect(() => {
    router.push('/login')
}, [])
      
      return (
          <>
            <CircularProgress />
          </>
      )

}
