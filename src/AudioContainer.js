import React, { Component } from 'react';
import Oscillator from './Oscillator';
import Store from './Store'

class AudioContainer extends Component {
	render() {
		return (
			<div>
				<p>::: Oscillations ::</p>
				{ Store.DefaultFrequencies.map((freq, i) => (
					<Oscillator
						index={i}
						key={ `tone_${freq}` }
						frequency={ freq }
					/>
				)) }
			</div>
		);
	}
}

export default AudioContainer;
