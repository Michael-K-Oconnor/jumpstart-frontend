import React from 'react';
import PropTypes from 'prop-types';

const SuggestedCard = props => {
  const { handleClick, project } = props;
  return (
    <>
      <button
        className="project"
        type="button"
        onClick={event => handleClick(event, project.projectId)}
      >
        <div className="image">
          <img src={project.thumbnail} alt="Suggested project thumbnail" />
          <div className="name">{project.name}</div>
          <div className="blurb">{project.blurb}</div>
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
