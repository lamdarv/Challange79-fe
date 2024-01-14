import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import SignInPopup from 'components/popup/signin';
import RegisterPopup from 'components/popup/register';


const Header = () => {
  const [IsSignInPopUpOpen, setIsSignInPopUpOpen] = useState(false);
  const [IsRegisterPopUpOpen, setIsRegisterPopUpOpen] = useState(false);
  

  const handleSignInClick = () => {
    setIsSignInPopUpOpen(true); 
  };

  const handleCloseSignInPopup = () => {
    setIsSignInPopUpOpen(false); 
  };

  const handleRegisterClick = () => {
    setIsRegisterPopUpOpen(true); 
  };

  const handleCloseRegisterPopup = () => {
    setIsRegisterPopUpOpen(false); 
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/resource/image/logotujuhsembilan.png" alt="Logo" />
          <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 700, ml: 2 }}>
            Talent Center 79
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="text" 
            onClick={handleRegisterClick}
            sx={{ fontFamily: 'Inter', fontWeight: 600, mr: 2, color: 'white' }}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            onClick={handleSignInClick}
            sx={{
              fontFamily: 'Inter',
              fontWeight: 600,
              borderRadius: '25px',
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white' },
            }}
          >
            Sign In
          </Button>
        </Box>
        
      </Box>
      <SignInPopup open={IsSignInPopUpOpen} onClose={handleCloseSignInPopup} />
      <RegisterPopup open={IsRegisterPopUpOpen} onClose={handleCloseRegisterPopup} />
    </>
  );
};

export default Header;
