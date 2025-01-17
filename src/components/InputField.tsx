import { TextField, OutlinedTextFieldProps } from '@mui/material';

type InputFieldProps = OutlinedTextFieldProps & {  
  label: string;
  error: boolean;
  helperText: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, helperText, value, ...props }) => {
  return (
    <TextField
      {...props}
      label={label}
      variant="outlined"  
      fullWidth
      error={error}
      helperText={helperText}
      value={value}  
    />
  );
};

export default InputField;
