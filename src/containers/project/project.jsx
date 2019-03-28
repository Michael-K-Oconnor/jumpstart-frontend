import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProjectDisplay from './displays/projectdisplay';
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

  async componentDidMount() {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      const { data } = await axios.get(apiRoute + projectId);
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
    } catch {
      console.log('Looks like there was an error with the project component');
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      if (projectId !== prevProps.projectId) {
        const { data } = await axios.get(apiRoute + projectId);
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
      }
    } catch {
      console.log('Looks like there was an error with the project component');
    }
  }

  render() {
    const { name, creator, creatorImg, blurb, fullImg, location, category, hasData } = this.state;
    return (
      <>
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
      </>
    );
  }
}
