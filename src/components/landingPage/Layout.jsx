// components/layout.js

import Navbar from './Navbar';
import Footer from './Footer'
import { Box } from '@mui/system'
// import { useAuthContext } from '../hooks/useAuthContext'



export default function Layout({ children }) {
//   const {authIsReady, user} = useAuthContext()
  return (
    <Box sx={{position:'relative'}}>

      <>
      <Box>
        <Box sx={{position:{ xs:'inherit', md: 'absolute'}, width: '100%', zIndex: 1}}>
        <Navbar /> 
          {/* {!user ? <Navbar /> : <NavbarAdmin /> } */}
        </Box>
      {children}
      </Box>
      <Footer />
      </>
      
    </Box>
  )
}

// // components/layout.js

// import Navbar from './Navbar'
// import Footer from './Footer'
// import { Box } from '@mui/system'

// export default function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <Box>{children}</Box>
//       <Footer />
//     </>
//   )
// }