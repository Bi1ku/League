import React from 'react';
import { useNavigate } from 'react-router';

function ChampionModel({ setModelOpen, name, title, imageURL }) {
  const navigate = useNavigate();
  return (
    <div
      className='overlay'
      onClick={(e) => e.target.className === 'overlay' && setModelOpen(false)}
    >
      <div className='model'>
        <div className='title-model'>
          <span className='name'>{`${name} (${title})`}</span>
          <button onClick={() => setModelOpen(false)} className='exit-button'>
            X
          </button>
        </div>
        <img src={imageURL} alt={name} width='900' />
        <button
          className='more-details'
          onClick={() => navigate(`/champion/${name}`)}
        >
          More details
        </button>
      </div>
    </div>
  );
}

export default ChampionModel;
