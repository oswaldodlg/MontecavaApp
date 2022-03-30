import { Box, Card, CardContent, Typography, Button, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import UploadFileModal from './uploadFileModal';
import NextLink from 'next/link';
import NextImage from 'next/image';

import ImgArchivo from '../../../assets/img/archivo-pdf.png';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// function BasicModal() {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

const DocViewComponent = ({name, id, data}) => {

  const [currentDocs, setCurrentDocs] = useState()

  useEffect(() => {
    
    data && data.docs[name] && setCurrentDocs((data.docs[name]))

  }, [data])
  

  
  return(
    <>
    <Grid container flexDirection='row' sx={{minHeight: '5vh', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item xs={12} md={6} lg={8} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{textAlign: {xs: 'center', md: 'end'}}}>
        <UploadFileModal name={name} id={id}/>
      </Grid>
      <Grid container sx={{p: 5}}>
        {currentDocs && currentDocs.map((doc, index) => {
          return  (
          <Grid key={index} item xs={4} md={3} sx={{textAlign: 'center', p: 3}}>
          <NextLink href={doc.url} key={index}>
          <a target="_blank">
          <NextImage src={ImgArchivo.src} height={50} width={50} /> 
          <Typography sx={{cursor: 'pointer'}}>{doc.docName}</Typography>
          </a>
          </NextLink> 
          </Grid>
          )
        })}
      </Grid>
    </Grid>
    </>
  )
}

export default function UserDocumentDisplay({currentDocView, id, data}) {
  return (
      
    <Card>
        <CardContent>
            <Box
            sx={{
                
                justifyContent: 'center',
                display: 'flex',
                minHeight: '40vh'
              }}
            >
              {currentDocView === 0 && 
              <DocViewComponent 
              name='Declaraciones Mensuales' 
              id={id} 
              data={data} />}
              {currentDocView === 1 && 
              <DocViewComponent 
              name='Declaraciones Anuales' 
              id={id} 
              data={data}/>}
              {currentDocView === 2 && 
              <DocViewComponent 
              name='Comprobantes IMSS' 
              id={id} 
              data={data}/>}
              {currentDocView === 3 && 
              <DocViewComponent 
              name='Comprobantes AFORE' 
              id={id} 
              data={data}/>}
              {currentDocView === 4 && 
              <DocViewComponent 
              name='Comprobantes INFONAVIT' 
              id={id} 
              data={data}/>}
              {currentDocView === 5 && 
              <DocViewComponent 
              name='Comprobantes Tesoreria' 
              id={id} 
              data={data}/>}
              {currentDocView === 6 && 
              <DocViewComponent 
              name='Estados Financieros' 
              id={id} 
              data={data}/>}
              {currentDocView === 7 && 
              <DocViewComponent 
              name='Constancia Situación Fiscal' 
              id={id} 
              data={data}/>}
              {currentDocView === 8 && 
              <DocViewComponent 
              name='Opinión' 
              id={id} 
              data={data}/>}                
            </Box>
        </CardContent>
    </Card>
  )
}
