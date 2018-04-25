//Importing the library
import React from 'react';
import { Text,
    StyleSheet,
    View } from 'react-native';

// Create a components
const Header = (props) => {
    const { textStyle, viewStyle } = style;
    return (
        <View style={viewStyle}> <Text style={textStyle}>{props.headerText}</Text></View>
    );
};

const style = StyleSheet.create({
    textStyle: {
        fontSize: 20,
    },
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,

    }
});


//Make available to other parts of the app

export default Header;
