import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [errors, setErrors] = useState(null);
  const [policy, setPolicy] = useState(false)

  const handleInput = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value
    })
    setErrors({ ...errors, [e.target.name]: null })
  }
  
  const registerHandler = e => {
    e.preventDefault();
    if ( policy !== false ) {
      axios.post('http://localhost:8000/api/register', formInfo, { withCredentials: true })
      .then(res => {
        console.log(res)
        
        if ( res.data.errors ) {
          console.log(res.data.errors, "In the if")
          setErrors(res.data.errors)
        }else {
            navigate('/app/dashboard', { replace: true })
        }
      })
      .catch(err => console.log(err))
    } else {
      setPolicy(false)
    }
    
  }
  

  return (
    <>
      <Helmet>
        <title>Register | HODL View</title>
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
            //   username: '',
            //   password: '',
            //   confirm: '',
            //   policy: false
            // }}
            // validationSchema={
            //   Yup.object().shape({
            //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            //     username: Yup.string().max(255).required('Username is required'),
            //     password: Yup.string().max(255).required('password is required'),
            //     confirm: Yup.string().max(255).required('Confirm Password is required'),
            //     policy: Yup.boolean().oneOf([true], 'This field must be checked')
            //   })
            // }
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={ registerHandler }>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={errors  ?  errors.username ? errors.username.message : "" : ''}
                  fullWidth
                  helperText={errors  ?  errors.username ? errors.username.message : "" : ''}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={ handleInput }
                  value={formInfo.username}
                  variant="outlined"
                />
                
                <TextField
                  error={errors  ?  errors.email ? errors.email.message : "" : ''}
                  fullWidth
                  helperText={errors  ?  errors.email ? errors.email.message : "" : ''}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={ handleInput }
                  type="email"
                  value={ formInfo.email }
                  variant="outlined"
                />
                <TextField
                  error={errors  ?  errors.password ? errors.password.message : "" : ''}
                  fullWidth
                  helperText={errors  ?  errors.password ? errors.password.message : "" : ''}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={ handleInput }
                  type="password"
                  value={ formInfo.password }
                  variant="outlined"
                />
                <TextField
                  error={errors  ?  errors.confirm ? errors.confirm.message : "" : ''}
                  fullWidth
                  helperText={errors  ?  errors.confirm ? errors.confirm.message : "" : ''}
                  label="Confirm Password"
                  margin="normal"
                  name="confirm"
                  onBlur={handleBlur}
                  onChange={ handleInput }
                  type="password"
                  value={ formInfo.confirm }
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={policy}
                    name="policy"
                    onChange={() => {setPolicy(!policy)}}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {policy === true ? "" :
                  <FormHelperText error>
                    You must agree to our terms and conditions to register
                  </FormHelperText>}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
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

export default Register;
