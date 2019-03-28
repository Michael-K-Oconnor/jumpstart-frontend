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
    return (
      <div className="container">
        <div className="navbar">
          <Nav />
        </div>
        <div className="left-col">
          <Project projectId={projectId} />
          <Comments projectId={projectId} />
        </div>
        <div className="right-col">
          <Pledge projectId={projectId} />
          <Suggested projectId={projectId} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}
