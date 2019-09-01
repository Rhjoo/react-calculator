import React, { useState } from 'react';
import uuid from 'uuid/v1';

function App() {
  const [inputState, setInputState] = useState("");
  const [operator, setOperator] = useState();
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [equation, setEquation] = useState();  
  const [result, setResult] = useState();  
  const [storeEquations, setStoreEquations] = useState([]);  

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
      operator: operator,
      secondNumber: secondNumber,
      result: result
    })
  };

  const doMathClick = () => {
    switch(operator) {
      case "+":
        setResult(parseInt(firstNumber) + parseInt(secondNumber));
        break;
      case "-":
        setResult(parseInt(firstNumber) - parseInt(secondNumber));
        break;
      case "x":
        setResult(parseInt(firstNumber) * parseInt(secondNumber));
        break;
      case "÷":
        setResult(parseInt(firstNumber) / parseInt(secondNumber));
        break;
      default:  
    };
  };

  const inputClearClick = () => {
    setInputState("");
  };

  const storeEquationsClick = () => {
    setStoreEquations([...storeEquations, equation]);
  };

  return (
    <div className="App">
      <NumberButton value={1} handleNumberClick={handleNumberClick}>1</NumberButton> 
      <NumberButton value={2} handleNumberClick={handleNumberClick}>2</NumberButton> 
      <NumberButton value={3} handleNumberClick={handleNumberClick}>3</NumberButton> 
      <NumberButton value={4} handleNumberClick={handleNumberClick}>4</NumberButton> 
      <NumberButton value={5} handleNumberClick={handleNumberClick}>5</NumberButton> 
      <NumberButton value={6} handleNumberClick={handleNumberClick}>6</NumberButton> 
      <NumberButton value={7} handleNumberClick={handleNumberClick}>7</NumberButton> 
      <NumberButton value={8} handleNumberClick={handleNumberClick}>8</NumberButton> 
      <NumberButton value={9} handleNumberClick={handleNumberClick}>9</NumberButton> 
      <NumberButton value={0} handleNumberClick={handleNumberClick}>0</NumberButton> 
      <br />
      <OperatorButton value={"+"} handleOperatorClick={handleOperatorClick}>+</OperatorButton> 
      <OperatorButton value={"-"} handleOperatorClick={handleOperatorClick}>-</OperatorButton>
      <OperatorButton value={"x"} handleOperatorClick={handleOperatorClick}>x</OperatorButton>
      <OperatorButton value={"÷"} handleOperatorClick={handleOperatorClick}>÷</OperatorButton>
      <br />
      <FirstEnterButton handleFirstEnterClick={handleFirstEnterClick} />
      <SecondEnterButton handleSecondEnterClick={handleSecondEnterClick} />
      <DoMathButton doMathClick={doMathClick} />
      <MakeEquationButton handleMakeEquationClick={handleMakeEquationClick} />
      <StoreEquationsButton storeEquationsClick={storeEquationsClick} />
      <InputClearButton inputClearClick={inputClearClick} />
      <br />
      {inputState} 
      <br />
      {firstNumber} {operator} {secondNumber} = {result}
      <EquationsList storeEquations={storeEquations} />
    </div>
  );
};

function NumberButton(props) {
  return (
    <button onClick={() => props.handleNumberClick(props.value)}>
      {props.children}
    </button>
  );
};

function OperatorButton(props) {
  return (
    <button onClick={() => props.handleOperatorClick(props.value)}>
      {props.children}
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

function DoMathButton(props) {
  return (
    <button onClick={() => props.doMathClick()}>
      Do the Math!
    </button>
  );
};

function InputClearButton(props) {
  return (
    <button onClick={() => props.inputClearClick()}>
      Clear
    </button>
  );
};

function StoreEquationsButton(props) {
  return (
    <button onClick={() => props.storeEquationsClick()}>
      Store equation
    </button>
  );
};

function EquationsList(props) {
  return (
    <div>
      {props.storeEquations.map(equation => <Equation key={equation.id} 
                                                      firstNumber={equation.firstNumber} 
                                                      operator={equation.operator} 
                                                      secondNumber={equation.secondNumber} 
                                                      result={equation.result} />)}
    </div>
  );
};

function Equation(props) {
  return (
    <li>
      {props.firstNumber} {props.operator} {props.secondNumber} = {props.result}
    </li>
  )
}

export default App;

