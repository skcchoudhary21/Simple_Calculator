'use strict';
const initialState = {
    previousInputValue: 0,
    inputValue: 0,
    selectedSymbol: null
};
function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    const calculation = [];
    let current = '';
    for (let i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current !== '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{ '^': (a, b) => Math.pow(a, b) },
               { '*': (a, b) => a * b, '/': (a, b) => a / b },
               { '+': (a, b) => a + b, '-': (a, b) => a - b }],
        newCalc = [],
        currentOp;
    for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}
export default function calculationReducer(state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case 'OPERATION':
          state = {
                selectedSymbol: action.payload.Operation,
                previousInputValue: state.inputValue,
                inputValue: 0
            };
            break;
        case 'NUMBER':
            if (state.inputValue === action.payload.value) {
                break;
            }
            let value;
            if (state.resultCal) {
                value = `${(0) + action.payload.value}`;
            } else {
                value = `${(state.inputValue) + action.payload.value}`;
            }
            value = value.substr(0, 12);
            state = {
                selectedSymbol: state.selectedSymbol,
                previousInputValue: state.previousInputValue,
                inputValue: value
            };
           
            break;
        case 'DECIMAL':
            if ((`${state.inputValue}`).indexOf('.') > -1) {
                break;
            }
            state = {
                selectedSymbol: state.selectedSymbol,
                previousInputValue: state.previousInputValue,
                inputValue: `${state.inputValue + action.payload.value}`
            };
            break;

        case 'SIGN':
            if (action.payload.value === '=') {
                const symbol = state.selectedSymbol;
                 const inputValue = state.inputValue;
                  const previousInputValue = state.previousInputValue;
                if (!symbol) {
                    return state; 
                }
                console.log(state);
               let result = `${calculate(parseCalculationString(previousInputValue + symbol + inputValue))}`;
               result = result.substr(0, 12);
                state = {
                    previousInputValue: previousInputValue,
                    inputValue: result,
                    selectedSymbol: state.selectedSymbol,
                    resultCal: true
                };
            } else if (action.payload.value === 'C') {
                state = { 
                    selectedSymbol: state.selectedSymbol,
                    previousInputValue: state.previousInputValue,
                    inputValue: 0
                };
                break;
            } else if (action.payload.value === 'CE') {
                state = initialState;
                break;
            }
            console.log(state);
            break;
            default:
            break;
    }
    
    return state;
}
