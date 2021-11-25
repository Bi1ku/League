import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ChampionService from '../services/champion';

function Champion() {
  const [information, setInformation] = useState();
  const [loading, setLoading] = useState(false);
  const name = window.location.href.split('/')[4];
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChampionInformation = async () => {
      try {
        setLoading(true);
        const result = await ChampionService.getOneChampionByName(name);
        setInformation(Object.values(result.data.data));
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchChampionInformation();
  }, []);
  return loading ? (
    <div className='center'>Loading...</div>
  ) : information ? (
    <div className='container'>
      <span className='name'>{`${
        information[0].name
      } (${information[0].tags.join(', ')})`}</span>
      <span className='title'>{information[0].title}</span>
      <br />
      <span className='blurb'>{information[0].blurb}</span>
      <div className='img-container'>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`}
          alt=''
          width='450'
        />
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_1.jpg`}
          alt=''
          width='450'
        />
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_2.jpg`}
          alt=''
          width='450'
        />
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_3.jpg`}
          alt=''
          width='450'
        />
      </div>
      <br />
      <span className='blurb'>Moves:</span>
      {information[0].spells.map((v) => (
        <div className='moves'>{`${v.name}: ${v.description}`}</div>
      ))}
      <button className='button' onClick={() => navigate('/')}>
        Return to champions
      </button>
    </div>
  ) : (
    <div className='center'>Not a valid champion 🤡</div>
  );
}

export default Champion;
