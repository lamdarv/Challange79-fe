import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Add, ArrowForwardIos } from '@mui/icons-material';
import { DocumentDownload } from 'iconsax-react';

const TalentCard = ({ talent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const availabilityColor = talent.talentAvailability ? 'blue' : 'red';
  const availabilityText = talent.talentAvailability ? 'Available' : 'Not Available';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        height: isMobile ? '550px' : '310px',
        m: 1,
        p: 1, 
        backgroundColor: 'white',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* flexDirection: isMobile ? 'column' : 'row' */}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ p: 2 }}>
          <Avatar src={talent.talentPhotoUrl} alt={talent.talentName} sx={{ width: isMobile ? 40 : 60, height: isMobile ? 40 : 60 }} />
        </Box>
        <CardContent sx={{ flexGrow: 1, flex: 1, mb: -2}}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 1 }}>
              <Chip
                sx={{
                  color: availabilityColor,
                  borderColor: availabilityColor,
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: 8,
                  mr: 1,
                }}
                label={availabilityText}
                variant="outlined"
                size="small"
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: isMobile ? '12px' : isMedium ? '14px' : '16px', color: '#2C8AD3' }}
              >
                {talent.talentName}
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 10 }} color="#848484">
              {isMobile ? (
                <>
                  {talent.talentExperience} Years of Experience <br /> {talent.talentLevelName} Level
                </>
              ) : (
                `${talent.talentExperience} Years of Experience • ${talent.talentLevelName} Level`
              )}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14, color: '#212121' }}>Position</Typography>
              <Box display="flex" flexWrap="wrap" sx={{ ml: -1 }}>
                {talent.positions.map((position) => (
                  <Chip
                    label={position.positionName}
                    size="small"
                    key={position.positionId}
                    sx={{
                      p: '1px 10px',
                      m: 1,
                      backgroundColor: '#E4EEF6',
                      color: '#212121',
                      borderRadius: '3px',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 10,
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14, color: '#212121' }}>Skill Set</Typography>
              <Box display="flex" flexWrap="wrap" sx={{ ml: -1 }}>
                {talent.skillsets.map((skill, index) => (
                  <Chip
                    label={skill.tagsName}
                    size="small"
                    key={skill.tagsId}
                    sx={{
                      p: '1px 10px',
                      m: 1,
                      backgroundColor: '#E4EEF6',
                      color: '#212121',
                      borderRadius: '3px',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 10,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <CardActions sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid #DBDBDB' }}>
        <Box>
          {/* Download Button */}
          <Button
            startIcon={
              <Box
                sx={{
                  width: isMobile? '60%' : '80%',
                  display: 'flex',
                  
                }}
              >
                <DocumentDownload />
              </Box>
            }
            sx={{
              textTransform: 'none',
              color: '#2C8AD3',
              fontFamily: 'Inter',
              fontWeight: 600,
              height: '40%',
              fontSize: isMobile ? 8 : 10,
              '&:hover': {
                backgroundColor: 'white',
                color: 'blue',
              },
              m: 1,
            }}
          >
            Download CV
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Add to List Button */}
          <Button
            variant="outlined"
            startIcon={<Add sx={{ width: isMobile? '60%' : '80%', display: 'flex' }} />}
            sx={{
              color: '#2C8AD3',
              borderColor: '#2C8AD3',
              fontFamily: 'Inter',
              fontWeight: 600,
              height: '40%',
              fontSize: isMobile ? 8 : 10,
              '&:hover': {
                backgroundColor: 'white',
                color: 'blue',
                borderColor: 'blue',
              },
              m: 1,
            }}
          >
            Add to List
          </Button>
          {/* See Detail Button */}
          <Button
            variant="contained"
            endIcon={<ArrowForwardIos sx={{ width: isMobile? '60%' : '80%', display: 'flex' }} />}
            sx={{
              color: '#FDFDFD',
              backgroundColor: '#2C8AD3',
              borderColor: '#2C8AD3',
              fontFamily: 'Inter',
              fontWeight: 600,
              height: '40%',
              fontSize: isMobile ? 8 : 10,
              '&:hover': {
                backgroundColor: 'blue',
                color: 'white',
              },
              m: 1,
            }}
          >
            See Detail
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TalentCard;
