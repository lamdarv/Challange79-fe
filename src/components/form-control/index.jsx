import { FormControl, Select, MenuItem } from '@mui/material';

const CustomFormControl = ({ value, onChange, options }) => {
  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        '& .MuiInputBase-root': {
          color: '#848484',
          fontFamily: 'Fira Sans', // This changes the font for the input as a whole
          fontSize: 14,
          '&:before': {
            borderBottomColor: '#848484', // Underline color in normal state
          },
          '&:hover:before': {
            borderBottomColor: '#848484', // Underline color in hover state
          },
        },
      }}
      size="small"
    >
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                fontFamily: 'Fira Sans',
                fontSize: 12, // Ensure this is the correct font size
              },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomFormControl;
