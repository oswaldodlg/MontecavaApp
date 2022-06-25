import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export const SubscriptionDetails = ({data}) => {

  let privileges = data.subscriptionData.privileges.split(',')
  

  return (
    <>
      <Card sx={{minHeight: '33vh'}}>
        <CardHeader
         subheader={data.subscriptionData.term ? data.subscriptionData.name + ' ' + data.subscriptionData.term : data.subscriptionData.name  }
         title="Suscripción"
         avatar =  {data.isActive ? <Chip label="Activa" color="success"/> : <Chip label="Inactiva" color="error" /> } 
       />
        <Divider />
        <CardContent>
          <Grid
            container
            sx={{justifyContent: 'center'}}
          >
          <Grid item xs={12}>
                <Accordion >
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    
                    >
                    <Typography>Beneficios</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                    {privileges.map((privilege, index) => {
                        return(
                            <Typography key={index}>-{privilege}</Typography>
                        )
                    })}
                    </AccordionDetails>
                </Accordion>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    
      </>
  );
};