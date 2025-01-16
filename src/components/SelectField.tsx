
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, FormHelperText } from '@mui/material';

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (e: SelectChangeEvent<string>) => void;
  error?: boolean;
  helperText?: string; 
}

const SelectField =({ label, value, options, onChange, error, helperText }:SelectFieldProps ) => {
  return (
    <FormControl fullWidth variant="outlined" error={error}> 
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>} 
    </FormControl>
  );
};

export default SelectField;
