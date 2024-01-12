import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const StyledBox = styled(Box)({
  color: 'white',
  padding: '1rem',
  borderRadius: '10px',
});

const Heading = styled(Typography)({
  fontFamily: 'Poppins',
  fontWeight: 700,
  position: 'relative',
  paddingBottom: '0.5rem', // Adjust to your design
  marginBottom: '1rem', // Space between heading and links
  '&:after': {
    // Creates the line below the heading
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%', // Line width
    height: '1.5px', // Line thickness
    backgroundColor: 'orange',
  },
});

const LinkText = styled(Typography)({
  fontFamily: 'Inter',
  fontWeight: 400,
  marginBottom: '0.5rem',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const SocialIcons = styled(Box)({
  // Add styles for social icons container if needed
});

const Footer = () => {
  return (
    <Grid sx={{ display: 'flex' }}>
      <Box id="footer-1" sx={{ position: 'absolute', bottom: '80px', left: 0, right: 0, p: 2, backgroundColor: '#142B51' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledBox>
            <Heading variant="h6" gutterBottom>
              Useful Links
            </Heading>
            {['Home', 'Our Technologies', 'Why Choose Us', 'Testimonials', 'Contact'].map((link) => (
              <LinkText key={link} variant="subtitle1">
                {link}
              </LinkText>
            ))}
          </StyledBox>

          <StyledBox>
            <Heading variant="h6" gutterBottom>
              Contact Us
            </Heading>
            <Grid sx={{ mb: '0.5rem' }}>
              <Box component="span" fontWeight={700} fontFamily={'Inter'}>
                Address:
              </Box>
              <Box component="span" sx={{ fontWeight: 400, fontFamily: 'Inter', ml: '0.5rem' }}>
                Kompleks Terasana No.6A <br /> Jalan Cihampelas (Bawah) <br /> Bandung 40171
              </Box>
            </Grid>
            <Grid sx={{ mb: '0.5rem' }}>
              <Box component="span" sx={{ fontWeight: 700, fontFamily: 'Inter' }}>
                Phone:
              </Box>
              <Box component="span" sx={{ fontWeight: 400, fontFamily: 'Inter', ml: '0.5rem' }}>
                (022) 20505455
              </Box>
            </Grid>
            <Grid sx={{ mb: '0.5rem' }}>
              <Box component="span" sx={{ fontWeight: 700, fontFamily: 'Inter' }}>
                Follow Us On
              </Box>
            </Grid>

            <SocialIcons>
              <IconButton aria-label="facebook">
                <FacebookIcon style={{ color: 'white' }} />
              </IconButton>
              <IconButton aria-label="instagram">
                <InstagramIcon style={{ color: 'white' }} />
              </IconButton>
              <IconButton aria-label="youtube">
                <YouTubeIcon style={{ color: 'white' }} />
              </IconButton>
            </SocialIcons>

            <Grid sx={{ mt: '0.5rem' }}>
              <img src="/resource/image/logotujuhsembilan-2.png" alt="logo 79" />
            </Grid>
          </StyledBox>
        </Container>
      </Box>
      <Box
        id="footer-2"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: '#081E43',
          display: 'flex', // Use flexbox to center items
          justifyContent: 'center', // Center items horizontally
          alignItems: 'center', // Center items vertically
        }}
      >
        <Grid container sx={{ mb: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item>
            <Box component="span" sx={{ fontWeight: 700, fontFamily: 'Inter', textAlign: 'center', width: '100%' }}>
              © Copyright 2020
            </Box>
          </Grid>
          <Grid item>
            <Box component="span" sx={{ fontWeight: 400, fontFamily: 'Inter', textAlign: 'center', width: '100%' }}>
              Privacy Policy Design
            </Box>
          </Grid>
          <Grid item>
            <Box component="span" sx={{ fontWeight: 400, fontFamily: 'Inter', textAlign: 'center', width: '100%' }}>
              By Tujuh Sembilan
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Footer;
