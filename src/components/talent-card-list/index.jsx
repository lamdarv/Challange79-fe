import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Pagination, Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import TalentCard from 'components/talent-card';
import { useTalentContext } from 'pages/TalentContext';
import { styled } from '@mui/material/styles';

const TalentCardList = ({searchTags}) => {
  const { page, setPage, talentsPerPage, setTalentsPerPage } = useTalentContext(); // Use context values
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [talents, setTalents] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true);
      const requestUrl = `http://localhost:8081/talent-management/talents`;
      
      console.log(`Making request to ${requestUrl} with page: ${page} and size: ${talentsPerPage}`);

      try {
        const response = await axios.get(requestUrl, {
          params: {
            page: page,
            size: talentsPerPage,
            tagsName: searchTags,
          },
        });

        if (response.data && Array.isArray(response.data.content)) {
          setTalents(response.data.content);
          setTotalElements(response.data.totalElements);
        } else {
          console.error('Unexpected response structure:', response);
          setTalents([]);
        }
      } catch (error) {
        console.error('Failed to fetch talents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [searchTags, page, talentsPerPage]);

  if (loading) {
    return <Typography>Loading...</Typography>; // Or your loading spinner
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  const handleSizeChange = (newSize) => {
    setTalentsPerPage(newSize);
    setPage(0); // Reset to first page when changing number of talents per page
  };

  const PaginationContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
  }));

  return (
    <>
      <Grid container spacing={2}>
        {talents.map((talent) => (
          <Grid item xs={12} sm={6} md={6} key={talent.talentId}>
            <TalentCard talent={talent} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: isMobile? 'flex-end' : 'space-between', alignItems: isMobile? 'flex-end' : 'center', padding: 2, mb: 5, flexDirection: isMobile? 'column' : 'row' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ m: 2, color: '#212121', fontFamily: 'Inter', fontWeight: 400, fontSize: isMobile? 12 : 14 }}>Entries</Typography>
          {[10, 20, 50].map((size) => (
            <Button
              key={size}
              onClick={() => handleSizeChange(size)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                m: 1,
                minWidth: isMobile? 15 : 20,
                height: isMobile? 40 : 45,
                fontSize: isMobile ? 12 : 14,
                bgcolor: talentsPerPage === size ? '#2C8AD3' : 'white',
                color: talentsPerPage === size ? 'white' : 'black',
                ':hover': {
                  bgcolor: talentsPerPage === size ? '#2C8AD3' : 'grey.200',
                },
                borderRadius: '4px',
                padding: '6px 12px',
              }}
            >
              {size}
            </Button>
          ))}
        </Box>
        <PaginationContainer>
          <Pagination
            count={Math.ceil(totalElements / talentsPerPage)}
            page={page + 1}
            onChange={handleChange}
            sx={{
              '.MuiPaginationItem-root': {
                color: '#2C8AD3', 
              },
              '.Mui-selected': {
                textDecoration: 'underline',
              },
              '.MuiButtonBase-root': {
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          />
        </PaginationContainer>
      </Box>
    </>
  );
};

export default TalentCardList;
