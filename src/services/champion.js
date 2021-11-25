import axios from 'axios';

const getAllChampions = async () =>
  axios.get(
    'https://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json'
  );

const getOneChampionByName = async (name) =>
  axios.get(
    `https://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion/${name}.json`
  );

const ChampionService = {
  getAllChampions,
  getOneChampionByName,
};

export default ChampionService;
