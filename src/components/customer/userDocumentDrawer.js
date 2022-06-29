import { Box, Card, CardContent } from '@mui/material';
import IconExpansionTreeView from './treeItemsDrawer';
import React from 'react';

export default function UserDocumentDrawer({setCurrentDocView, subscription}) {
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
                <IconExpansionTreeView setCurrentDocView={setCurrentDocView} subscription={subscription}/>
            </Box>
        </CardContent>
    </Card>
  )
}
