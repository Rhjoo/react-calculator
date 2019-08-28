import React, { useState } from 'react';

function App() {
  const [inputState, setInputState] = useState("");
  const [operator, setOperator] = useState();
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [equation, setEquation] = useState();  

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
      firstNumber: firstNumber,
      opeprator: operator,
      secondNumber: secondNumber
    })
  }

  return (
    <div className="App">
      <NumberButton value={7} handleNumberClick={handleNumberClick} />
      <OperatorButton value={"+"} handleOperatorClick={handleOperatorClick} />
      <FirstEnterButton handleFirstEnterClick={handleFirstEnterClick} />
      <SecondEnterButton handleSecondEnterClick={handleSecondEnterClick} />
      <MakeEquationButton handleMakeEquationClick={handleMakeEquationClick} />
      <br />
      {inputState} 
      <br />
      {firstNumber} {operator} {secondNumber}
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

export default App;

