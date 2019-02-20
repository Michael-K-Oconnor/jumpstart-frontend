import React from 'react';
import './styles/app.css';
import Nav from './nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeProject = this.changeProject.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      id: Math.ceil(Math.random() * 107)
    };
  }

  changeProject() {
    this.setState({
      id: Math.floor(Math.random() * 99 + 1)
    });
  }

  handleClick(e, newId) {
    this.setState({
      id: newId
    });
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <div className="container">
          <div className="navBar">
            <Nav />
          </div>
          {/* <div className="Project">
            <Project id={id} />
          </div>
          <div className="Pledge">
            <Pledge id={id} />
          </div>
          <div className="Comments">
            <Comments id={this.state.id} />
          </div>
          <div className="Related">
            <Related id={id} onClick={this.handleClick} />
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;
