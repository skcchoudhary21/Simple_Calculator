import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SimpleCalc from '../components/simpleCalc';
import calculationReducer from '../reducers';

export class Index extends Component {
  render() {
    return (
      <Provider store={createStore(calculationReducer)}>
        <SimpleCalc />
      </Provider>
    );
  }
}
export default Index;
