import React from 'react';

function BigClearButton(props) {
  return (
    <button id="clear" onClick={() => props.bigClearClick()}>
      C
    </button>
  );
};

export default BigClearButton;