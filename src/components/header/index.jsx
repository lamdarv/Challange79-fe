import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import SignInPopup from 'components/popup';


const Header = () => {
  const [IsSignInPopUpOpen, setIsSignInPopUpOpen] = useState(false);
  

  const handleSignInClick = () => {
    setIsSignInPopUpOpen(true); // When the button is clicked, open the sign in popup
  };

  const handleCloseSignInPopup = () => {
    setIsSignInPopUpOpen(false); // This function is passed to SignInPopup to close it
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
          <Button variant="text" sx={{ fontFamily: 'Inter', fontWeight: 600, mr: 2, color: 'white' }}>
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
    </>
  );
};

export default Header;
