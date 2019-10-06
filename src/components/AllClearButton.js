import React from 'react';

function AllClearButton(props) {
  return (
    <button id="all-clear" onClick={() => props.allClearClick()}>
      AC
    </button>
  );
};

export default AllClearButton;

