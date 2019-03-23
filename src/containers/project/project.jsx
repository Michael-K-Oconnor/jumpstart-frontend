import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProjectDisplay from './displays/ProjectDisplay';
import './project.css';

export default class Project extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      apiRoute: `${window.location.origin}/api/projects/`,
      hasData: false
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
        category,
        hasData: true
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
    const { name, creator, creatorImg, blurb, fullImg, location, category, hasData } = this.state;
    return (
      <div>
        {hasData && (
          <ProjectDisplay
            name={name}
            creator={creator}
            creatorImg={creatorImg}
            blurb={blurb}
            fullImg={fullImg}
            location={location}
            category={category}
          />
        )}
      </div>
    );
  }
}
