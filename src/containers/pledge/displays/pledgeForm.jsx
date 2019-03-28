import React from 'react';
import PropTypes from 'prop-types';
import NumberInput from 'displayComps/numberInput';
import SubmitButton from 'displayComps/submitButton';

export default class PledgeForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    htmlFor: PropTypes.string,
    isValidInput: PropTypes.func,
    formatInput: PropTypes.func,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string
  };

  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = { content: defaultValue || '' };
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
    const { defaultValue, handleSubmit } = this.props;
    const { content } = this.state;
    handleSubmit(e, content);
    this.setState({ content: defaultValue || '' });
  }

  render() {
    const { content, isDisabled, hasMounted } = this.state;
    const { name, min, max, htmlFor, title, placeholder } = this.props;
    return (
      <>
        {hasMounted && (
          <form className="pledge">
            <NumberInput
              type="number"
              name={name}
              title={title}
              value={content}
              placeholder={placeholder}
              min={min}
              max={max}
              handleInputChange={this.handleInputChange}
              htmlFor={htmlFor}
            />
            <i className="bling">$</i>
            <SubmitButton
              handleFormSubmit={this.handleFormSubmit}
              isDisabled={isDisabled}
              name="pledgSubmit"
              buttonText="Make a Pledge"
            />
          </form>
        )}
      </>
    );
  }
}
