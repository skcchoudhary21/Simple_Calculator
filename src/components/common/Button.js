import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }, props) => {
    const { textStyle, inputButtonStyle, inputButtonHighlighted, inputButtonBigStyle, textWhiteStyle, inputButtonHeighStyle } = styles;
    return (
    <TouchableOpacity 
        style={[
            (children === 0) ? inputButtonBigStyle : inputButtonStyle,
        props.highlight ? inputButtonHighlighted : null,
        (children === '×' || children === '÷' || children === '-' || children === '+' || children === '=' || children === 'C' || children === 'CE' || children === '+/-')
        ? inputButtonHeighStyle : null]}
        underlayColor="#193441" onPress={onPress}
    >
        <Text 
        style={[textStyle, 
            (children === '×' || children === '÷' || children === '-' || children === '+' || children === '=' || 
            children === 'C' || children === 'CE' || children === '+/-')
             ? textWhiteStyle : textStyle]}
        >
           {children}</Text>    
    </TouchableOpacity>
    );
};

const styles = {
    inputButtonHeighStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#91AA9D',
        borderRadius: 50,
        backgroundColor: '#faa89a',
        marginTop: 11,
        marginBottom: 11,
        marginLeft: 8,
        marginRight: 8,
       
    },
    inputButtonStyle: {
        marginTop: 11,
        marginBottom: 11,
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#91AA9D',
        borderRadius: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
         elevation: 1,
    },
    inputButtonBigStyle: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 8,
        marginRight: 8,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#91AA9D',
        borderRadius: 60,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1,
    },
    textStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#f74f32'
    },
    textWhiteStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },
};

export default Button;
