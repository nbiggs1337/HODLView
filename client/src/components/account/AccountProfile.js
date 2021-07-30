import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';


const AccountProfile = (props) => {
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
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={LUser.image || getInitials(LUser.username)}
          // src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {LUser.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${LUser.email}`}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${user.timezone}`}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    {/* <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
)};

export default AccountProfile;
