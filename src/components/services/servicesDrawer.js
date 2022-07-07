import { Box, Card, CardContent } from '@mui/material';
import ServicesTreeView from './servicesTreeView';
import React from 'react';

export default function ServicesDrawer({setCurrentServiceView}) {
  return (
      
    <Card>
        <CardContent>
            <Box
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                minHeight: '40vh'
              }}
            >
                <ServicesTreeView setCurrentServiceView={setCurrentServiceView}/>
            </Box>
        </CardContent>
    </Card>
  )
}
