import { Box, Flex, Text } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/fb-init';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Players from './Players';
import Teams from './Teams';

export const MatchBox = () => {
  const [match, setMatch] = useState(null);
  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = async () => {
    const matchesCollectionRef = collection(db, 'matches');
    const que = await query(
      matchesCollectionRef,
      where('Date', '==', format(new Date(), 'dd-MMM-yy'))
    );
    const result = await getDocs(que);
    const docs = result.docs.map(doc => {
      return { data: doc.data(), id: doc.id };
    });
    setMatch(docs[0]);
  };

  return (
    <Flex flexDir={'column'} w="100%">
      <Flex
        flexDirection={'column'}
        h="60px"
        borderBottom={'1px solid #ababab'}
        alignItems={'center'}
        px={2}
      >
        <Flex>
          <Text>Today&apos;s Match</Text>
        </Flex>
        <Flex w="100%" justifyContent={'space-between'}>
          <Flex>
            <Text>{match?.data['Home Team']}</Text>
          </Flex>
          <Flex>
            <Text>vs</Text>
          </Flex>
          <Flex>
            <Text>{match?.data['Away Team']}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" justifyContent={'space-between'} p={2} gap={'16px'}>
        <Flex flex={'1'}>
          <Box>{}</Box>
          <Players team={match?.data['Home Team']}></Players>
        </Flex>
        <Flex flex="1">
          <Players team={match?.data['Away Team']}></Players>
        </Flex>
      </Flex>
      <Flex w="100%" justifyContent={'space-between'} p={2} gap={'16px'}>
        <Teams></Teams>
      </Flex>
    </Flex>
  );
};
