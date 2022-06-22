import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import { useAuthContext } from 'src/hooks/useAuthContext';
import { CircularProgress } from '@mui/material';

export default function Home({allowed, setAllowed}) {

    const {authIsReady, user, data} = useAuthContext()

      
      return (
          <>
            <CircularProgress />
          </>
      )

}
