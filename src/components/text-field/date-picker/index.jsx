import { CustomTextField1 } from '../text-field-1';

function CustomDatePicker({ label, value, onChange }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <CustomTextField1
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      variant="outlined"
      name="startDate"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          max: today, 
        },
      }}
    />
  );
}

export default CustomDatePicker;
