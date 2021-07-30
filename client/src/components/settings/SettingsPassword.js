import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const [LUser, setLUser] = useState(null);
  
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
  
  const submitHandler = e => {
    e.preventDefault();
    const uUser = {
      username: LUser.username,
      email: LUser.email,
      password: values.password,
      confirm: values.confirm,
      image: LUser.image,
      cryptos: LUser.cryptos
    };
    const uUserNI = {
      username: LUser.username,
      email: LUser.email,
      password: values.password,
      confirm: values.confirm,
      cryptos: LUser.cryptos
    };
    if ( LUser.image ){
      axios.put(`http://localhost:8000/api/users/updatepass/${LUser._id}`, uUser)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } else {
      axios.put(`http://localhost:8000/api/users/updatepass/${LUser._id}`, uUserNI)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    
  }
  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
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
            variant="contained"
            onClick={(e)=> submitHandler(e) }
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
