import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export default function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <ChakraButton
      bg="teal.200"
      borderRadius="full"
      px="4"
      onClick={onClick}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
