import React from 'react';
import PropTypes from 'prop-types';

const PledgeInfo = props => {
  const { fundedRatio, pledged, goal, backerCount, daysLeft } = props;
  return (
    <div>
      <div className="progress">
        <div className="bar" style={{ width: fundedRatio }} />
        <div className="bar-background" />
      </div>
      <p className="stats pledged">${pledged}</p>
      <p className="sub-text">pledged of ${goal} goal</p>
      <p className="stats">{backerCount}</p>
      <p className="sub-text">backers</p>
      <p className="stats">{daysLeft}</p>
      <p className="sub-text">days left</p>
    </div>
  );
};

PledgeInfo.propTypes = {
  fundedRatio: PropTypes.string.isRequired,
  pledged: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  backerCount: PropTypes.string.isRequired,
  daysLeft: PropTypes.string.isRequired
};

export default PledgeInfo;
