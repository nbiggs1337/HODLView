import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoneyIcon from '@material-ui/icons/Money';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { red } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { green } from '@material-ui/core/colors';

const Budget = (props) => {
  const navigate = useNavigate();
  const [LUser, setLUser] = useState(null);
  const [AllAssets, setAllAssets ] = useState(null)
  const [MyAssets, setMyAssets] = useState([]);
  
  useEffect(() => {
    axios.get('https://api.lunarcrush.com/v2?data=market&key=gtbtvifwrx9ooca9r4dlti&sort=mc&desc=true')
      .then(res => {
        console.log(res.data.data)
        setAllAssets(res.data.data)
      })
      .catch(err => console.log(err))

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
  
  const myAsset = () =>  { //Fetches and calucates my asset total current value of signed in LUser.
    var total = 0;
      // console.log(LUser)
      for ( const [i, crypto] of LUser.cryptos.entries() ){
        // console.log(crypto)
        var oneCoin = AllAssets.filter((coin) => coin.s === crypto.coin)
        // console.log(oneCoin[0])
        var value = Number(crypto.amount) * Number(oneCoin[0].p);
        // console.log(total)
        total += value;
      }
    
    return (total.toFixed(2))
  } //Returns total asset value USD.
  
  const myPCDay = () => { //Calculates total portfolio % change over 24hrs.
    var total = 0;
    var count = 0;
    for ( const [i, crypto] of LUser.cryptos.entries() ){
      var one = AllAssets.filter( (coin) => coin.s === crypto.coin )
      total += one[0].pc;
      count += 1;
    }
    return (total/count).toFixed(2)
  }
  
  
  
  
  return(
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
            TOTAL USD VALUE
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            { LUser != null && AllAssets != null ? LUser.cryptos.length > 0 ? '$'+myAsset()+' USD' : 0 : 'Loading...' }
            {/* ADD STATE FOR TOTAL VALUE HERE */}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        { LUser != null && AllAssets != null ? myPCDay() > 0 ?  <ArrowUpwardIcon sx={{ color: green[600] }} /> : <ArrowDownwardIcon sx={{ color: red[900] }} /> : '...'} 
        <Typography
            sx={{
            // color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          { LUser != null && AllAssets != null ? LUser.cryptos.length > 0 ? myPCDay() + '%' : 0 : 'Loading...' }
          {/* ADD % CHANGE FROM LAST MONTH NUMBERS, SAME DATE  */}
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Avg Change ( 24 hrs )
        </Typography>
      </Box>
    </CardContent>
  </Card>
)};

export default Budget;
