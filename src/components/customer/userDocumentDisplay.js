import { Box, Card, CardContent, Typography, Button, Grid} from '@mui/material';
import React from 'react';
import UploadFileModal from './uploadFileModal';

const DocViewComponent = ({name}) => {
  return(
    <>
    <Grid container flexDirection='row' sx={{height: '5vh', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item xs={12} md={6} lg={8} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{textAlign: {xs: 'center', md: 'end'}}}>
        <UploadFileModal />
      </Grid>
    </Grid>
    </>
  )
}

export default function UserDocumentDisplay({currentDocView}) {
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
              {currentDocView === 0 && <DocViewComponent name='Declaraciones Mensuales'/>}
              {currentDocView === 1 && <DocViewComponent name='Declaraciones Anuales'/>}
              {currentDocView === 2 && <DocViewComponent name='Comprobantes IMSS'/>}
              {currentDocView === 3 && <DocViewComponent name='Comprobantes AFORE'/>}
              {currentDocView === 4 && <DocViewComponent name='Comprobantes INFONAVIT'/>}
              {currentDocView === 5 && <DocViewComponent name='Comprobantes Tesoreria'/>}
              {currentDocView === 6 && <DocViewComponent name='Estados Financieros'/>}
              {currentDocView === 7 && <DocViewComponent name='Constancia Situación Fiscal'/>}
              {currentDocView === 8 && <DocViewComponent name='Opinión'/>}                
            </Box>
        </CardContent>
    </Card>
  )
}
