import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard/TotalValue';
// import LatestOrders from 'src/components/dashboard//LatestOrders';
// import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard/Sales';
import TasksProgress from 'src/components/dashboard/TotalAssets';
import TotalCustomers from 'src/components/dashboard/TotalCoins';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import TrafficByDevice from 'src/components/dashboard/PortfolioByCoin';

const Dashboard = () => {
//   const navigate = useNavigate();
//   const [LUser, setLUser] = useState(null);
//   const [assets, setAssests] = useState({
//     key: 'gtbtvifwrx9ooca9r4dlti',
//     symbol: 'BTC, LTC',
//     interval: 'day',
//     change: '1w',
//     data_points: '24',
//   })
  
//   useEffect( () => {
//     axios.get('http://localhost:8000/api/users/auth', {withCredentials: true})
//       .then(res => {
//           console.log(res.data.user);
//           if ( res.data.user ){
//             setLUser(res.data.user)
//           } else {
//             navigate('/login', { replace: true })
//           }
//         })
//       .catch(err => {
//         console.log(err);
//         navigate('/login', { replace: true })
//       })
//       axios.get('https://api.lunarcrush.com/v2?data=assets&key=gtbtvifwrx9ooca9r4dlti&symbol=LTC,BTC', assets)
//         .then( res => console.log(res))
//         .catch(err => console.log(err))
      
//   },[]);
  
  
  
  return (
  <>
    <Helmet>
      <title>Dashboard | HODL View</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
  );
};

export default Dashboard;
