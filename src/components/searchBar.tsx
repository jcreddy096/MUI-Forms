
import { TextField } from '@mui/material';

type SearchBarProps =  {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ inputValue, handleInputChange }:SearchBarProps)  => {
  return (
    <TextField
      label="Search by Title"
      variant="outlined"
      fullWidth
      value={inputValue}
      onChange={handleInputChange}
      sx={{ marginBottom: '20px' }}
    />
  );
};

export default SearchBar;
