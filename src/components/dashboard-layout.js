import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { AdminDashboardSidebar } from './dashboard-sidebar';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { UserDashboardSidebar } from './dashboard-sidebar-user';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const {authIsReady, user, data} = useAuthContext()
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
  data && console.log(data.credentials)
  }, [data])
  

  if (!user && authIsReady ){
    return <></>
  } else {
    return (
      <>
        <DashboardLayoutRoot>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
        {data && data.credentials === 'admin' && user &&
          <AdminDashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />}
        {data && data.credentials === 'user' && user &&
          <UserDashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />}
      </>
    )
  }
};
