import React from 'react';
import ReactDOM from 'react-dom';
import Oscillator from './Oscillator';

it('renders without crashing', () => {
  	const div = document.createElement('div');
  	ReactDOM.render( <Oscillator key="t400" frequency="400"/>, div);
  	ReactDOM.unmountComponentAtNode(div);
});
