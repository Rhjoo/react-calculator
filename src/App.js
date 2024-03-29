import React, { useState, useEffect } from 'react';
import './App.css';
import uuid from 'uuid/v1';
import { Scrollbar } from 'react-scrollbars-custom';

import EquationsList from './components/EquationsList';
import View from './components/View';
import NumberButton from './components/NumberButton';
import OperatorButton from './components/OperatorButton';
import DotButton from './components/DotButton';
import BigEqualButton from './components/BigEqualButton';
import BigClearButton from './components/BigClearButton';
import AllClearButton from './components/AllClearButton';

function App() {
  const [inputState, setInputState] = useState("0");
  const [operator, setOperator] = useState();
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [equalSign, setEqualSign] = useState();
  const [equation, setEquation] = useState();  
  const [result, setResult] = useState();  
  const [storeEquations, setStoreEquations] = useState([]);  
  const [tempOperator, setTempOperator] = useState();

  const handleNumberClick = (value) => {
    if (firstNumber === undefined) {
      if (inputState[1] !== ".") {
        setInputState(inputState.replace(/^0+/, "") + value);
      } else {
        setInputState(inputState + value);
      };
    } else {
      if (operator !== undefined) {
        if (inputState[1] !== ".") {
          setInputState(inputState.replace(/^0+/, "") + value);
        } else {
          setInputState(inputState + value);
        };
      };
    };
  };

  const handleFirstEnterClick = () => {
    // will run only if there's something in inputState
    if (inputState !== "") {
      setFirstNumber(inputState);
    };
  };

  const handleSecondEnterClick = () => {
    // will run only if there's something in inputState
    if (inputState !== "") {
      setSecondNumber(inputState);
    };
  };

  const handleDotClick = (value) => {
    if (firstNumber === undefined) {
      if (inputState.slice(-1) !== "." && !inputState.includes(".")) {
        setInputState(inputState + value);
      };
    } else if (operator !== undefined) {
      if (inputState.slice(-1) !== "." && !inputState.includes(".")) {
        if (inputState === "") {
          setInputState(inputState + "0" + value);
        } else {
          setInputState(inputState + value);
        };
      };
    };
  };

  const handleBigOperatorClick = (value) => {
    // when nothing in firstNumber slot
    if (firstNumber === undefined) {
      handleFirstEnterClick();
      handleOperatorClick(value);
      handleBigEqualClick();
    };
    // there's something in firstNumber
    // and if there's no operator
    if (operator === undefined) {
      handleOperatorClick(value);
      inputClearClickToEmpty();
    } else {
      // if there's an operator
      // and if there's something in the secondNumber slot
      if (inputState !== "") {
        setTempOperator(value);
        handleBigEqualClick();
      } else {
        handleOperatorClick(value);
      };
    };
  };
  
  const handleBigEqualClick = () => {
    if (operator !== undefined) {
      handleSecondEnterClick();
    };
  };

  const bigClearClick = () => {
    if (operator !== undefined && inputState !== "") {
      inputClearClickToEmpty();
    } else {
      inputClearClickToZero();
      equationClearClick();
    };
  };

  const allClearClick = () => {
    bigClearClick();
    setStoreEquations([]);
  };

  const handleOperatorClick = (value) => {
    if (inputState !== "" || firstNumber !== undefined) {
      setOperator(value);
    };
  };
  
  const handleMakeEquationClick = () => {
    setEquation({
      id: uuid(),
      firstNumber: firstNumber,
      operator: operator,
      secondNumber: secondNumber,
      result: result
    });
  };

  const doMathClick = () => {
    const largerDecimalDigits = Math.max(decimalPlaces(firstNumber), decimalPlaces(secondNumber));
    const sumDecimalDigits = decimalPlaces(firstNumber) + decimalPlaces(secondNumber);
    // setting max rounding decimal places to 8
    const roundTo8 = (value) => {
      return Number(Math.round(value+'e'+8)+'e-'+8);
    };
    switch(operator) {
      case "+":
        setResult(roundTo8((Number(firstNumber) + Number(secondNumber)).toFixed(largerDecimalDigits)));
        break;
      case "-":
        setResult(roundTo8((Number(firstNumber) - Number(secondNumber)).toFixed(largerDecimalDigits)));
        break;
      case "x":
        setResult(roundTo8((Number(firstNumber) * Number(secondNumber)).toFixed(sumDecimalDigits)));
        break;
      case "÷":
        setResult(roundTo8((Number(firstNumber) / Number(secondNumber))));
        break;
      default:  
    };
  };

  // copied from
  // https://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
  const decimalPlaces = (num) => {
    const match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };

  const handleEqualClick = () => {
    setEqualSign("=");
    doMathClick();
  };
  
  useEffect(() => {
    if (secondNumber !== undefined) {
      handleEqualClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondNumber]);

  useEffect(() => {
    if (result !== undefined) {
      handleMakeEquationClick();
    }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  
  useEffect(() => {
    if (equation !== undefined) {
      storeEquationsClick();
      inputClearClickToEmpty();
      const temp = result;
      equationClearClick();
      setFirstNumber(temp);
      setOperator(tempOperator);
      setTempOperator(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equation]);

  const inputClearClickToZero = () => {
    setInputState("0");
  };
  
  const inputClearClickToEmpty = () => {
    setInputState("");
  };

  const equationClearClick = () => {
    setFirstNumber(undefined);
    setOperator(undefined);
    setSecondNumber(undefined);
    setEqualSign(undefined);
    setResult(undefined);
  };

  const storeEquationsClick = () => {
    setStoreEquations([...storeEquations, equation]);
  };

  return (
    <div className="App">
      <div className="calc-wrapper">
        <div className="display">
          <Scrollbar>
            <EquationsList storeEquations={storeEquations} />
            <View inputState={inputState} firstNumber={firstNumber} operator={operator} secondNumber={secondNumber} equalSign={equalSign} result={result} />
          </Scrollbar>
        </div>
        <div className="number-buttons">
          <div className="row">
            <NumberButton value={7} handleNumberClick={handleNumberClick}>7</NumberButton> 
            <NumberButton value={8} handleNumberClick={handleNumberClick}>8</NumberButton> 
            <NumberButton value={9} handleNumberClick={handleNumberClick}>9</NumberButton> 
            <BigClearButton bigClearClick={bigClearClick} />
            <AllClearButton allClearClick={allClearClick} />
          </div>
          <div className="row">
            <NumberButton value={4} handleNumberClick={handleNumberClick}>4</NumberButton> 
            <NumberButton value={5} handleNumberClick={handleNumberClick}>5</NumberButton> 
            <NumberButton value={6} handleNumberClick={handleNumberClick}>6</NumberButton> 
            <OperatorButton value={"x"} handleBigOperatorClick={handleBigOperatorClick}>x</OperatorButton> 
            <OperatorButton value={"÷"} handleBigOperatorClick={handleBigOperatorClick}>÷</OperatorButton> 
          </div>
          <div className="row">
            <NumberButton value={1} handleNumberClick={handleNumberClick}>1</NumberButton> 
            <NumberButton value={2} handleNumberClick={handleNumberClick}>2</NumberButton> 
            <NumberButton value={3} handleNumberClick={handleNumberClick}>3</NumberButton> 
            <OperatorButton value={"+"} handleBigOperatorClick={handleBigOperatorClick}>+</OperatorButton> 
            <OperatorButton value={"-"} handleBigOperatorClick={handleBigOperatorClick}>-</OperatorButton> 
          </div>
          <div className="last-row">
            <NumberButton className="zero" value={0} handleNumberClick={handleNumberClick}>0</NumberButton> 
            <DotButton value={"."} handleDotClick={handleDotClick}>.</DotButton> 
            <BigEqualButton handleBigEqualClick={handleBigEqualClick}>=</BigEqualButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

