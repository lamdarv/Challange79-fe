import {Typography, Button, Box } from '@mui/material';


const Header = () => {
  return (
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
  );
};

export default Header;
