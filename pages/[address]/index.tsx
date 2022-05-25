import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBoolean,
  useInterval,
} from '@chakra-ui/react';
import { shortenIfAddress, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import { EventGame, EventGame__factory } from '../../contracts/types';
import { useActiveChain } from '../../hooks/useActiveChain';
import { useAlert } from '../../hooks/useAlert';

interface Leaderboard {
  address: string;
  points: ethers.BigNumber;
  numberOfPlays: ethers.BigNumber;
  timeElapsed: ethers.BigNumber;
}

const signs = ['rock', 'paper', 'scissor'];

export default function Game() {
  const [gameContract, setGameContract] = useState<EventGame>();
  const [scoreboard, setScoreboard] =
    useState<EventGame.UserScoreStructOutput>();
  const [selectedSign, setSelectedSign] = useState<number>();
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [history, setHistory] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [status, setStatus] = useState(0);

  const router = useRouter();
  const { isActive, account } = useActiveChain();
  const { openAlert } = useAlert();
  const [isLoading, setLoading] = useBoolean();
  const { library } = useEthers();

  const gameAddress = router.asPath.replace('/', '');

  const callContract = async () => {
    if (!gameAddress || !account) return;
    const provider = new ethers.providers.InfuraProvider(
      'kovan',
      process.env.NEXT_PUBLIC_INFURA_KEY
    );

    const contract = EventGame__factory.connect(gameAddress, provider);
    getRegistered(contract);
    getScore(contract);
    getResultEvent(contract);
    calculateLeaderboard(contract);
    setGameContract(contract);

    const filters = contract.filters.result(gameAddress, account);
    contract.removeAllListeners('result');
    contract.on(filters, (_gameAddress, _player, result) => {
      if (_gameAddress === gameAddress && _player === account) {
        if (result === 'win') {
          openAlert('You won', 'success');
        } else {
          openAlert('You lost', 'error');
        }
      }
    });
  };

  const getRegistered = async (_contract?: EventGame) => {
    if (!account) return;
    const contract = _contract ?? gameContract;
    const isRegistered = await contract?.s_isRegistered(account);
    setIsRegistered(isRegistered ?? false);
  };

  const getScore = async (_contract?: EventGame) => {
    if (!account) return;
    const contract = _contract ?? gameContract;
    getRegistered();
    const scoreboard = await contract?.scoreboard(account);
    setScoreboard(scoreboard);
  };

  const getResultEvent = async (_contract?: EventGame) => {
    const contract = _contract ?? gameContract;

    const filters = contract?.filters.result(gameAddress, account);
    const events = await contract?.queryFilter(filters!);
    events?.reverse();

    const history: string[] = [];
    events?.forEach((event) => {
      history.push(event.args.result);
    });
    setHistory(history);
  };

  const calculateLeaderboard = async (_contract?: EventGame) => {
    if (!isActive) return;
    const contract = _contract ?? gameContract;
    const status = await contract?.status();
    setStatus(status ?? 0);
    const leaderboard: Leaderboard[] = [];
    for (let i = 0; i < 1000; i++) {
      try {
        const address = await contract?.s_registeredAddresses(i);
        if (!address) return;
        const score = await contract?.scoreboard(address);
        const { points, numberOfPlays, timeElapsed } = score!;
        leaderboard.push({
          address,
          points,
          numberOfPlays,
          timeElapsed,
        });
      } catch (error) {
        break;
      }
    }

    setLeaderboard(_.orderBy(leaderboard, ['points'], ['asc']));
  };

  useEffect(() => {
    callContract();
  }, [isActive, account]);

  useInterval(calculateLeaderboard, 10000);

  const _onPlay = async () => {
    if (!isActive) {
      openAlert('Please switch to kovan network');
      return;
    }
    setLoading.on();
    try {
      const signer = library?.getSigner();

      if (!gameAddress || !signer || !selectedSign) return;
      const eventFactory = EventGame__factory.connect(gameAddress, signer);

      const tx = await eventFactory.userPlay(selectedSign);
      await tx.wait();
      getResultEvent();
      getScore();
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

  const _registerToGame = async () => {
    if (!isActive) {
      openAlert('Please switch to kovan network');
      return;
    }
    setLoading.on();
    try {
      const signer = library?.getSigner();

      if (!gameAddress || !signer) return;
      const eventFactory = EventGame__factory.connect(gameAddress, signer);
      const tx = await eventFactory.register();
      await tx.wait();
      openAlert('You registered successfully', 'success');
    } catch (error: any) {
      openAlert(
        error.message.replace(
          'VM Exception while processing transaction: revert ',
          ''
        )
      );
    }
    setLoading.off();
  };

  if (!isRegistered)
    return (
      <Center minH="100vh">
        <Text fontSize={'2xl'}>
          You need to be registered in order to be able to play the game
        </Text>
        {status === 0 && (
          <Button onClick={_registerToGame} isLoading={isLoading}>
            Register
          </Button>
        )}
      </Center>
    );

  if (status === 2)
    return (
      <Center minH="100vh" minW="100vw">
        <Text fontSize={'2xl'}>The game has come to an end</Text>
      </Center>
    );

  const LeaderboardComponent = () => (
    <TableContainer maxH={'80vh'} overflowY="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th isNumeric>Position</Th>
            <Th>Address</Th>
            <Th isNumeric>Points</Th>
            <Th isNumeric>Number of plays</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboard.map((val, i) => (
            <Tr key={i}>
              <Td isNumeric>{i + 1}</Td>
              <Td>{shortenIfAddress(val.address)}</Td>
              <Td isNumeric>{val.points.toNumber()}</Td>
              <Td isNumeric>{val.numberOfPlays.toNumber()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const PlayerComponent = () => (
    <Container maxW="container.lg">
      <Flex>
        <Stat>
          <StatLabel>Points</StatLabel>
          <StatNumber>{scoreboard?.points.toString() ?? 0}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Number of plays</StatLabel>
          <StatNumber>
            {scoreboard?.numberOfPlays.toString() ?? '0'} / 5
          </StatNumber>
        </Stat>
      </Flex>

      {history.length > 0 && (
        <Box mb={4}>
          <Text>History: </Text>
          {history.map((val, i) => (
            <Tag colorScheme={val === 'win' ? 'green' : 'red'} key={i}>
              {val}
            </Tag>
          ))}
        </Box>
      )}

      {scoreboard?.numberOfPlays && scoreboard.numberOfPlays.toNumber() < 5 && (
        <Flex
          maxW="container.md"
          bg="whiteAlpha.100"
          px={5}
          py={2}
          borderRadius="xl"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex gap={4}>
            {signs.map((sign, index) => (
              <Box
                borderRadius="full"
                cursor="pointer"
                as={motion.button}
                whileHover={{
                  scale: 1.1,
                }}
                border={index === selectedSign ? '2px' : 'none'}
                onClick={() => setSelectedSign(index)}
                key={sign}
              >
                <Image
                  src={`/gesture/${sign}-sign.svg`}
                  width="100"
                  height="100"
                  layout="fixed"
                />
              </Box>
            ))}
          </Flex>

          {account && (
            <Button isLoading={isLoading} onClick={_onPlay}>
              Play
            </Button>
          )}
        </Flex>
      )}
    </Container>
  );
  return (
    <Container maxW="container.xl">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={3}>
          <PlayerComponent />
        </GridItem>
        <GridItem colSpan={2}>
          <LeaderboardComponent />
        </GridItem>
      </Grid>
    </Container>
  );
}
