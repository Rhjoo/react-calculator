import React, { useState } from 'react';
import uuid from 'uuid/v1';
import { type } from 'os';

function App() {
  const [inputState, setInputState] = useState("");
  const [operator, setOperator] = useState();
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [equation, setEquation] = useState();  
  const [result, setResult] = useState();  

  const handleNumberClick = (value) => {
    setInputState(inputState + value);
  };
  
  const handleFirstEnterClick = () => {
    setFirstNumber(inputState);
  };
  
  const handleSecondEnterClick = () => {
    setSecondNumber(inputState);
  };
  
  const handleOperatorClick = (value) => {
    setOperator(value);
  };

  const handleMakeEquationClick = () => {
    setEquation({
      id: uuid(),
      firstNumber: firstNumber,
      opeprator: operator,
      secondNumber: secondNumber
    })
  }

  const addMathClick = () => {
    setResult(parseInt(firstNumber) + parseInt(secondNumber));
  }

  return (
    <div className="App">
      <NumberButton value={7} handleNumberClick={handleNumberClick} />
      <OperatorButton value={"+"} handleOperatorClick={handleOperatorClick} />
      <FirstEnterButton handleFirstEnterClick={handleFirstEnterClick} />
      <SecondEnterButton handleSecondEnterClick={handleSecondEnterClick} />
      <MakeEquationButton handleMakeEquationClick={handleMakeEquationClick} />
      <AddMathButton addMathClick={addMathClick} />
      <br />
      {inputState} 
      <br />
      {firstNumber} {operator} {secondNumber} = {result}
    </div>
  );
};

function NumberButton(props) {
  return (
    <button onClick={() => props.handleNumberClick(props.value)}>
      7
    </button>
  );
};

function OperatorButton(props) {
  return (
    <button onClick={() => props.handleOperatorClick(props.value)}>
      +
    </button>
  );
};

function FirstEnterButton(props) {
  return (
    <button onClick={() => props.handleFirstEnterClick()}>
      Enter First Number
    </button>
  );
};

function SecondEnterButton(props) {
  return (
    <button onClick={() => props.handleSecondEnterClick()}>
      Enter Second Number
    </button>
  );
};

function MakeEquationButton(props) {
  return (
    <button onClick={() => props.handleMakeEquationClick()}>
      Make Equation
    </button>
  );
};

function AddMathButton(props) {
  return (
    <button onClick={() => props.addMathClick()}>
      Do the Math!
    </button>
  )
}

export default App;

