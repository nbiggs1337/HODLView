import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const PortfolioByCoins = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [LUser, setLUser] = useState(null);
  const [AllAssets, setAllAssets ] = useState(null)
  const [MyAssets, setMyAssets] = useState([]);
  
  
  //API pulls for asset data & auth-ing logged in user. 
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
  
  //Logic to get user data values to plug-in to built in display logic
  //Fetches and calucates asset % of portfolio, returns array. 
  const myAssetsP = () =>  { 
    var data = [];
    var total = 0;
      for ( const [i, crypto] of LUser.cryptos.entries() ){
        var oneCoin = AllAssets.filter((coin) => coin.s === crypto.coin);
        var value = Number(crypto.amount) * Number(oneCoin[0].p);
        total += value;
      }
      for ( const [i, crypto] of LUser.cryptos.entries() ){
        var oneCoin = AllAssets.filter((coin) => coin.s === crypto.coin);
        var value = Number(crypto.amount) * Number(oneCoin[0].p);
        var perc = (value/total) * 100;
        data.push(perc);
      }
      
      return data;
    }
    
    //Creates array of strings containing the crypto name in order.
  const myAssetsLabel = () => {
    let data = [];
    for ( const [i, crypto] of LUser.cryptos.entries() ){
      data.push(crypto.coin);
    }
    return data;
  }
  
  //Creates data object, containing set object with all the values, names/labels, and % of portfolio, 
  //all at matching indexes in each respective array. data = [ { set } ]
  
  const deviceLabel = () => {
    let labels = LUser != null && AllAssets != null ? myAssetsLabel() : [];
    let percs = LUser != null && AllAssets != null ? myAssetsP() : [];
    let color = [
      colors.indigo[500],
      colors.red[600],
      colors.orange[600],
      colors.green[500],
      colors.purple[600],
      colors.blue[600],
      colors.yellow[500],
      colors.purple[600],
      colors.lime[600],
      colors.deepOrange[500],
      colors.cyan[500],
      colors.blueGrey[500],
      colors.amber[500]
    ];
    let data = [];
    for ( const [i, crypto] of LUser.cryptos.entries() ) {
      let set = {
        title: labels[i],
        value: percs[i].toFixed(),
        icon: ShowChartIcon,
        color: color[i]
      };
      data.push(set);
    }
    return data;
  }
  
  
//Built in for displaying data below, gives donut its proporties and plugs in methods above. 
// Ternaries used to avoid crashes while API delay catches up. 

  const data = {
    
    datasets: [
      {
        data: LUser != null && AllAssets != null ? myAssetsP() : [],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[500],
          colors.purple[600],
          colors.blue[600],
          colors.yellow[500],
          colors.purple[600],
          colors.lime[600],
          colors.deepOrange[500],
          colors.cyan[500],
          colors.blueGrey[500],
          colors.amber[500]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: LUser != null && AllAssets != null ? myAssetsLabel() : []
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
//All of these ^^ are for the graphic donut to display nicely.

//Setting the deviceLabel ( final object assembler ) to be the const thats plugged in to 
// all the logic in HTML; Always using ternaries to avoid bugs/crashes while API loads.

  const devices = LUser != null && AllAssets != null ? deviceLabel() : [];
  
  
  return (
    <Card {...props}>
      <CardHeader title="Porfolio % By Coin" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            pt: 2,
            overflowX: 'auto',
            width: 'auto'
          }}
        >
          {LUser != null && AllAssets != null ? devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                pr: 1,
                textAlign: 'center'
                
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h3"
              >
                {value}
                %
              </Typography>
            </Box>
          )) : 'Loading...' }
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioByCoins;
