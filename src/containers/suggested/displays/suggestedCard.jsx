import React from 'react';
import PropTypes from 'prop-types';

const SuggestedCard = props => {
  const { handleClick, project } = props;
  return (
    <>
      <button
        className="suggested-card"
        type="button"
        onClick={event => handleClick(event, project.projectId)}
      >
        <img src={project.thumbnail} alt="Suggested project thumbnail" />
        <div>
          <p className="name">{project.name}</p>
          <p className="blurb">{project.blurb}</p>
        </div>
      </button>
    </>
  );
};

SuggestedCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
  project: PropTypes.shape({
    projectId: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired
  })
};

export default SuggestedCard;
