import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import GrainIcon from '@material-ui/icons/Grain';
import { green } from '@material-ui/core/colors';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TotalCustomers = (props) => {
  const navigate = useNavigate();
  const [LUser, setLUser] = useState(null);
  
  //API pulls for auth-ing logged in user. 
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/auth', { withCredentials: true })
      .then(res => {
        // console.log(res.data.user);
        if (res.data.user) {
          setLUser(res.data.user);
        } else {
          navigate('/login', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        navigate('/login', { replace: true })
      })
      
  }, [])
  
  
  //Fetches and calucates my asset total count of signed in LUser.
  const myAssetC = () =>  { 
    var total = 0;
      // console.log(LUser)
      for ( const [i, crypto] of LUser.cryptos.entries() ){
        // console.log(crypto)
        total += crypto.amount
      }
      return total;
    }
  
  return(
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            COLLECTIVE TOTAL COINS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            { LUser != null ? myAssetC() : 'Loading...'} Coins
            {/* INSERT COIN .LEGNTH HERE */}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56
            }}
          >
            <GrainIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        {/* <ArrowUpwardIcon sx={{ color: green[900] }} /> */}
        <Typography
          variant="body2"
          sx={{
            color: green[900],
            mr: 1
          }}
        >
          {/* 16% */}
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          {/* Since last month */}
        </Typography>
      </Box>
    </CardContent>
  </Card>
)};

export default TotalCustomers;
