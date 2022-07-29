import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image'
import Link from 'next/link'


import Logo1 from 'public/static/MontecavaLogo-transparent.png'


const pages = ['Nosotros','Servicios','login'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"  sx={{padding: '3vh', backgroundColor: {xs: '#010226', md:'rgba(125, 125, 125, 0.20)'}}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            padding='1vh'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
          >
            <Link href={'/'} passHref><Image src={Logo1} height={125} width={125} /></Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'contents', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu style={{color:'#163860'}}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Link href={`/${page}`}  passHref>
                  <Typography   textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, textAlign: 'center', placeContent: 'center'}}
          >
            <Link href={'/'} passHref><Image src={Logo1} alt="logo" height={125} width={125} /></Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, textAlign: 'center' }} justifyContent="flex-end" >
            {pages.map((page) => (
            
              <Link key={page} href={`/${page}`} passHref>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{color:'#FFF'}}
              >
                {page === 'login' ? <Typography> Iniciar Sesión </Typography> : <Typography> {page}</Typography>}
              </Button>
              </Link>
              )
            )
            }
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;