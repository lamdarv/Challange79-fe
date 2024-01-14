import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const CustomDatePicker = styled(TextField)({
  // Custom styles for the root of the TextField
  '& .MuiOutlinedInput-root': {
    // Custom styles for the border color
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)', // your custom color
    },
    // Custom styles for the border color when the TextField is focused or hovered
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)', // your custom color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#848484', // your custom color on focus
    },
  },
  // Custom styles for the input text color (placeholder)
  '& .MuiInputBase-input': {
    color: '#848484', // your custom color for the input text
  },
  // Custom styles for the label color
  '& .MuiInputLabel-root': {
    color: '#848484', // your custom color for the label
  },
  // Custom styles for the label when focused
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#848484', // your custom color for the label when focused
  },
  // Adjust the icon color
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#848484', // your custom color for the icon
  },
});
