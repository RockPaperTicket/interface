import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { InputFieldProps } from './interface';

const InputField: FunctionComponent<InputFieldProps> = ({
  errors,
  register,
  label,
  id,
  placeholder,
  minLength = 1,
  type = 'text',
  as = 'input',
  min = 1,
}) => {
  const error = errors?.[id];
  return (
    <FormControl isInvalid={error} mb={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {as === 'input' ? (
        <Input
          id={label}
          placeholder={placeholder ?? label}
          type={type}
          {...register(id, {
            required: 'This field is required',
            minLength: {
              value: minLength,
              message: `The field should contain atleast ${minLength} characters`,
            },
            min: {
              value: min,
              message: `Value must be greater than ${min}`,
            },
          })}
        />
      ) : (
        <Textarea
          id={label}
          placeholder={placeholder ?? label}
          {...register(id, {
            required: 'This field is required',
            minLength: {
              value: minLength,
              message: `The field should contain atleast ${minLength} characters`,
            },
          })}
        />
      )}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
