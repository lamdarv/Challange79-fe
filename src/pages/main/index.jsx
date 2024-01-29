import { Box } from '@mui/material';
import Filter from 'components/talent-filter';
import Header from 'components/header/main-header';
import TalentCardList from 'components/talent-card-list';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const executeSearch = async (searchTags) => {
  const trimmedSearchTags = typeof searchTags === 'string' ? searchTags.trim() : '';
  if (!trimmedSearchTags) return;

  const tagsToSend = trimmedSearchTags.split(',').map(tag => tag.trim());

  try {
    // Bagian untuk update counter tags
    await Promise.all(tagsToSend.map(tagName =>
      axios.put(`http://localhost:8081/tags-management/tags?tagName=${encodeURIComponent(tagName)}`)
    ));

    // Membangun query string untuk multiple tags
    const queryString = tagsToSend.map(tagName => `tagsName=${encodeURIComponent(tagName)}`).join('&');
    const url = `http://localhost:8081/talent-management/talents?page=0&size=10&${queryString}`;

    console.log("Request URL:", url); // Logging URL

    const talentResponse = await axios.get(url);

    if (!talentResponse.data.content.length || talentResponse.data.totalElements === 0) {
      console.error('Data not found for tags:', tagsToSend.join(', '));
    } else {
      console.log('Data for tags:', tagsToSend.join(', '), ':', talentResponse.data);
    }
  } catch (error) {
    console.error('Error in executeSearch:', error.response ? error.response.data : error.message);
  }
  
};


const Main = () => {
  const location = useLocation();
  const [searchTags, setSearchTags] = useState(location.state?.searchTags?.join(', ') || '');

  useEffect(() => {
    if (location.state?.searchTags) {
      executeSearch(location.state.searchTags);
    }
  }, [location.state?.searchTags]);


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
