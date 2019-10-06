import React from 'react';

function OperatorButton(props) {
  return (
    <button className="operator" onClick={() => props.handleBigOperatorClick(props.value)}>
      {props.children}
    </button>
  );
};

export default OperatorButton;