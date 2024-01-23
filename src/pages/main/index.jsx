import { Box } from '@mui/material';
import Filter from 'components/talent-filter';
import Header from 'components/header/main-header';
import TalentCardList from 'components/talent-card-list';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();
  const [searchTags, setSearchTags] = useState(location.state?.searchTags?.join(', ') || '');

  useEffect(() => {
    if (location.state?.searchTags) {
      executeSearch(location.state.searchTags);
    }
  }, [location]);

  const executeSearch = async () => {
    // ... your search logic, which might now include navigation or displaying results
  };

  return (
    <div>
      <div id="header">
        <Header searchTags={searchTags} setSearchTags={setSearchTags} executeSearch={executeSearch} />
      </div>
      <Box id="content" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <Box id="filter" sx={{ width: '25%', minWidth: '100px' /* Adjust the width as needed */ }}>
          <Filter />
        </Box>
        <Box sx={{ width: '75%' /* Adjust the width as needed */ }}>
          <TalentCardList searchTags={searchTags} />
        </Box>
      </Box>
    </div>
  );
};

export default Main;
