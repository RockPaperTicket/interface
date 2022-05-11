import {
  Box,
  Flex,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  Tag,
  TagLabel,
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
  registered?: boolean;
}

const Event: FunctionComponent<Props> = ({
  name,
  description,
  numberOfTickets,
  mintingDate,
  price,
  registered = false,
}) => {
  return (
    <Box
      borderRadius="md"
      bg={useColorModeValue('whiteAlpha.500', 'gray.900')}
      px={5}
      py={3}
      position="relative"
      minW="max-content"
    >
      <Flex mb={1} justifyContent={'space-between'} alignItems="center">
        <Tag variant="subtle" colorScheme="cyan">
          <TagLabel>{price} ETH</TagLabel>
        </Tag>
        <Tag variant="outline" colorScheme="gray">
          <TagLabel>{numberOfTickets} tickets</TagLabel>
        </Tag>
      </Flex>
      <Heading as="h3" fontSize={['lg', '2xl']}>
        {name}
      </Heading>
      <Text>{description}</Text>

      <Flex gap={4} mt={3} alignItems="center" justifyContent="space-between">
        <Stat>
          <StatLabel>Mint date</StatLabel>
          <StatHelpText>{format(mintingDate, 'Qo MMM yyyy')}</StatHelpText>
        </Stat>
        <Button hidden={registered}>Register</Button>
      </Flex>
    </Box>
  );
};
export default Event;
