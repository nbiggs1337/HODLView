import { useState, useEffect } from 'react';
import { Link as RouterLink, Redirect, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import axios from 'axios';




const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();
  
  
  const logout = () => {
    console.log('testing')
    axios.get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(res => {console.log(res)
                    navigate('/login', { replace: true })})
      .catch(err => console.log(err))
    
}

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              {/* <NotificationsIcon /> */}
            </Badge>
          </IconButton>
          
          <IconButton color="inherit" onClick={() => logout()}>
            {/* <RouterLink to='/login' > */}
            <InputIcon />
            {/* </RouterLink> */}
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
