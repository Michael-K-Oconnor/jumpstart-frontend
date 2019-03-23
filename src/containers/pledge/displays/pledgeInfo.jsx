import React from 'react';
import PropTypes from 'prop-types';

const PledgeInfo = props => {
  const { fundedRatio, pledged, goal, backerCount, daysLeft } = props;
  return (
    <div>
      <div className="progressBar" style={{ width: fundedRatio }} />
      <div className="progressBackground" />
      <div className="pledgedAmount">${pledged}</div>
      <div className="subText">pledged of ${goal} goal</div>
      <div className="secondaryStats">{backerCount}</div>
      <div className="subText">backers</div>
      <div className="secondaryStats">{daysLeft}</div>
      <div className="subText">days left</div>
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
