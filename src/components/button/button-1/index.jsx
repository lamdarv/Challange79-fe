import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const CustomButton1 = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#2C8AD3',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontWeight: 600,
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1b6fa6', // Optional: Change button color on hover
    },
}));