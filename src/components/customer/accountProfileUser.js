import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Grid
  } from '@mui/material';
  import { useAuthContext } from 'src/hooks/useAuthContext';
  
  
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  export const AccountProfileUser  = (props) => (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '31vh'
          }}
        >
          <Avatar
             {...stringAvatar(props.data.displayName)} 
             
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {props.data.displayName}
            
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body2"
          >
            {data.city}data.country}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
        data.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
  