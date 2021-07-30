import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import axios from 'axios';

const CustomerListResults = ({ customers, ...rest }) => {
  const navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [allAssets, setAllAssets] = useState([]);
  const [LUser, setLUser] = useState(null);
  const [refresh, setRefresh ] = useState(false)  


  useEffect(() => {
    axios.get('https://api.lunarcrush.com/v2?data=market&key=gtbtvifwrx9ooca9r4dlti&sort=mc&desc=true')
      .then(res => {
        console.log(res.data.data)
        setAllAssets(res.data.data)
      })
      .catch(err => console.log(err))

    axios.get('http://localhost:8000/api/users/auth', { withCredentials: true })
      .then(res => {
        console.log(res.data.user);
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
  }, [refresh])
  
  const addHandler = (e) => {
    e.preventDefault();
    // console.log(e.target[1].value);
    // console.log(e.target[0].value);
    let addcoin = {
      coin: e.target[1].value,
      amount: e.target[0].value
    };
    console.log(LUser.cryptos.filter((cryp) => cryp.coin === 'BTC'))
    // console.log(addcoin)
    axios.post(`http://localhost:8000/api/coin/add/${LUser._id}`, addcoin)
      .then(res => {setRefresh( !refresh )
                    console.log(res)})
      .catch(err => console.log(err))
  }
  
  const updateHandler = (e, asset) => {
    e.preventDefault();
    const updated = {
      coin: asset,
      amount: e.target[0].value
    }
    const assetID = LUser.cryptos.filter((cryp) => cryp.coin === asset)[0]._id
    axios.put(`http://localhost:8000/api/coin/update/${LUser._id}/${assetID}`, updated)
      .then(res => {setRefresh( !refresh )
                    console.log(res)})
      .catch(err => console.log(err))
    ;
  }


  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };
  

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
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Symbol
                </TableCell>
                <TableCell>
                  Change (24hr)
                </TableCell>
                <TableCell>
                  My Bag
                </TableCell>
                <TableCell>
                  Amount Owned
                </TableCell>
                {/* <TableCell>
                  Add To Wallet
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {allAssets.slice(0, limit).map((asset) => (
                <TableRow
                  hover
                  key={asset.id}
                  selected={selectedCustomerIds.indexOf(asset.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedCustomerIds.indexOf(asset.id) !== -1}
                      onChange={(event) => handleSelectOne(event, asset.id, { crypto: asset.id, amount: asset.s })}
                      value="true"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={null}//Symbol/logo?
                        sx={{ mr: 2 }}
                      >
                        {getInitials(asset.n)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {/* Coin name here */}
                        {asset.n}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {/* Coin price here */}
                    ${asset.p} USD
                  </TableCell>
                  <TableCell>
                    {/* symbol/something here */}
                    {asset.s}
                  </TableCell>
                  <TableCell>
                    {/* 24hr change or something here */}
                    {asset.pc}%
                  </TableCell>
                  <TableCell>
                    {/* bag amount here */}
                    {LUser.cryptos.filter((cryp) => cryp.coin === asset.s).length > 0 ? '$'+(LUser.cryptos.filter((cryp) => cryp.coin === asset.s)[0].amount * asset.p ).toFixed(2)+ ' USD' : "- -" }
                  </TableCell>
                  
                  <TableCell>
                    
                    { LUser.cryptos.filter((cryp) => cryp.coin === asset.s).length > 0 ?  //displays update if true, add if false
                    <form onSubmit={ (e) => updateHandler(e, asset.s)}>
                      
                    <input
                      fullWidth
                      type='number'
                      width='100%'
                      background-color='#4CAF50'
                      color='white'
                      padding='14px 20px'
                      margin='8px 0'
                      name="amount"
                      step=".001"
                      key={asset.id}
                      placeholder={(LUser.cryptos.filter((cryp) => cryp.coin === asset.s))[0].amount }
                      // required
                      // value='whatever amount from state'
                      variant="outlined"
                    /> <input type='hidden' value={asset.s} />
                    {/* {moment(customer.createdAt).format('DD/MM/YYYY')} */}
                  
                    <Button
                      color="primary"
                      type='submit'
                      variant="contained"
                      
                    >
                      Update {asset.s}
                    </Button>
                    </form>
                    : 
                    <form onSubmit={addHandler}>
                    <input
                      fullWidth
                      type='number'
                      helperText="Please specify amount if holding"
                      label="Coins Held"
                      name="amount"
                      step=".001"
                      key={asset.id}
                      // value='whatever amount from state'
                      variant="outlined"
                    /> <input type='hidden' value={asset.s} />
                    {/* {moment(customer.createdAt).format('DD/MM/YYYY')} */}
                  
                    <Button
                      color="primary"
                      type='submit'
                      variant="contained"
                      
                    >
                      Add {asset.s}
                    </Button>
                    </form>
                    }
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[25, 50, 100]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
