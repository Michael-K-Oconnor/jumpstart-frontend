import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addCommas, isValidNum } from './helpers';
import PledgeInfo from './displays/pledgeInfo';
import PledgeForm from './displays/pledgeForm';
import './pledge.css';

export default class Pledge extends React.Component {
  static propTypes = {
    projectId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      apiRoute: `${window.location.origin}/api/projects/`,
      hasBacked: false,
      fundedRatio: '0px',
      hasData: false
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
        )}px`,
        hasData: true
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
          hasBacked: false
        });
      });
    }
  }

  handleSubmit(e, pledgeAmount) {
    const { apiRoute, hasBacked } = this.state;
    const { projectId } = this.props;
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
          hasBacked: true
        });
      });
  }

  render() {
    const { pledged, fundedRatio, goal, backerCount, daysLeft, hasData } = this.state;
    return (
      <div className="component">
        {hasData && (
          <PledgeInfo
            fundedRatio={fundedRatio}
            pledged={pledged}
            goal={goal}
            backerCount={backerCount}
            daysLeft={daysLeft}
          />
        )}
        <PledgeForm
          handleSubmit={this.handleSubmit}
          name="PledgeForm"
          isValidInput={isValidNum}
          defaultValue="10"
          min="0"
          max="1000000"
        />
      </div>
    );
  }
}
