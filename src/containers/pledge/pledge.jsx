import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './pledge.css';

const addCommas = number => {
  let stringNum = '';
  const arrayNum = String(Math.ceil(number))
    .replace(/,/gi, '')
    .split('')
    .reverse();
  for (let i = 0; i < arrayNum.length; i += 1) {
    if (i > 0 && i % 3 === 0) {
      stringNum = `,${stringNum}`;
    }
    stringNum = arrayNum[i] + stringNum;
  }
  return stringNum;
};

const isValidNum = num => {
  if (Number(num) > 0) {
    if (num.split('.')[1]) {
      return num.split('.')[1].length < 3;
    }
    return true;
  }
  return false;
};

export default class Pledge extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      apiRoute: `${window.location.origin}/api/projects/`,
      pledgeAmount: '10',
      isValidNumber: true,
      hasBacked: false,
      fundedRatio: '0px'
    };
  }

  componentDidMount() {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    axios.get(apiRoute + projectId).then(({ data }) => {
      const { goal, pledged, backerCount, daysLeft } = data;
      this.setState({
        goal: addCommas(goal),
        pledged: addCommas(pledged),
        backerCount: addCommas(backerCount),
        daysLeft: addCommas(daysLeft),
        fundedRatio: `${Math.min(
          Math.ceil((pledged / goal) * (window.innerWidth * 0.35 * 0.8)),
          window.innerWidth * 0.35 * 0.8
        )}px`
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { apiRoute } = this.state;
    const { projectId } = this.props;
    if (projectId !== prevProps.projectId) {
      axios.get(apiRoute + projectId).then(({ data }) => {
        const { goal, pledged, backerCount, daysLeft } = data;
        this.setState({
          goal: addCommas(goal),
          pledged: addCommas(pledged),
          backerCount: addCommas(backerCount),
          daysLeft: addCommas(daysLeft),
          fundedRatio: `${Math.min(
            Math.ceil((pledged / goal) * (window.innerWidth * 0.35 * 0.8)),
            window.innerWidth * 0.35 * 0.8
          )}px`,
          pledgeAmount: '10',
          hasBacked: false
        });
      });
    }
  }

  handleClick(e) {
    const { apiRoute, pledgeAmount, hasBacked } = this.state;
    const { projectId } = this.props;
    e.preventDefault();
    axios
      .post(apiRoute, {
        projectId,
        hasBacked,
        pledgeAmount: Number(pledgeAmount)
      })
      .then(() => axios.get(apiRoute + projectId))
      .then(({ data }) => {
        const { goal, pledged, backerCount } = data;
        this.setState({
          pledged: addCommas(pledged),
          backerCount: addCommas(backerCount),
          fundedRatio: `${Math.min(
            Math.ceil((pledged / goal) * (window.innerWidth * 0.35 * 0.8)),
            window.innerWidth * 0.35 * 0.8
          )}px`,
          pledgeAmount: '',
          hasBacked: true
        });
      });
  }

  handleChange(e) {
    this.setState({
      pledgeAmount: e.target.value,
      isValidNumber: isValidNum(e.target.value)
    });
  }

  render() {
    const {
      pledged,
      pledgeAmount,
      fundedRatio,
      goal,
      backerCount,
      daysLeft,
      isValidNumber
    } = this.state;
    return (
      <div className="component">
        <div className="progressBar" style={{ width: fundedRatio }} />
        <div className="progressBackground" />
        <div className="pledgedAmount">${pledged}</div>
        <div className="subText">pledged of ${goal} goal</div>
        <div className="secondaryStats">{backerCount}</div>
        <div className="subText">backers</div>
        <div className="secondaryStats">{daysLeft}</div>
        <div className="subText">days left</div>
        <form className="input-icon">
          <input
            className="pledgeInput"
            type="number"
            name="pledgeAmount"
            min="0"
            max="1000000"
            value={pledgeAmount}
            onChange={this.handleChange}
          />
          <i className="bling">$</i>
        </form>
        <input
          className="pledgeButton"
          type="submit"
          name="pledge_submit"
          value="Make A Pledge"
          onClick={this.handleClick}
          disabled={!isValidNumber}
        />
      </div>
    );
  }
}
