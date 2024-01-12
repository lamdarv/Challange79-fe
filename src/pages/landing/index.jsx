import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import Footer from 'components/footer';
import Header from 'components/header';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '36px',
    backgroundColor: 'white', // Background color
    color: '#C4C4C4',
  },
  '& .MuiOutlinedInput-input': {
    color: 'black',
    marginLeft: '1rem',
  },
  '& .MuiInputLabel-outlined': {
    color: 'black',
  },
  '& .MuiInputAdornment-positionEnd': {
    marginRight: '1rem',
  },
});

const Landing = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTags, setSearchTags] = useState('');
  const [serverDown, setServerDown] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8081/tags-management/popular-tags-option-lists');
        console.log(response.data);
        setTags(response.data);
      } catch (error) {
        console.error('Could not fetch the tags: ', error);
        handleServerDown();
        // handleFailedUpdateCounter();
        // handleDataNotFound();
      }
    };

    fetchTags();
  }, []);

  const executeSearch  = async (event) => {
    const tagsToSend = searchTags.split(',').map((tag) => tag.trim());
    try {
      const responses = await Promise.all(
        tagsToSend.map((tagName) => axios.put(`http://localhost:8081/tags-management/tags?tagName=${encodeURIComponent(tagName)}`))
      );

      // responses is an array of Axios responses
      // Here we log or process each response data
      responses.forEach((response) => {
        console.log('Tag:', response.data.tagsName);
        console.log('Counter:', response.data.counter);
        // You can now set state or perform other actions based on each response
      });

      // Then, get talents associated with the tags
      const talentResponses = await Promise.all(
        tagsToSend.map((tagName) =>
          axios.get(`http://localhost:8081/talent-management/talents?page=0&size=20&tagsName=${encodeURIComponent(tagName)}`)
        )
      );

      // Process talent responses or handle null response
      talentResponses.forEach((response, index) => {
        if (!response.data.content.length || response.data.totalElements === 0) {
          handleDataNotFound();
        } else {
          console.log(`Data for ${tagsToSend[index]}: `, response.data);
          // You can update state with the response data if necessary
        }
      });

      // If you want to collect all the data into one array and set it to state, you can do the following
      // const allTagsData = responses.map((response) => response.data);
      // console.log(allTagsData); // Logs an array of all tags data

      // If you have a state to set this data, you can set it here
      // setAllTagsData(allTagsData); // This is just an example, replace with your actual state setter
    } catch (error) {
      console.error('Error sending one or more tags:', error);
      handleFailedUpdateCounter();
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && searchTags.trim()) {
      await executeSearch();
    }
  };

  const handleSearchIconClick = async () => {
    if (searchTags.trim()) {
      await executeSearch();
    }
  };

  const handleServerDown = () => {
    setServerDown(true);
  };

  const handleFailedUpdateCounter = () => {
    setUpdateFailed(true);
  };

  const handleDataNotFound = () => {
    setDataNotFound(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setServerDown(false);
    setUpdateFailed(false);
    setDataNotFound(false);
  };

  const handleTagClick = (tagName) => {
    // Prevent adding the tag if it's already in the selectedTags list
    if (!selectedTags.includes(tagName)) {
      // Add the new tag to the selectedTags list
      setSelectedTags((prevSelectedTags) => {
        // If it's the first tag, just return the new tag
        if (prevSelectedTags.length === 0) {
          return [tagName];
        }
        // Otherwise, add the new tag to the existing list
        return [...prevSelectedTags, tagName];
      });
    }
  };

  useEffect(() => {
    // Join the tags with a comma only if there's more than one tag
    setSearchTags(selectedTags.join(selectedTags.length > 1 ? ', ' : ''));
  }, [selectedTags]);

  // Handler for changes in the text field
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTags(value); // Update the text field display value

    // Update the selectedTags state based on the input field value
    const tagsArray = value
      .split(',')
      .map((tag) => tag.trim()) // Remove whitespace
      .filter((tag) => tag !== ''); // Remove any empty strings

    setSelectedTags(tagsArray);
  };

  const Overlay = () => (
    <Box
      onClick={handleCloseAlert}
      sx={{
        position: 'fixed', // Fixed position to cover the whole screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        zIndex: (theme) => theme.zIndex.drawer - 1, // Below the Snackbar but above other content
        cursor: 'pointer',
      }}
    />
  );

  return (
    <>
      {serverDown && <Overlay />} {/* Render the Overlay when the Snackbar is open */}
      <Box
        sx={{
          position: 'relative',
          height: '120vh',
          backgroundImage: 'url(/resource/image/bg-landing.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          p: 4,
        }}
      >
        {/* Header Section */}
        <Header />
        {/* Server Down */}
        <Snackbar
          open={serverDown}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            top: { xs: 0, sm: 56 },
          }}
        >
          <Alert severity="error" sx={{ width: '100%', boxShadow: 6, backgroundColor: '#CF1D1D', color: '#FDFDFD' }} icon={false}>
            Terjadi kesalahan server. Silahkan coba kembali.
          </Alert>
        </Snackbar>
        {/* Update Counter Failed */}
        {updateFailed && <Overlay />}
        <Snackbar open={updateFailed} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', boxShadow: 6, backgroundColor: '#CF1D1D', color: '#FDFDFD' }} icon={false}>
            Gagal melakukan update counter.
          </Alert>
        </Snackbar>

        {/* Data Not Found */}
        {dataNotFound && <Overlay />}
        <Snackbar open={dataNotFound} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', boxShadow: 6, backgroundColor: '#EBCA1D', color: '#FDFDFD' }} icon={false}>
            Data tidak ditemukan.
          </Alert>
        </Snackbar>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ textAlign: 'center', pt: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 700,
            }}
          >
            Welcome to <br /> Talent Center 79
          </Typography>
          <CustomTextField
            fullWidth
            placeholder="Try 'JavaScript'"
            variant="outlined"
            value={selectedTags.join(', ')}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchIconClick}>
                    {' '}
                    {/* Add the IconButton wrapper */}
                    <SearchIcon sx={{ color: '#C4C4C4' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Tags */}
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              {' '}
              {/* Container for the "Popular" text */}
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, ml: 2 }}>
                Popular
              </Typography>
            </Grid>
            {tags.map((tag) => (
              <Grid item key={tag.tagsId}>
                <Button
                  variant="contained"
                  onClick={() => handleTagClick(tag.tagsName)}
                  // Disable the button if the tag is already selected
                  disabled={selectedTags.includes(tag.tagsName)}
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': { backgroundColor: '#C4C4C4' },
                  }}
                >
                  {tag.tagsName}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

export default Landing;
