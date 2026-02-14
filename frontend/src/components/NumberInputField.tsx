import { TextField, type TextFieldProps } from '@mui/material';

const NumberInputField = (props: TextFieldProps) => {
  return (
    <TextField {...props} type="number" onFocus={(e) => e.target.select()} />
  );
};

export default NumberInputField;
