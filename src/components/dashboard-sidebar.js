import { useEffect } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, Grid } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import Logo from 'public/static/MontecavaLogo.png';
import { NavItem } from './nav-item';



const adminItems = [
  {
    href: '/admin',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Home'
  },
  {
    href: '/admin/clientes',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Clientes'
  },
  {
    href: '/admin/perfil',
    icon: (<UserIcon fontSize="small" />),
    title: 'Mi Perfil'
  },
  {
    href: '/admin/ajustes',
    icon: (<CogIcon fontSize="small" />),
    title: 'Ajustes'
  },
];

const userItems = [
  {
    href: '/user',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Home'
  },
  {
    href: '/user/perfil',
    icon: (<UserIcon fontSize="small" />),
    title: 'Mi Perfil'
  },
  {
    href: '/ajustes',
    icon: (<CogIcon fontSize="small" />),
    title: 'Ajustes'
  },
];

export const AdminDashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });


  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const adminContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ px: 3, paddingTop:'3vh' }}>
            <NextLink
              href="/admin"
              passHref
            >
            <Grid item textAlign='center'>
              <NextImage src={Logo.src} height={150} width={150} />
            </Grid>
            </NextLink>
          </Box>
          
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {adminItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        </Box>
      </Box>
    </>
  );


  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {adminContent}
      </Drawer>
    );
  }


  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {adminContent}
    </Drawer>
  );
};

AdminDashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
