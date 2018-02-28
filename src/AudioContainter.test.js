import React from 'react';
import ReactDOM from 'react-dom';
import AudioContainer from './AudioContainer';

it('renders without crashing', () => {
  	const div = document.createElement('div');
  	ReactDOM.render(<Audio />, div);
  	ReactDOM.unmountComponentAtNode(div);
});
