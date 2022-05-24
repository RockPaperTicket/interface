import {
  Alert,
  AlertIcon,
  Box,
  SlideFade,
  useDisclosure,
} from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AlertStatus = 'error' | 'info' | 'warning' | 'success';
type AlertProps = {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  openAlert: (message: string, status?: AlertStatus) => void;
};

const AlertContext = createContext<AlertProps>({} as AlertProps);

let debouncedCallback: any;
export function AlertProvider({
  children,
}: {
  children: React.ReactChild[] | React.ReactNode;
}) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<AlertStatus>('error');

  const openAlert = (message: string, status?: AlertStatus) => {
    status = status ?? 'error';
    setMessage(message);
    setStatus(status);
    onOpen();
  };

  useEffect(() => {
    clearTimeout(debouncedCallback);
    debouncedCallback = setTimeout(onClose, 1000);
  }, [isOpen]);

  return (
    <AlertContext.Provider value={{ onToggle, onOpen, onClose, openAlert }}>
      <SlideFade in={isOpen} offsetY="-20px">
        <Box
          position="fixed"
          top="5rem"
          left="50%"
          style={{
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          <Alert status={status}>
            <AlertIcon />
            {message}
          </Alert>
        </Box>
      </SlideFade>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
