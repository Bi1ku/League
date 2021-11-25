import React, { useEffect, useState } from 'react';
import ChampionService from '../services/champion';
import ChampionModel from './ChampionModel';

function AllChampions() {
  const [champions, setChampions] = useState();
  const [loading, setLoading] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [currChamp, setCurrChamp] = useState({
    name: '',
    title: '',
    imageURL: '',
  });
  const [input, setInput] = useState('');
  const currentChampInformaion = (name, title, imageURL) => {
    const nextCurrChamp = currChamp;
    nextCurrChamp.name = name;
    nextCurrChamp.title = title;
    nextCurrChamp.imageURL = imageURL;
    setCurrChamp(nextCurrChamp);
  };
  const [champsFiltered, setChampsFiltered] = useState([]);

  useEffect(() => {
    const getAllChampions = async () => {
      try {
        setLoading(true);
        const result = await ChampionService.getAllChampions();
        setChampions(Object.entries(result.data.data));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e.message;
      }
    };
    getAllChampions();
  }, []);
  useEffect(() => {
    if (input !== '') {
      setChampsFiltered(
        champions.filter((v) =>
          v[0].toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  }, [input]);
  return loading ? (
    <div className='center'>Loading...</div>
  ) : champions ? (
    <>
      <div className='champions-grid'>
        <div>
          <input
            type='text'
            className='search-input'
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search for a champion'
          />
        </div>
        <div />
        <div />
        <div />
        {input !== ''
          ? champsFiltered.map((champion) => (
              <div
                className='champion'
                onClick={() => {
                  setModelOpen(!modelOpen);
                  currentChampInformaion(
                    champion[0],
                    champion[1].title,
                    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0]}_0.jpg`
                  );
                }}
              >
                <div className='title'>
                  <span>{champion[0]}</span>
                  <br />
                  <span>({champion[1].title})</span>
                </div>
                <img
                  className='champion-all-image'
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0]}_0.jpg`}
                  alt=''
                />
              </div>
            ))
          : champions.map((champion) => (
              <div
                className='champion'
                onClick={() => {
                  setModelOpen(!modelOpen);
                  currentChampInformaion(
                    champion[0],
                    champion[1].title,
                    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0]}_0.jpg`
                  );
                }}
              >
                <div className='title'>
                  <span>{champion[0]}</span>
                  <br />
                  <span>({champion[1].title})</span>
                </div>
                <img
                  className='champion-all-image'
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0]}_0.jpg`}
                  alt=''
                />
              </div>
            ))}
        {modelOpen && (
          <ChampionModel
            setModelOpen={setModelOpen}
            name={currChamp.name}
            imageURL={currChamp.imageURL}
            title={currChamp.title}
          />
        )}
      </div>
    </>
  ) : (
    <div className='center'>Failed to fetch champions information</div>
  );
}

export default AllChampions;
