import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomTextField1 = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
      color: '#848484',
      fontFamily: 'Inter',
      fontWeight: 400,
    },
    '& .MuiInputBase-root': {
      color: '#212121',
      fontFamily: 'Inter',
      fontWeight: 400,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#848484',
        borderRadius: '10px',
      },
      '&:hover fieldset': {
        borderColor: '#848484',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#848484',
      },
    },
    '& .MuiSvgIcon-root': {
      color: '#848484', 
    },
}));