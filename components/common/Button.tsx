import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export default function Button({
  children,
  onClick,
  variant,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      bg={variant === 'danger' ? 'red.500' : 'teal.200'}
      borderRadius="full"
      px="4"
      onClick={onClick}
      variant={variant}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
