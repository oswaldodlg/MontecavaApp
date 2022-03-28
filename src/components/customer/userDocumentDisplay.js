import { Box, Card, CardContent, Typography, Button, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import UploadFileModal from './uploadFileModal';
import NextLink from 'next/link'

const DocViewComponent = ({name, id, data}) => {

  const [currentDocs, setCurrentDocs] = useState()

  useEffect(() => {
    
    data && data['documents'] && setCurrentDocs((data['documents'][name]))

  }, [data])
  

  
  return(
    <>
    <Grid container flexDirection='row' sx={{height: '5vh', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item xs={12} md={6} lg={8} sx={{textAlign: {xs: 'center', md: 'start'}}}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{textAlign: {xs: 'center', md: 'end'}}}>
        <UploadFileModal name={name} id={id}/>
      </Grid>
        {currentDocs && currentDocs.map((doc, index) => {
          return  (<NextLink href={doc.url} key={index}>
                  <a target="_blank"> 
                  <Typography sx={{cursor: 'pointer'}}>{doc.docName}</Typography>
                  </a>
                  </NextLink> )
        })}
        {/* {data && data.documents.map((doc) => {
          return <Typography>{doc.name}</Typography>
        })} */}
      
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
              {currentDocView === 0 && <DocViewComponent name='Declaraciones Mensuales' id={id} data={data} />}
              {currentDocView === 1 && <DocViewComponent name='Declaraciones Anuales' id={id} data={data}/>}
              {currentDocView === 2 && <DocViewComponent name='Comprobantes IMSS' id={id} data={data}/>}
              {currentDocView === 3 && <DocViewComponent name='Comprobantes AFORE' id={id} data={data}/>}
              {currentDocView === 4 && <DocViewComponent name='Comprobantes INFONAVIT' id={id} data={data}/>}
              {currentDocView === 5 && <DocViewComponent name='Comprobantes Tesoreria' id={id} data={data}/>}
              {currentDocView === 6 && <DocViewComponent name='Estados Financieros' id={id} data={data}/>}
              {currentDocView === 7 && <DocViewComponent name='Constancia Situación Fiscal' id={id} data={data}/>}
              {currentDocView === 8 && <DocViewComponent name='Opinión' id={id} data={data}/>}                
            </Box>
        </CardContent>
    </Card>
  )
}
