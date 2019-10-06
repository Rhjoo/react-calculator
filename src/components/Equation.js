import React from 'react'

function Equation(props) {
  return (
    <li>
      {props.firstNumber} {props.operator} {props.secondNumber} = {props.result}
    </li>
  );
};

export default Equation;
