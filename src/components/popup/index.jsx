import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInPopup = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeSignIn = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user-management/users/sign-in', credentials);

      const userData = response.data;
      localStorage.setItem('user_id', userData.user_id);
      localStorage.setItem('role_id', userData.role_id);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('client_id', userData.client_id);
      localStorage.setItem('token', userData.token);
      navigate('/client');
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent sx={{ backgroundColor: '#FDFDFD', borderRadius: '10px' }}>
          <IconButton onClick={onClose} style={{ position: 'absolute', top: 0, right: '2%', color: '#212121' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: '#212121', fontFamily: 'Poppins', fontWeight: 700 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" gutterBottom sx={{ color: '#848484', fontFamily: 'Inter', fontWeight: 400 }}>
            Please sign in first to explore further on our website
          </Typography>
          <form onSubmit={handleSubmitSignIn}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              onChange={handleChangeSignIn}
              InputLabelProps={{
                style: {
                  color: '#848484',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                },
              }}
              InputProps={{
                style: {
                  color: '#212121',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#848484',
                    borderRadius: '10px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#848484', // Change this for hover state
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#848484', // Change this for focus state
                  },
                },
              }}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              onChange={handleChangeSignIn}
              InputLabelProps={{
                style: { color: '#848484' },
              }}
              InputProps={{
                style: {
                  color: '#212121',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: '#848484' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#848484',
                    borderRadius: '10px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#848484', // Change this for hover state
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#848484', // Change this for focus state
                  },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              type='Submit'
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#2C8AD3',
                color: '#FDFDFD',
                fontFamily: 'Inter',
                fontWeight: 600,
                boxShadow: 'none',
                textTransform: 'none',
              }}
            >
              Sign In
            </Button>
          </form>

          <hr style={{ borderColor: '#DBDBDB' }} />

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon style={{ color: '#848484', height: '15px' }} />}
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: 'white',
              color: '#848484',
              fontFamily: 'Inter',
              fontWeight: 600,
              boxShadow: 'none',
              textTransform: 'none',
            }}
          >
            Sign In with Google
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2, color: '#212121', fontFamily: 'Inter', fontWeight: 400 }}>
            Don’t have an Account?{' '}
            <Link href="#" onClick={onClose} sx={{ color: '#2C8AD3', textDecoration: 'none' }}>
              Register Here
            </Link>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInPopup;
