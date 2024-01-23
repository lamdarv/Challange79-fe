import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const SearchBar = styled(TextField)({
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
