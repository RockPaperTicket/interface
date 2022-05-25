import {
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  Tag,
  TagLabel,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import Button from './Button';
import { EventGame__factory, EventLog } from '../../contracts/types';
import { useAlertContext } from '../../context/alert';
import { useActiveChain } from '../../hooks/useActiveChain';
import { useEthers } from '@usedapp/core';

interface Props extends EventLog.EventStructOutput {
  registered?: boolean;
  created?: boolean;
}

const Event: FunctionComponent<Props> = ({
  eventName,
  eventGameAddress,
  numberOfTickets,
  ticketPrice,
  totalUsers,
  status,
  registered = false,
  created = false,
}) => {
  const { openAlert } = useAlertContext();
  const { isActive } = useActiveChain();
  const { library, account } = useEthers();
  const [isLoading, setLoading] = useBoolean();
  const isEnded = status === 2;

  const _contractFunction = async (type: 'register' | 'startGame') => {
    if (!isActive) {
      openAlert('Please switch to kovan network');
      return;
    }
    setLoading.on();
    try {
      const signer = library?.getSigner();

      if (!eventGameAddress || !signer) return;
      const eventFactory = EventGame__factory.connect(eventGameAddress, signer);
      if (type === 'register') {
        const tx = await eventFactory.register();
        await tx.wait();
        openAlert('You registered successfully', 'success');
      } else {
        const tx = await eventFactory.startGame();
        await tx.wait();
        openAlert('Game is started', 'success');
      }
    } catch (error: any) {
      console.log(error);
      openAlert(
        error.message.replace(
          'VM Exception while processing transaction: revert ',
          ''
        )
      );
    }
    setLoading.off();
  };

  return (
    <Box position="relative" minW="max-content">
      {isEnded && (
        <Tag
          position="absolute"
          top="50%"
          left="50%"
          style={{
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            zIndex: 20,
          }}
          fontSize="xl"
          colorScheme="red"
        >
          Expired
        </Tag>
      )}
      <Box
        borderRadius="md"
        bg={useColorModeValue('whiteAlpha.500', 'gray.900')}
        position="relative"
        zIndex={isEnded ? 'hide' : 'auto'}
        opacity={isEnded ? 0.5 : 1}
        px={5}
        py={3}
      >
        <Flex mb={1} justifyContent={'space-between'} alignItems="center">
          <Tag variant="subtle" colorScheme="cyan">
            <TagLabel>{ticketPrice.toString()} ETH</TagLabel>
          </Tag>
          <Tag variant="outline" colorScheme="gray">
            <TagLabel>{numberOfTickets.toString()} tickets</TagLabel>
          </Tag>
        </Flex>
        <Heading as="h3" fontSize={['lg', '2xl']}>
          {eventName}
        </Heading>

        <Flex gap={4} mt={3} alignItems="center" justifyContent="space-between">
          {totalUsers.toNumber() > 0 ? (
            <Stat>
              <StatLabel>{totalUsers.toString()} Users</StatLabel>
            </Stat>
          ) : (
            <div></div>
          )}

          {account &&
            isActive &&
            (created ? (
              <Button
                isLoading={isLoading}
                onClick={() => _contractFunction('startGame')}
              >
                Start
              </Button>
            ) : (
              !registered &&
              status === 0 && (
                <Button
                  isLoading={isLoading}
                  onClick={() => _contractFunction('register')}
                >
                  Register
                </Button>
              )
            ))}
        </Flex>
      </Box>
    </Box>
  );
};
export default Event;
