import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { format } from 'date-fns';
import Button from './Button';

interface Props {
  name: string;
  description: string;
  numberOfTickets: number;
  mintingDate: Date;
  price: number;
}

const Event: FunctionComponent<Props> = ({
  name,
  description,
  numberOfTickets,
  mintingDate,
  price,
}) => {
  return (
    <Box
      borderRadius="md"
      bg={useColorModeValue('whiteAlpha.500', 'gray.900')}
      px={5}
      py={3}
      position="relative"
    >
      <Flex mb={1} justifyContent={'space-between'} alignItems="center">
        <Badge py={2} px={3} variant="subtle" colorScheme="green">
          {price} ETH
        </Badge>
        <Badge py={2} px={3} variant="outline" colorScheme="gray">
          {numberOfTickets} tickets
        </Badge>
      </Flex>
      <Heading as="h3" fontSize={['lg', '2xl']}>
        {name}
      </Heading>
      <Text>{description}</Text>

      <Flex mt={3} alignItems="center">
        <Text>{format(mintingDate, 'Qo MMM yyyy')}</Text>
        <Button>Register</Button>
      </Flex>
    </Box>
  );
};
export default Event;
