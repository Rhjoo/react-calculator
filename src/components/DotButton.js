import React from 'react';

function DotButton(props) {
  return (
    <button id="dot" onClick={() => props.handleDotClick(props.value)}>
      {props.children}
    </button>
  );
};

export default DotButton;