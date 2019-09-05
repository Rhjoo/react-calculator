import React, { useState } from 'react';
import uuid from 'uuid/v1';

function App() {
  const [inputState, setInputState] = useState("");
  const [operator, setOperator] = useState();
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [equalSign, setEqualSign] = useState();
  const [equation, setEquation] = useState();  
  const [result, setResult] = useState();  
  const [storeEquations, setStoreEquations] = useState([]);  

  const handleNumberClick = (value) => {
    setInputState(inputState + value);
  };
  
  const handleDotClick = (value) => {
    if (inputState.slice(-1) !== ".") {
      setInputState(inputState + value);
    }
  };
  
  const handleFirstEnterClick = () => {
    setFirstNumber(inputState);
  };
  
  const handleSecondEnterClick = () => {
    setSecondNumber(inputState);
  };
  
  const handleOperatorClick = (value) => {
    if (inputState !== "") {
      setOperator(value);
    }
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
        setResult(Number(firstNumber) + Number(secondNumber));
        break;
      case "-":
        setResult(Number(firstNumber) - Number(secondNumber));
        break;
      case "x":
        setResult(Number(firstNumber) * Number(secondNumber));
        break;
      case "÷":
        setResult(Number(firstNumber) / Number(secondNumber));
        break;
      default:  
    };
  };

  const handlePlusClick = (value) => {
    handleFirstEnterClick();
    handleOperatorClick(value);
    inputClearClick();
  };

  const handleEqualClick = () => {
    setEqualSign("=")
    doMathClick();
  };

  const inputClearClick = () => {
    setInputState("");
  };

  const equationClearClick = () => {
    setFirstNumber("");
    setOperator("");
    setSecondNumber("");
    setEqualSign("");
    setResult("");
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
      <DotButton value={"."} handleDotClick={handleDotClick}>.</DotButton> 
      <br />
      <OperatorButton value={"+"} handleOperatorClick={handleOperatorClick}>+</OperatorButton> 
      <OperatorButton value={"-"} handleOperatorClick={handleOperatorClick}>-</OperatorButton>
      <OperatorButton value={"x"} handleOperatorClick={handleOperatorClick}>x</OperatorButton>
      <OperatorButton value={"÷"} handleOperatorClick={handleOperatorClick}>÷</OperatorButton>
      <EqualButton handleEqualClick={handleEqualClick}>=</EqualButton>
      <br />
      <PlusButton value={"+"} handlePlusClick={handlePlusClick}><strong>+</strong></PlusButton> 
      <br />
      <FirstEnterButton handleFirstEnterClick={handleFirstEnterClick} />
      <SecondEnterButton handleSecondEnterClick={handleSecondEnterClick} />
      <DoMathButton doMathClick={doMathClick} />
      <MakeEquationButton handleMakeEquationClick={handleMakeEquationClick} />
      <StoreEquationsButton storeEquationsClick={storeEquationsClick} />
      <InputClearButton inputClearClick={inputClearClick} />
      <EquationClearButton equationClearClick={equationClearClick} />
      <br />
      {inputState} 
      <br />
      {firstNumber} {operator} {secondNumber} {equalSign} {result}
      <View inputState={inputState} firstNumber={firstNumber} operator={operator} secondNumber={secondNumber} equalSign={equalSign} result={result} />
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

function PlusButton(props) {
  return (
    <button onClick={() => props.handlePlusClick(props.value)}>
      {props.children}
    </button>
  );
};

function DotButton(props) {
  return (
    <button onClick={() => props.handleDotClick(props.value)}>
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
      Clear Input
    </button>
  );
};

function EquationClearButton(props) {
  return (
    <button onClick={() => props.equationClearClick()}>
      Clear Equation
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
      {props.storeEquations.map(
        equation => <Equation key={equation.id} 
                              firstNumber={equation.firstNumber} 
                              operator={equation.operator} 
                              secondNumber={equation.secondNumber} 
                              result={equation.result} />
      )}
    </div>
  );
};

function Equation(props) {
  return (
    <li>
      {props.firstNumber} {props.operator} {props.secondNumber} = {props.result}
    </li>
  );
};

function EqualButton(props) {
  return (
    <button onClick={() => props.handleEqualClick()}>
      =
    </button>
  );
};

function View(props) {
  const { inputState, firstNumber, operator, secondNumber, equalSign, result } = props;

  if (firstNumber === undefined) {
    return (
      <div>
        {inputState}
      </div>
    )
  } else {
    if (secondNumber === undefined) {
      return (
        <div>
          {firstNumber} {operator} {inputState} {equalSign} {result}
        </div>
      )
    } else {
      return (
        <div>
          {firstNumber} {operator} {secondNumber} {equalSign} {result}
        </div>
      )
    }
  }
};

export default App;

