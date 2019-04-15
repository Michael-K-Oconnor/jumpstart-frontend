import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { formatTimeStamp } from 'utils/utils';
import TextAreaWithSubmit from 'displayComps/textAreaWithSubmit';
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
      apiRoute: '/api/comments/',
      comments: []
    };
  }

  async componentDidMount() {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      const { data } = await axios.get(apiRoute + projectId);
      this.setState({ comments: data });
    } catch {
      console.log('Looks like there was an error with the comments component');
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      if (projectId !== prevProps.projectId) {
        const { data } = await axios.get(apiRoute + projectId);
        this.setState({ comments: data });
      }
    } catch {
      console.log('Looks like there was an error with the comments component');
    }
  }

  async handleSubmit(e, comment) {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      await axios.post(apiRoute, {
        projectId,
        comment,
        userId: 0,
        username: 'Guest'
      });
      const { data } = await axios.get(apiRoute + projectId);
      this.setState({ comments: data });
    } catch {
      console.log('Looks like there was an error with the comments component');
    }
  }

  render() {
    const { comments } = this.state;
    return (
      <div className="comment-component">
        <TextAreaWithSubmit
          className="comment-form"
          handleSubmit={this.handleSubmit}
          name="CommentForm"
          placeholder="Add a comment!"
        />
        <div className="comment-cards">
          {comments.map((comment, i) => (
            <CommentCard
              key={i}
              username={comment.username}
              createdAt={formatTimeStamp(comment.createdAt)}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    );
  }
}
