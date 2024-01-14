import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const CustomButton2 = styled(Button)(({ theme }) => ({
  fullWidth: true,
  variant: 'outlined',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: 'white',
  color: '#848484',
  fontFamily: 'Inter',
  fontWeight: 600,
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#e0e0e0', // Optional: Change button color on hover
  },
}));
