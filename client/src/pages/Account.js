import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import { Link as RouterLink, Redirect, useNavigate } from 'react-router-dom';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [LUser, setLUser] = useState({});
  const navigate = useNavigate();
  
  useEffect( () => {
    axios.get('http://localhost:8000/api/users/auth', {withCredentials: true})
      .then(res => {
          // console.log(res.data.user);
          if ( res.data.user ){
            setLUser(res.data.user)
          } else {
            navigate('/login', { replace: true })
          }
        })
      .catch(err => {
        console.log(err);
        navigate('/login', { replace: true })
      })
      
  },[]);
  
  
  return(
  <>
    <Helmet>
      <title>Account | HODL View</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile LUser={LUser} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Account;
