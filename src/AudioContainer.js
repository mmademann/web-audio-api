import React from 'react';
import Oscillator from './Oscillator';
import Store from './Store'

function AudioContainer() {
	return (
		<div>
			<p>::: Oscillations ::</p>

			{
				Store.Frequencies.map((freq, i) => (
					<Oscillator
						index={i}
						key={ `tone_${freq}` }
						frequency={ freq }
					/>
				))
			}
		</div>
	);
}

export default AudioContainer;
