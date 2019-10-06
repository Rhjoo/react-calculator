import React from 'react';

function NumberButton(props) {
  return (
    <button className="button" onClick={() => props.handleNumberClick(props.value)}>
      {props.children}
    </button>
  );
};

export default NumberButton;