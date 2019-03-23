import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentForm from 'displayComps/textAreaWithSubmit';
import CommentCard from './displays/commentCard';
import './comments.css';

export default class Comments extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      apiRoute: `${window.location.origin}/api/comments/`,
      comments: []
    };
  }

  componentDidMount() {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    axios.get(apiRoute + projectId).then(({ data }) => {
      this.setState({
        comments: data
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    if (projectId !== prevProps.projectId) {
      axios.get(apiRoute + projectId).then(({ data }) => {
        this.setState({
          comments: data
        });
      });
    }
  }

  handleSubmit(e, comment) {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    axios
      .post(apiRoute, {
        projectId,
        comment,
        userId: 0,
        username: 'Guest'
      })
      .then(() => axios.get(apiRoute + projectId))
      .then(({ data }) => {
        this.setState({
          comments: data
        });
      });
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        <CommentForm
          handleSubmit={this.handleSubmit}
          name="CommentForm"
          placeholder="Add a comment!"
        />
        {comments.map((comment, i) => (
          <CommentCard key={i} {...comment} />
        ))}
      </div>
    );
  }
}
