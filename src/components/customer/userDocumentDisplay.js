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

const DocAdminModal = ({doc, name, id}) => {

  const [open, setOpen] = useState(false);

  const {deleteDoc, isPending, error} = useDeleteDoc()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteDoc(id, doc, name)
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

const DocViewComponent = ({name, id, data, credentials, carpet}) => {

  const [currentDocs, setCurrentDocs] = useState()
  

  useEffect(() => {
    
    data && setCurrentDocs(data)

  }, [data])
  

  
  return(
    <>
    <Grid container flexDirection='row' sx={{minHeight: '5vh', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item xs={12} md={6} lg={8} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{textAlign: {xs: 'center', md: 'end'}}}>
        {credentials != 'user' && <UploadFileModal name={name} id={id}/>}
      </Grid>
      <Grid container sx={{p: 5}}>
        {credentials != 'user' && currentDocs && currentDocs.map((doc, index) => {
          return  (
          <Grid key={index} item xs={6} md={3} sx={{textAlign: 'center', p: 3}}>
          <DocAdminModal doc={doc} name={name} id={id} />
          {/* <NextLink href={doc.url} key={index}>
          </NextLink>  */}
          </Grid>
          )
        })}
        {credentials && credentials === 'user' && currentDocs && currentDocs.map((doc, index) => {
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

export default function UserDocumentDisplay({currentDocView, id, data, credentials}) {
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
              name='Mensuales'
              carpet = 'Declaraciones' 
              id={id} 
              data={data.Declaraciones && data.Declaraciones.Mensuales}
              credentials={credentials} />}
              {currentDocView === 1 && 
              <DocViewComponent
              carpet = 'Declaraciones'  
              name='Anuales' 
              id={id} 
              data={data.Declaraciones && data.Declaraciones.Anuales}
              credentials={credentials}/>}
              {currentDocView === 2 && 
              <DocViewComponent
              carpet = 'Comprobantes'  
              name='IMSS' 
              id={id} 
              data={data.Comprobantes && data.Comprobantes.IMSS}
              credentials={credentials}/>}
              {currentDocView === 3 && 
              <DocViewComponent 
              carpet = 'Comprobantes' 
              name='AFORE' 
              id={id} 
              data={data.Comprobantes && data.Comprobantes.AFORE}
              credentials={credentials}/>}
              {currentDocView === 4 && 
              <DocViewComponent 
              carpet = 'Comprobantes' 
              name='INFONAVIT' 
              id={id} 
              data={data.Comprobantes && data.Comprobantes.INFONAVIT}
              credentials={credentials}/>}
              {currentDocView === 5 && 
              <DocViewComponent 
              carpet = 'Comprobantes' 
              name='Tesoreria' 
              id={id} 
              data={data.Comprobantes && data.Comprobantes.Tesoreria}
              credentials={credentials}/>}
              {currentDocView === 6 && 
              <DocViewComponent 
              name='Estados Financieros' 
              id={id} 
              data={data['Estados Financieros'] && data['Estados Financieros']}
              credentials={credentials}/>}
              {currentDocView === 7 && 
              <DocViewComponent 
              name='Constancia' 
              id={id} 
              data={data.Constancia && data.Constancia}
              credentials={credentials}/>}
              {currentDocView === 8 && 
              <DocViewComponent 
              name='Opinión' 
              id={id} 
              data={data.Opinion}
              credentials={credentials}/>}                
            </Box>
        </CardContent>
    </Card>
  )
}
