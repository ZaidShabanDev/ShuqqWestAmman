import React from 'react';
import { Button, ButtonProps } from './Button';

const ButtonPrimary: React.FC<ButtonProps> = ({ color, outline, plain, children, ...props }) => {
  return (
    <Button color="dark/white" className={`cursor-pointer hover:cursor-pointer active:cursor-pointer`}
       {...props}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;
