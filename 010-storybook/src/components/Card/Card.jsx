import React from 'react';
import PropTypes from 'prop-types';
/**
 * styles
 */
import './Card.css';

const Card = (props) => {
  return (
    <div className='card'>
      <h3 className='card-title'>{props.title}</h3>

      <div className='card-body'>
        <span>Some content</span>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Card;
