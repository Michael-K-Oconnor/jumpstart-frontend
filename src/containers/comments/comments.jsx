import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentForm from './displays/commentForm';
import CommentCard from './displays/commentCard';

export default class Comments extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      apiRoute: `${window.location.origin}/api/comments/`,
      comments: [],
      content: ''
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      content: ''
    });
  }

  handleInputChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  render() {
    const { comments, content } = this.state;
    return (
      <div>
        <CommentForm
          content={content}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        {comments.map((comment, i) => (
          <CommentCard key={i} {...comment} />
        ))}
      </div>
    );
  }
}
