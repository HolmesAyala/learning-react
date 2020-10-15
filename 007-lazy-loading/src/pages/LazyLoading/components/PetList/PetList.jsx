import React from 'react';
import PropTypes from 'prop-types';
/**
 * Styles
 */
import styleSheet from './PetList.module.css';
/**
 * Components
 */
import PetCard from '../PetCard';

const PetList = (props) => {
  const petCardList = props.items.map((pet, idx) => <PetCard key={idx} {...pet} />);

  return (
    <div className={styleSheet.root}>
      {petCardList}
    </div>
  );
};

PetList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PetList;
