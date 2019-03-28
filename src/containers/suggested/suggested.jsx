import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SuggestedCard from './displays/suggestedCard';
import './suggested.css';

export default class Suggested extends React.Component {
  static propTypes = {
    projectId: PropTypes.number,
    handleClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      apiRoute: `${window.location.origin}/api/projects/`
    };
  }

  async componentDidMount() {
    try {
      const { apiRoute } = this.state;
      const { data } = await axios.get(`${apiRoute}sample`);
      this.setState({ projects: data });
    } catch {
      console.log('Looks like there was an error with the suggested component');
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      if (projectId !== prevProps.projectId) {
        const { data } = await axios.get(`${apiRoute}sample`);
        this.setState({ projects: data });
      }
    } catch {
      console.log('Looks like there was an error with the suggested component');
    }
  }

  render() {
    const { projects } = this.state;
    const { handleClick } = this.props;
    return (
      <div>
        {projects.map((project, i) => (
          <SuggestedCard key={i} handleClick={handleClick} project={project} />
        ))}
      </div>
    );
  }
}
