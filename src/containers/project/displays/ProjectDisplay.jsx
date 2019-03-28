import React from 'react';
import PropTypes from 'prop-types';
import locationIcon from 'assets/locationIcon.png';
import categoryIcon from 'assets/categoryIcon.png';

const ProjectDisplay = props => {
  const { creatorImg, creator, name, blurb, fullImg, category, location } = props;
  return (
    <div className="project-view">
      <div className="header">
        <div className="creator">
          <img src={creatorImg} alt="Project creator" />
          <p>By {creator}</p>
        </div>
        <div className="title">
          <h1 className="title-name">{name}</h1>
          <h3 className="title-blurb">{blurb}</h3>
        </div>
      </div>
      <img className="main" src={fullImg} alt="Project" />
      <div className="context">
        <div className="context-category">
          <img src={categoryIcon} alt="category icon" />
          <p>{category}</p>
        </div>
        <div className="context-location">
          <img src={locationIcon} alt="location icon" />
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

ProjectDisplay.propTypes = {
  creatorImg: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default ProjectDisplay;
