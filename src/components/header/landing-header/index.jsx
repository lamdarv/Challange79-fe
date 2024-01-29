import { useState } from 'react';
import { Typography, Button, Box, Drawer, List, ListItem, useTheme, useMediaQuery} from '@mui/material';
import SignInPopup from 'components/popup/signin';
import RegisterPopup from 'components/popup/register';
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';

const Header = () => {
  const [IsSignInPopUpOpen, setIsSignInPopUpOpen] = useState(false);
  const [IsRegisterPopUpOpen, setIsRegisterPopUpOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignInClick = () => {
    console.log('Sign in clicked');
    setIsSignInPopUpOpen(true);
    closeMenu();
  };

  const handleCloseSignInPopup = () => {
    setIsSignInPopUpOpen(false);
  };

  const handleRegisterClick = () => {
    console.log('Register clicked');
    setIsRegisterPopUpOpen(true);
    closeMenu();
  };

  const handleCloseRegisterPopup = () => {
    setIsRegisterPopUpOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    console.log('closeMenu called');
    setIsMenuOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/resource/image/logotujuhsembilan.png" alt="Logo" />
          <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 700, ml: 2, fontSize: isMobile ? 18 : 22 }}>
            Talent Center 79
          </Typography>
        </Box>
        {isMobile ? (
          <>
            <Button variant="text" sx={{ color: 'white' }} onClick={toggleMenu}>
              <MenuIcon />
            </Button>
            <Drawer
              anchor="right"
              open={isMenuOpen}
              onClose={closeMenu}
              PaperProps={{
                sx: {
                  backgroundColor: '#2C8AD3',
                  width: '30%',
                },
              }}
            >
              <List>
                <Button
                  onClick={closeMenu}
                  sx={{
                    position: 'absolute',
                    top: '6%',
                    right: '2%',
                    color: '#212121',
                  }}
                >
                  <Close />
                </Button>
                <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                  <Button
                    variant="text"
                    onClick={handleRegisterClick}
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      color: 'white',
                      fontSize: 14,
                      textTransform: 'none',
                    }}
                  >
                    Register
                  </Button>
                </ListItem>
                <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={handleSignInClick}
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      borderRadius: '25px',
                      color: 'white',
                      textTransform: 'none',
                      borderColor: 'white',
                      '&:hover': { borderColor: 'white' },
                    }}
                  >
                    Sign In
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box>
            <Button
              variant="text"
              onClick={handleRegisterClick}
              sx={{
                fontFamily: 'Inter',
                fontWeight: 600,
                mr: 2,
                color: 'white',
              }}
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
        )}
      </Box>
      <SignInPopup open={IsSignInPopUpOpen} onClose={handleCloseSignInPopup} />
      <RegisterPopup open={IsRegisterPopUpOpen} onClose={handleCloseRegisterPopup} />
    </>
  );
};

export default Header;
