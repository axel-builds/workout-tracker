import { useState, type SyntheticEvent } from 'react';

const useAutocompleteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const openDialog = (startingValue: string) => {
    setValue(startingValue);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleInputChange = (_e: SyntheticEvent, value: string) => {
    setValue(value);
  };

  const handleValueChange = (_e: SyntheticEvent, value: string | null) => {
    setValue(value ?? '');
  };

  return {
    isOpen,
    openDialog,
    close,
    value,
    handleInputChange,
    handleValueChange,
  };
};

export default useAutocompleteDialog;
