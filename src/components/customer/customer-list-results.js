import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { DashboardLayout } from 'src/components/dashboard-layout';
import NextLink from 'next/link'
import { useCollection } from 'src/hooks/useCollection';
const env = process.env.NODE_ENV

export const CustomerListResults = ({ customers, uid, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(0);

  const {showNext, documents, allDocsRetrieved} = useCollection('users')


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {

    setPage(newPage);
    
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Ubicacion
                </TableCell>
                <TableCell>
                  Telefono
                </TableCell>
                <TableCell>
                  Credenciales
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents && documents.map((customer) => {
                if(customer.id != uid && customer.credentials != 'admin'){
                return (
                <NextLink href={`clientes/detalles?id=${customer.key}`} key={customer.key}>
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.key) !== -1}
                  sx={{cursor: 'pointer'}}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        // src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.firstName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.firstName} {customer.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.location}
                  </TableCell>
                  <TableCell>
                    {customer.phoneNumber}
                  </TableCell>
                  <TableCell>
                    {customer.credentials}
                    {/* {format(customer.createdAt, 'dd/MM/yyyy')} */}
                  </TableCell>
                </TableRow> 
                </NextLink>
                )}
            })}
            </TableBody>
            
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
        <Grid item sx={{textAlign: 'center', py:1}}>
        {!allDocsRetrieved && documents && <Button onClick={showNext}>Mostrar más</Button>}
        {allDocsRetrieved && <Typography sx={{fontSize: '14px'}}>Se han desplegado todos los usuarios</Typography>}
        </Grid>
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

CustomerListResults.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


