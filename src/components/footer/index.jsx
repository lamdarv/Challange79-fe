import { Container, Typography, Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const FooterContainer = styled(Grid)(({ theme }) => ({
  margin: 0,
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(5), // This assumes theme.spacing(5) returns a valid CSS value
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingBottom: theme.spacing(1),
}));

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <FooterContainer container>
      <FooterSection sx={{ backgroundColor: '#142B51', width: '100%' }}>
        {/* ... (content of footer-1) */}
        <Container
          maxWidth="lg"
          sx={{ 
            display: 'flex', 
            justifyContent: isMobile ? 'center' : 'space-between', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',   
        }}>
          <StyledBox sx={{ marginBottom: isMobile ? 2 : 0 }}>
            <Heading variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
              Useful Links
            </Heading>
            {['Home', 'Our Technologies', 'Why Choose Us', 'Testimonials', 'Contact'].map((link) => (
              <LinkText key={link} variant="subtitle1" sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
                {link}
              </LinkText>
            ))}
          </StyledBox>

          <StyledBox sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Heading variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
              Contact Us
            </Heading>
            <Grid sx={{ mb: '0.5rem', display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
              <Box component="span" fontWeight={700} fontFamily={'Inter'}>
                Address:
              </Box>
              <Box component="span" sx={{ fontWeight: 400, fontFamily: 'Inter', ml: '0.5rem' }}>
                Kompleks Terasana No.6A <br /> Jalan Cihampelas (Bawah) <br /> Bandung 40171
              </Box>
            </Grid>
            <Grid sx={{ mb: '0.5rem', display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
              <Box component="span" sx={{ fontWeight: 700, fontFamily: 'Inter' }}>
                Phone:
              </Box>
              <Box component="span" sx={{ fontWeight: 400, fontFamily: 'Inter', ml: '0.5rem' }}>
                (022) 20505455
              </Box>
            </Grid>
            <Grid sx={{ mb: '0.5rem', display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
              <Box component="span" sx={{ fontWeight: 700, fontFamily: 'Inter' }}>
                Follow Us On
              </Box>
            </Grid>

            <SocialIcons sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
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

            <Grid sx={{ mt: '0.5rem', display: 'flex', justifyContent: isMobile ? 'center' : 'none' }}>
              <img src="/resource/image/logotujuhsembilan-2.png" alt="logo 79" />
            </Grid>
          </StyledBox>
        </Container>
      </FooterSection>
      <FooterSection sx={{ backgroundColor: '#081E43' }}>
        <Grid container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
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
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
