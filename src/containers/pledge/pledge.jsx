import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addCommas, isValidPledgeAmount, calcFundedRatio } from 'utils/utils';
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

  async componentDidMount() {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      const { data } = await axios.get(apiRoute + projectId);
      const { goal, pledged, backerCount, daysLeft } = data;
      this.setState({
        goal,
        pledged,
        backerCount,
        daysLeft,
        fundedRatio: calcFundedRatio(pledged, goal),
        hasData: true
      });
    } catch {
      console.log('Looks like there was an error with the pledge component');
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      const { apiRoute } = this.state;
      const { projectId } = this.props;
      if (projectId !== prevProps.projectId) {
        const { data } = await axios.get(apiRoute + projectId);
        const { goal, pledged, backerCount, daysLeft } = data;
        this.setState({
          goal,
          pledged,
          backerCount,
          daysLeft,
          fundedRatio: calcFundedRatio(pledged, goal),
          hasBacked: false
        });
      }
    } catch {
      console.log('Looks like there was an error with the pledge component');
    }
  }

  async handleSubmit(e, pledgeAmount) {
    try {
      const { apiRoute, hasBacked } = this.state;
      const { projectId } = this.props;
      await axios.post(apiRoute, {
        projectId,
        hasBacked,
        pledgeAmount: Number(pledgeAmount)
      });
      const { data } = await axios.get(apiRoute + projectId);
      const { goal, pledged, backerCount } = data;
      this.setState({
        pledged,
        backerCount,
        fundedRatio: calcFundedRatio(pledged, goal),
        hasBacked: true
      });
    } catch {
      console.log('Looks like there was an error with the pledge component');
    }
  }

  render() {
    const { pledged, fundedRatio, goal, backerCount, daysLeft, hasData } = this.state;
    return (
      <div className="component">
        {hasData && (
          <PledgeInfo
            fundedRatio={fundedRatio}
            pledged={addCommas(pledged)}
            goal={addCommas(goal)}
            backerCount={addCommas(backerCount)}
            daysLeft={addCommas(daysLeft)}
          />
        )}
        <PledgeForm
          handleSubmit={this.handleSubmit}
          name="PledgeForm"
          isValidInput={isValidPledgeAmount}
          defaultValue="10"
          min="0"
          max="1000000"
        />
      </div>
    );
  }
}
