import { Box, Button, Flex } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/fb-init';
import { memo, useEffect, useState } from 'react';
const PLAYER_TYPES = ['WK', 'BAT', 'AR', 'BOWL'];

const Players = ({ team }) => {
  const [allPlayers, setPlayers] = useState([]);

  useEffect(() => {
    if (team) getPlayers();
  }, [team]);

  const getPlayers = async () => {
    const playersCollectionRef = collection(db, 'players');
    const q = query(playersCollectionRef, where('Team', '==', team));
    const result = await getDocs(q);
    const playersList = result.docs.map(doc => ({
      data: doc.data(),
      id: doc.id,
    }));
    console.log(playersList);
    setPlayers(playersList);
  };

  return (
    <Flex w="100%" flexWrap={'wrap'} gap={'10px'} flex={'1'}>
      <Flex w={'100%'} gap={'5px'}>
        {PLAYER_TYPES.map(pType => (
          <Flex flex={1} flexDirection={'column'} gap={'10px'} key={pType}>
            <Box>{pType}</Box>
            {allPlayers
              .filter(pla => pla.data.Type === pType)
              .map(player => {
                return (
                  <Button size={'xs'} key={player.id}>
                    {player.data.Name}
                  </Button>
                );
              })}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(Players);
