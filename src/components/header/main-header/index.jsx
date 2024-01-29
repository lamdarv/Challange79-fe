import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { SearchBar } from 'components/search-bar/main-search-bar';
import SearchIcon from '@mui/icons-material/Search';
import { ArchiveTick, Notification} from 'iconsax-react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = ({ searchTags, setSearchTags, executeSearch }) => {
  const handleInputChange = (event) => {
    setSearchTags(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && searchTags.trim()) {
      await executeSearch(searchTags);
    }
  };

  const handleSearchIconClick = async () => {
    if (searchTags.trim()) {
      await executeSearch(searchTags);
    }
  };

  const userIcon = process.env.PUBLIC_URL + '/resource/icon/user.svg';

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#081E43' }}>
        <Box id="logo" sx={{ display: 'flex', alignItems: 'center', m: 2, p: 1 }}>
          <img src="/resource/image/logotujuhsembilan.png" alt="Logo" />
          <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, color: '#FDFDFD', ml: 2 }}>
            Talent Center 79
          </Typography>
        </Box>
        <SearchBar
          fullWidth
          placeholder="Try 'JavaScript'"
          variant="outlined"
          value={searchTags}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchIconClick}>
                  <SearchIcon sx={{ color: '#C4C4C4' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box id="user" sx={{ display: 'flex', alignItems: 'center', m: 2, p: 1 }}>
          <ArchiveTick style={{ color: '#FDFDFD', margin: 4 }} variant="Bold" />
          <Notification style={{ color: '#FDFDFD', margin: 4 }} variant="Bold" />
          <Box
            sx={{
              height: '20px', 
              width: '1px',
              bgcolor: 'white',
              marginX: '8px', 
            }}
          />
          <img src={userIcon} alt="User Icon" />

          <Typography sx={{color: '#FDFDFD'}}>user79</Typography>
          <ArrowDropDownIcon fontSize='medium' sx={{color: '#FDFDFD'}} />
        </Box>
      </Box>
    </>
  );
};

export default Header;
