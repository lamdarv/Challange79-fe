import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const SearchBar = styled(TextField)({
  width: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
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
