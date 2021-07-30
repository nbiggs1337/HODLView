import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';


const AccountProfileDetails = (props) => {
  const [LUser, setLUser] = useState({});
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [errors, setErrors] = useState(false);
  const [displayErr, setDisplayErr] = useState(null);
  
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
  

  const handleChange = (event) => {
    setLUser({
      ...LUser,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/users/update/${LUser._id}`, LUser)
      .then(res => {
        if ( res.data.err){
          setDisplayErr(res.data.err.message);
          setErrors(true);
          console.log(res.data.err.message)
        } else {
          setUpdated(true)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        { updated === true && errors === false ? <CardHeader
          subheader=" ** Your information has been updated! **"
          title="Update Successful"
        /> : "" }
        { errors === true ?<CardHeader
          subheader={displayErr}
          title="Update Failed"
        /> : ""}
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify username"
                label="Username"
                name="username"
                placeholder={LUser.username}
                minlength='9'
                onChange={handleChange}
                required
                
                value={LUser.username || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={LUser.email|| ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Avatar URL"
                name="image"
                onChange={handleChange}
                type="text"
                value={LUser.image|| ''}
                // variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              /> */}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField> */}
            </Grid>
          </Grid>
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
            onClick={(e) => handleSubmit(e) }
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
