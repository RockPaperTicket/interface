import { Alert, AlertIcon, Box, SlideFade } from '@chakra-ui/react';
import { useAlert } from '../hooks/useAlert';

const CustomAlert = () => {
  const { isOpen, message, status } = useAlert();

  return (
    <SlideFade in={isOpen} offsetY="-20px">
      <Box
        position="fixed"
        top="5rem"
        left="50%"
        style={{
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
        maxW="container.md"
      >
        <Alert status={status}>
          <AlertIcon />
          {message}
        </Alert>
      </Box>
    </SlideFade>
  );
};

export default CustomAlert;
