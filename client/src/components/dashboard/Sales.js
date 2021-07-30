import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sales = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [AllAssets, setAllAssets ] = useState(null)
  const [LUser, setLUser] = useState(null);
  
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
  
  const getData = () => {
    let bull = [];
    let bear = [];
    let label = [];
    for ( const [i, crypto] of LUser.cryptos.entries() ){
      var oneCoin = AllAssets.filter((coin) => coin.s === crypto.coin);
      bull.push(oneCoin[0].bl);
      bear.push(oneCoin[0].br);
      label.push(oneCoin[0].s);
    }
    let data = [bull, bear, label];
    return data;
  }
  
  
  
  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: LUser != null && AllAssets != null ? getData()[0] : [] ,
        label: 'Bullish Sentiment Posts'
      },
      {
        backgroundColor: colors.deepOrange[300] ,
        data: LUser != null && AllAssets != null ? getData()[1] : [],
        label: 'Bearish Sentiment Posts'
      }
    ],
    labels: LUser != null && AllAssets != null ? getData()[2] : []
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card {...props}>
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon />}
        //     size="small"
        //     variant="text"
        //   >
        //     Last 7 days
        //   </Button>
        // )}
        title="Compare Sentiment"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={()=>{ navigate('/app/coins', { replace: true })} }>
          See All Coins
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
