import React from 'react';
import PropTypes from 'prop-types';
import TextArea from 'displayComps/textArea';
import SubmitButton from 'displayComps/submitButton';

export default class TextAreaWithSubmit extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    rows: PropTypes.number,
    htmlFor: PropTypes.string,
    resize: PropTypes.bool,
    placeholder: PropTypes.string,
    isValidInput: PropTypes.func,
    formatInput: PropTypes.func,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = { content: '' };
  }

  componentDidMount() {
    this.setState({ hasMounted: true });
  }

  handleInputChange(e) {
    const { isValidInput = () => true, formatInput = i => i } = this.props;
    this.setState({
      content: formatInput(e.target.value),
      isDisabled: !isValidInput(e.target.value)
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const { content } = this.state;
    handleSubmit(e, content);
    this.setState({ content: '' });
  }

  render() {
    const { content, isDisabled, hasMounted } = this.state;
    const { name, title, rows, htmlFor, resize, placeholder, className } = this.props;
    return (
      <>
        {hasMounted && (
          <form className={className}>
            <TextArea
              content={content}
              handleInputChange={this.handleInputChange}
              name={name}
              title={title}
              rows={rows}
              htmlFor={htmlFor}
              resize={resize}
              placeholder={placeholder}
            />
            <SubmitButton
              handleFormSubmit={this.handleFormSubmit}
              name={name}
              isDisabled={isDisabled}
            />
          </form>
        )}
      </>
    );
  }
}
