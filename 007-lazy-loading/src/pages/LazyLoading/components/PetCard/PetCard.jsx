import React from 'react';
import PropTypes from 'prop-types';

const PetCard = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>

      <p>{props.description}</p>

      <div>
        <button>Give a prize</button>
      </div>
    </div>
  );
}

PetCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default PetCard;
