import React from 'react';
import PropTypes from 'prop-types';
import locationIcon from 'assets/locationIcon.png';
import categoryIcon from 'assets/categoryIcon.png';

const ProjectDisplay = props => {
  const { creatorImg, creator, name, blurb, fullImg, category, location } = props;
  return (
    <div className="ProjectView">
      <div className="ProjectHeaderBox">
        <div className="creator">
          <img className="creator-image" src={creatorImg} alt="Project creator" />
          <p className="creator-name">By {creator}</p>
        </div>
        <div className="title">
          <h1 className="title-name">{name}</h1>
          <h3 className="title-blurb">{blurb}</h3>
        </div>
      </div>
      <img className="image" src={fullImg} alt="Project" />
      <div className="context">
        <div className="context-category">
          <img className="context-category-icon" src={categoryIcon} alt="category icon" />
          <div className="context-category-text">{category}</div>
        </div>
        <div className="context-location">
          <img id="context-location-icon" src={locationIcon} alt="location icon" />
          <div id="context-location-text">{location}</div>
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
