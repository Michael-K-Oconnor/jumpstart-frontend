import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import 'styles/suggested.css';

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

  componentDidMount() {
    const { apiRoute } = this.state;
    axios.get(`${apiRoute}sample`).then(({ data }) => {
      this.setState({ projects: data });
    });
  }

  componentDidUpdate(prevProps) {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    if (projectId !== prevProps.projectId) {
      axios.get(`${apiRoute}sample`).then(({ data }) => {
        this.setState({ projects: data });
      });
    }
  }

  render() {
    const { projects } = this.state;
    const { handleClick } = this.props;
    return (
      <div>
        {projects.map((project, i) => (
          <button
            key={i}
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
        ))}
      </div>
    );
  }
}