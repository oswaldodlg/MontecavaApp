import { Box, Card, CardContent, Typography, Button, Grid} from '@mui/material';
import React from 'react';
import UploadFileModal from './uploadFileModal';

const DocViewComponent = ({name, id}) => {
  return(
    <>
    <Grid container flexDirection='row' sx={{height: '5vh', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item xs={12} md={6} lg={8} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{textAlign: {xs: 'center', md: 'end'}}}>
        <UploadFileModal name={name} id={id}/>
      </Grid>
    </Grid>
    </>
  )
}

export default function UserDocumentDisplay({currentDocView, id}) {
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
              {currentDocView === 0 && <DocViewComponent name='Declaraciones Mensuales' id={id}/>}
              {currentDocView === 1 && <DocViewComponent name='Declaraciones Anuales' id={id}/>}
              {currentDocView === 2 && <DocViewComponent name='Comprobantes IMSS' id={id}/>}
              {currentDocView === 3 && <DocViewComponent name='Comprobantes AFORE' id={id}/>}
              {currentDocView === 4 && <DocViewComponent name='Comprobantes INFONAVIT' id={id}/>}
              {currentDocView === 5 && <DocViewComponent name='Comprobantes Tesoreria' id={id}/>}
              {currentDocView === 6 && <DocViewComponent name='Estados Financieros' id={id}/>}
              {currentDocView === 7 && <DocViewComponent name='Constancia Situación Fiscal' id={id}/>}
              {currentDocView === 8 && <DocViewComponent name='Opinión' id={id}/>}                
            </Box>
        </CardContent>
    </Card>
  )
}
