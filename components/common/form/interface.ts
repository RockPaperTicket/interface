import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputFieldProps {
  errors: {
    [x: string]: any;
  };
  register: UseFormRegister<FieldValues>;
  label: string;
  id: string;
  placeholder?: string;
  minLength?: number;
  type?: HTMLInputTypeAttribute;
  as?: 'input' | 'textarea';
  min?: number;
}
