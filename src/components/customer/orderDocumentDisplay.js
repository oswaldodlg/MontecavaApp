import { Box, Card, CardContent, Typography, Button, Grid, Modal} from '@mui/material';
import React, {useEffect, useState} from 'react';
import UploadFileModal from './uploadFileModal';
import NextLink from 'next/link';
import NextImage from 'next/image';

import ImgArchivo from '../../../assets/img/archivo-pdf.png';
import useDeleteDoc from 'src/hooks/useDeleteDoc';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const DocAdminModal = ({doc, name, id, orderId}) => {

  const [open, setOpen] = useState(false);

  const {deleteDoc} = useDeleteDoc()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteDoc(id, doc, name, orderId)
    handleClose()
  }

  return(
    <>
    <Box sx={{cursor: 'pointer'}}>
    <a  onClick={handleOpen}>
    <NextImage src={ImgArchivo.src} height={50} width={50} /> 
    <Typography sx={{cursor: 'pointer'}}>{doc.docName}</Typography>
    </a>
    </Box>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <Typography textAlign='center' variant="h6" component="h2" sx={{py: 3}}>
        Documento {doc.docName}
      </Typography>
      <Box sx={{display: 'flex', justifyContent:"space-around"}}>
      <NextLink href={doc.url}>
        <a target="_blank"
        rel="noreferrer" 
        href={doc.url}
        style={{textDecoration: 'none'}}
        >
          <Button variant='contained'>Visualizar</Button>
        </a>
      </NextLink>
      <Button variant="outlined" color="error" onClick={handleDelete}>Eliminar</Button>
      </Box>
    </Box>
    </Modal>
    </>
  )
}

const OrderDocViewComponent = ({id, data, credentials, orderId}) => {

  const [currentDocs, setCurrentDocs] = useState()
  

  useEffect(() => {
    data && setCurrentDocs(data)
    
  }, [data])

  useEffect(() => {
    console.log(currentDocs)
    console.log(credentials)
  }, [currentDocs, credentials])
  
  

  
  return(
    <>
    <Grid container flexDirection='row' sx={{minHeight: '5vh', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container sx={{p: 5}}>
        {credentials === 'admin' && currentDocs && currentDocs.map((doc, index) => {
          return  (
          <Grid key={index} item xs={6} md={3} sx={{textAlign: 'center', p: 3}}>
          <DocAdminModal doc={doc} name={'Orders'} id={id} orderId={orderId} />
          </Grid>
          )
        })}
        { credentials === 'user' && currentDocs && currentDocs.map((doc, index) => {
          return  (
          <Grid key={index} item xs={6} md={3} sx={{textAlign: 'center', p: 3}}>
          <NextLink href={doc.url}>
          <a target="_blank"
          rel="noreferrer" 
          href={doc.url}
          style={{textDecoration: 'none'}}
          >
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

export default OrderDocViewComponent;