import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';

const SignInPopup = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
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
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
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
                    sx={{color:'#848484'}}
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
