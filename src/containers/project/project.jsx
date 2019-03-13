import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import locationIcon from 'assets/locationIcon.png';
import categoryIcon from 'assets/categoryIcon.png';
import './project.css';

export default class Project extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      apiRoute: `${window.location.origin}/api/projects/`
    };
  }

  componentDidMount() {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    axios.get(apiRoute + projectId).then(({ data }) => {
      const { name, creator, creatorImg, blurb, fullImg, location, category } = data;
      this.setState({
        name,
        creator,
        creatorImg,
        blurb,
        fullImg,
        location,
        category
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    if (projectId !== prevProps.projectId) {
      axios.get(apiRoute + projectId).then(({ data }) => {
        const { name, creator, creatorImg, blurb, fullImg, location, category } = data;
        this.setState({
          name,
          creator,
          creatorImg,
          blurb,
          fullImg,
          location,
          category
        });
      });
    }
  }

  render() {
    const { name, creator, creatorImg, blurb, fullImg, location, category } = this.state;
    return (
      <div className="ProjectView">
        <div className="ProjectHeaderBox">
          <div className="project-creator-box">
            <div className="project-creator-image">
              <img src={creatorImg} id="creator-pic" alt="Project creator" />
            </div>
            <div className="project-creator-name">
              <p id="project-creator">By {creator}</p>
            </div>
          </div>
          <div className="project-title-box">
            <h1 id="project-title">{name}</h1>
            <h3 id="project-subtitle">{blurb}</h3>
          </div>
        </div>

        <div className="project-image-box">
          <div className="full-project-image">
            <img id="project-image" src={fullImg} alt="Project" />
          </div>

          <div className="project-caption-box">
            <div className="project-category-box">
              <img src={categoryIcon} id="category-icon" alt="category icon" />
              <div id="category-text">{category}</div>
            </div>
            <div className="project-location-box">
              <img src={locationIcon} id="location-icon" alt="location icon" />
              <div id="location-text">{location}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
