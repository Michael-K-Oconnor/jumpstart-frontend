import React from 'react';
import Nav from 'containers/nav/nav';
import Project from 'containers/project/project';
import Pledge from 'containers/pledge/pledge';
import Comments from 'containers/comments/comments';
import Suggested from 'containers/suggested/suggested';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      projectId: Math.ceil(Math.random() * 107)
    };
  }

  handleClick(e, newId) {
    this.setState({
      projectId: newId
    });
  }

  render() {
    const { projectId } = this.state;
    const hostUrl =
      process.env.NODE_ENV === 'production'
        ? `https://${window.location.hostname}`
        : `http://${window.location.hostname}`;
    return (
      <div className="container">
        <div className="navbar">
          <Nav />
        </div>
        <div className="left-col">
          <Project projectId={projectId} hostUrl={hostUrl} />
          <Comments projectId={projectId} hostUrl={hostUrl} />
        </div>
        <div className="right-col">
          <Pledge projectId={projectId} hostUrl={hostUrl} />
          <Suggested projectId={projectId} hostUrl={hostUrl} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}
