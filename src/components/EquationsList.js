import React from 'react';
import Equation from './Equation';


function EquationsList(props) {
  return (
    <div className="equation-list">
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

export default EquationsList;