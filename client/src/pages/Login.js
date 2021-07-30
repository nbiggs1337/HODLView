import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { ErrorSharp } from '@material-ui/icons';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [LUser, setLUser] = useState({
    email: '',
    password: ''
  });
  
  const handleLogin = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', LUser, { withCredentials: true })
      .then(res => {
        if ( res.data.msg === 'success' ){
          console.log(res.data)
          navigate("/app/dashboard", { replace: true })
        } else {
          console.log(res.data)
          setErrors(res.data.msg);
        }
      })
      .catch(err => console.log(err))
  }
  
  
  
  
  const inputHandler = e => {
    setLUser({
      ...LUser,
      [e.target.name]: e.target.value
    });
    setErrors(null);
  }

  return (
    <>
      <Helmet>
        <title>Login | HODL View</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            // initialValues={{
            //   email: '',
            //   password: ''
            // }}
            // validationSchema={Yup.object().shape({
            //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            //   password: Yup.string().max(255).required('Password is required')
            // })}
            // onSubmit={() => {
            //   navigate('/app/dashboard', { replace: true });
            // }}
          >
            {({
              // errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={ handleLogin }>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography> */}
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    {/* <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    {/* <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button> */}
                  </Grid>
                </Grid>
                {/* <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  {/* <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography> */}
                {/* </Box> */}
                <TextField
                  error={errors ? true : false}
                  fullWidth
                  helperText={errors ? errors : ""}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={ inputHandler }
                  type="email"
                  value={ LUser.email }
                  variant="outlined"
                />
                <TextField
                  error={errors ? true : false}
                  fullWidth
                  helperText={errors ? errors : ""}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={ inputHandler }
                  type="password"
                  value={ LUser.password }
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
