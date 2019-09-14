import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';

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
      setInputState(inputState + value);
    } else {
      if (operator !== undefined) {
        setInputState(inputState + value);
      }
    }
  };

  const handleBigButtonClick = (value) => {
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
      }
    };
  };
  
  const handleFirstEnterClick = () => {
    // will run only if there's something in inputState
    if (inputState !== "") {
      setFirstNumber(inputState);
    }
  };

  const handleBigEqualClick = () => {
    if (operator !== undefined) {
      handleSecondEnterClick();
    }
  };

  const handleDotClick = (value) => {
    if (firstNumber === undefined) {
      if (inputState.slice(-1) !== "." && !inputState.includes(".")) {
        setInputState(inputState + value);
      }
    } else if (operator !== undefined) {
      if (inputState.slice(-1) !== "." && !inputState.includes(".")) {
        setInputState(inputState + value);
      }
    }
  };
   
  const handleSecondEnterClick = () => {
    // will run only if there's something in inputState
    if (inputState !== "") {
      setSecondNumber(inputState);
    }
  };
  
  const handleOperatorClick = (value) => {
    if (inputState !== "" || firstNumber !== undefined) {
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
    const largerDecimalDigits = Math.max(decimalPlaces(firstNumber), decimalPlaces(secondNumber));
    const sumDecimalDigits = decimalPlaces(firstNumber) + decimalPlaces(secondNumber);
    switch(operator) {
      case "+":
        setResult((Number(firstNumber) + Number(secondNumber)).toFixed(largerDecimalDigits));
        break;
      case "-":
        setResult((Number(firstNumber) - Number(secondNumber)).toFixed(largerDecimalDigits));
        break;
      case "x":
        setResult((Number(firstNumber) * Number(secondNumber)).toFixed(sumDecimalDigits));
        break;
      case "÷":
        setResult((Number(firstNumber) / Number(secondNumber)).toFixed(sumDecimalDigits));
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

  const bigClearClick = () => {
    inputClearClickToZero();
    equationClearClick();
  };

  const allClearClick = () => {
    bigClearClick();
    setStoreEquations([]);
  }

  return (
    <div className="App">
      <EquationsList storeEquations={storeEquations} />
      <View inputState={inputState} firstNumber={firstNumber} operator={operator} secondNumber={secondNumber} equalSign={equalSign} result={result} />
      <br />
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
      <PlusButton value={"+"} handlePlusClick={handleBigButtonClick}><strong>+</strong></PlusButton> 
      <PlusButton value={"-"} handlePlusClick={handleBigButtonClick}><strong>-</strong></PlusButton> 
      <PlusButton value={"x"} handlePlusClick={handleBigButtonClick}><strong>x</strong></PlusButton> 
      <PlusButton value={"÷"} handlePlusClick={handleBigButtonClick}><strong>÷</strong></PlusButton> 
      <BigEqualButton handleBigEqualClick={handleBigEqualClick}><strong>=</strong></BigEqualButton>
      <BigClearButton bigClearClick={bigClearClick} />
      <AllClearButton allClearClick={allClearClick} />
      <br />
      <FirstEnterButton handleFirstEnterClick={handleFirstEnterClick} />
      <SecondEnterButton handleSecondEnterClick={handleSecondEnterClick} />
      <DoMathButton doMathClick={doMathClick} />
      <MakeEquationButton handleMakeEquationClick={handleMakeEquationClick} />
      <StoreEquationsButton storeEquationsClick={storeEquationsClick} />
      <InputClearButton inputClearClickToEmpty={inputClearClickToEmpty} />
      <EquationClearButton equationClearClick={equationClearClick} />
      <br />
      {/* {inputState}  */}
      <br />
      {/* {firstNumber} {operator} {secondNumber} {equalSign} {result} */}
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
    <button onClick={() => props.inputClearClickToEmpty()}>
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

function BigEqualButton(props) {
  return (
    <button onClick={() => props.handleBigEqualClick()}>
      =
    </button>
  );
};

function BigClearButton(props) {
  return (
    <button onClick={() => props.bigClearClick()}>
      Clear
    </button>
  );
};

function AllClearButton(props) {
  return (
    <button onClick={() => props.allClearClick()}>
      All Clear
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

