import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import Button from './common/Button';
import { handleNumberInput, handleSignInput, handleDecimalInput, handleOperationInput }
from '../actions';

const Types = {
    NUMBER: 'NUMBER',
    DECIMAL: 'DECIMAL',
    SIGN: 'SIGN',
    OPERATION: 'OPERATION'
  };
  const Operations = {
    OPERATION_DIVIDE: '/',
    OPERATION_SUBTRACT: '-',
    OPERATION_ADD: '+',
    OPERATION_MULTIPLY: '*',
    OPERATION_INPUT: '',
    OPERATION_CE: 'CE',
    OPERATION_C: 'C',
    OPERATION_EQAULS: '=',
    OPERATION_PLUS_MINUS: '+/-',
  };

const inputButtons = [
    [{ value: 'CE', type: Types.SIGN, Operation: Operations.OPERATION_CE },
        { value: 'C', type: Types.SIGN, Operation: Operations.OPERATION_C },
        { value: '+/-', type: Types.SIGN, Operation: Operations.OPERATION_PLUS_MINUS },
        { value: '÷', type: Types.OPERATION, Operation: Operations.OPERATION_DIVIDE }],
    [{ value: 7, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: 8, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: 9, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: '×', type: Types.OPERATION, Operation: Operations.OPERATION_MULTIPLY }],
    [{ value: 4, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: 5, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: 6, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: '-', type: Types.OPERATION, Operation: Operations.OPERATION_SUBTRACT }],
    [{ value: 1, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: 2, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: 3, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: '+', type: Types.OPERATION, Operation: Operations.OPERATION_ADD }],

    [{ value: 0, type: Types.NUMBER, Operation: Operations.OPERATION_INPUT },
        { value: '.', type: Types.DECIMAL, Operation: Operations.OPERATION_INPUT },
        { value: '=', type: Types.SIGN, Operation: Operations.OPERATION_EQAULS }],
];

class SimpleCalc extends Component {
    
    constructor(props) {
        super(props);

        this.initialState = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        };
        this.state = this.initialState;
    }

    renderButtons() {
        const { inputRowStyle } = styles;
        const views = inputButtons.map((row, rowIdx) => {
            const singleRow = row.map((inputButton, columnIdx) => (
            <Button
                    value={inputButton.value}
                    type={inputButton.value}
                    key={`b-${columnIdx}`}
                    onPress={() => {
                        if (inputButton.type === Types.NUMBER) {
                            this.props.handleNumberInput(inputButton);
                        } else if (inputButton.type === Types.DECIMAL) {
                            this.props.handleDecimalInput(inputButton);
                        } else if (inputButton.type === Types.SIGN) {
                            this.props.handleSignInput(inputButton);
                        } else if (inputButton.type === Types.OPERATION) {
                            this.props.handleOperationInput(inputButton);
                        }
                        }
                    }
            >{inputButton.value}</Button>));

            return <View style={inputRowStyle} key={`r-${rowIdx}`}>{singleRow}</View>;
        });
        return views;
    }
    render() {
        const { displayTextStyle, displayContainerStyle, inputContainerStyle, rootContainerStyle, displayContainer } = styles;
        const { calculate } = this.props;
        return (
            <View style={rootContainerStyle}>
                <View 
                style={displayContainerStyle}
                >
                    <View style={displayContainer}>
                        <Text style={displayTextStyle}>{calculate.inputValue}</Text>
                    </View>
                </View > 
                <View 
                style={inputContainerStyle}
                >
                    {this.renderButtons()}
                </View>
            </View>
        );
    }
}
const styles = {
    rootContainerStyle: {
        backgroundColor: '#f74f32',
        padding: 8,
        flex: 1,
      },
    displayTextStyle: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20,
       
    },
    inputRowStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    displayContainerStyle: {
        flex: 2,
        justifyContent: 'center',
    },
    displayContainer: {
        borderRadius: 50,
        height: 'auto',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 24,
        flex: 0.6,
        justifyContent: 'center',
        backgroundColor: '#de4a33',
    },
    inputContainerStyle: {
        backgroundColor: '#f74f32',
        flex: 6,
    },
};
const mapStateToProps = (state) => { 
    console.log(state);
    return { calculate: state.calculate };
};
const mapDispatchToProps = dispatch => ({
    handleNumberInput: payload => dispatch(handleNumberInput(payload)),
    handleDecimalInput: payload => dispatch(handleDecimalInput(payload)),
    handleSignInput: payload => dispatch(handleSignInput(payload)),
    handleOperationInput: payload => dispatch(handleOperationInput(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SimpleCalc);
