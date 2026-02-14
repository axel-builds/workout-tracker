import { useState, type ChangeEvent } from 'react';

const useTextFieldDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const open = (startingValue: string) => {
    setValue(startingValue);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, value, handleChange, open, close };
};

export default useTextFieldDialog;
