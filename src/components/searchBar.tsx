import { TextField } from '@mui/material';

type SearchBarProps = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, handleInputChange }) => {
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
