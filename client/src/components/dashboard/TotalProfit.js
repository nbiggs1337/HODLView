import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { red } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { green } from '@material-ui/core/colors';


const TotalProfit = (props) => {
  const navigate = useNavigate();
  const [LUser, setLUser] = useState(null);
  const [AllAssets, setAllAssets ] = useState(null)
  
  useEffect(() => {
    axios.get('https://api.lunarcrush.com/v2?data=market&key=gtbtvifwrx9ooca9r4dlti&sort=mc&desc=true')
      .then(res => {
        // console.log(res.data.data)
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
        var value = Number(crypto.amount) * Number(oneCoin[0].p_btc);
        // console.log(total)
        total += value;
      }
    
    return (total.toFixed(4))
  } //Returns total asset value USD.
  
  
  
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
            TOTAL BTC VALUE
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            { LUser != null && AllAssets != null ? LUser.cryptos.length > 0 ? +myAsset()+' BTC' : 0 : 'Loading...' }
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};

export default TotalProfit;
