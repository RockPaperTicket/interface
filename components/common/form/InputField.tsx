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
  minLength = 3,
  type = 'text',
  as = 'input',
}) => {
  const error = errors?.[id];
  return (
    <FormControl isInvalid={error}>
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
