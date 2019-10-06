import React from 'react';

function View(props) {
  const { inputState, firstNumber, operator, secondNumber, equalSign, result } = props;
  if (firstNumber === undefined) {
    return (
      <div className="view">
        {inputState}
      </div>
    )
  } else {
    if (secondNumber === undefined) {
      return (
        <div className="view">
          {firstNumber} {operator} {inputState} {equalSign} {result}
        </div>
      )
    } else {
      return (
        <div className="view">
          {firstNumber} {operator} {secondNumber} {equalSign} {result}
        </div>
      )
    }
  };
};

export default View;
