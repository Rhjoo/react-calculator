import React from 'react';

function BigEqualButton(props) {
  return (
    <button id="equal-sign" onClick={() => props.handleBigEqualClick()}>
      =
    </button>
  );
};

export default BigEqualButton;