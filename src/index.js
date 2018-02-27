import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// find the correct Audio Context from the browser
const audioContext = window.AudioContext || window.webkitAudioContext || null;

// AudioContext constant - contains all audio and oscillator nodes
const AUDIO_CONTEXT = new audioContext();

// returns the oscillator controls
const Controls = (props) => (
	<div>
		<div className="control-row">
			Oscillator
			<button onClick={props.startOscillator}>Start</button>
			<button onClick={props.stopOscillator}>Stop</button>
		</div>
		<div className="control-row">
			Waveform
			<button value="sine" onClick={props.waveType}>Sine</button>
			<button value="sawtooth" onClick={props.waveType}>Sawtooth</button>
			<button value="triangle" onClick={props.waveType}>Triangle</button>
			<button value="square" onClick={props.waveType}>Square</button>
		</div>
		<div className="control-row">
				<p>Frequency:</p>
				<input
					type="range" min="100" max="1450"
					defaultValue={props.frequency}
					onInput={props.changeFrequency}>
				</input>
		</div>
		<div className="control-row">
				<p>Fine Tune:</p>
				<input
					type="range" min="-100" max="100"
					defaultValue="100"
					onInput={props.finetuneFrequency}>
				</input>
		</div>
	</div>
);

// oscillator component w/ audio controls
class Oscillator extends React.Component {

	oscillator = null;

	// stops the oscillator if removed
	componentWillUnmount() {
		if (this.oscillator) this.oscillator.stop();
	};

	// creates the oscillator
	startOscillator = () => {
		AUDIO_CONTEXT.resume();
		if (this.oscillator) this.oscillator.stop();
		this.oscillator = AUDIO_CONTEXT.createOscillator();
		this.oscillator.frequency.setValueAtTime(this.props.frequency, AUDIO_CONTEXT.currentTime);
		this.oscillator.connect(AUDIO_CONTEXT.destination);
		this.oscillator.start();
	};

	// stops the oscillator
	stopOscillator = () => {
		if (this.oscillator) this.oscillator.stop();
	};

	// changes the wave type of the oscillator
	waveType = (event) => {
		if (this.oscillator) this.oscillator.type = event.target.value;
	};

	// slides through different frequencies
	changeFrequency = (event) => {
		if (this.oscillator) this.oscillator.frequency.setValueAtTime(Math.pow(2, event.target.value / 100), AUDIO_CONTEXT.currentTime);
	};

	// fine tunes the frequency
	finetuneFrequency = (event) => {
		if (this.oscillator) this.oscillator.detune.setValueAtTime(event.target.value, AUDIO_CONTEXT.currentTime);
	};

	render() {
		return (
			<div className="oscillator-row">
				<Controls
					frequency={ this.props.frequency }
					startOscillator={ this.startOscillator }
					stopOscillator={ this.stopOscillator }
					waveType={ this.waveType }
					changeFrequency={ this.changeFrequency }
					finetuneFrequency={ this.finetuneFrequency }
				/>
			</div>
		);
	}
}

// main oscillator wrapper
// creates an oscillator for each frequency
const AudioContainer = (props) => {
	const frequencies = [220, 138, 164, 440, 494]; //A C# E A D(A Major)
	return (
		<div>
			<p>Oscillations</p>
			{ frequencies.map(freq => (
				<Oscillator
					key={ `tone_${freq}` }
					frequency={ freq }
				/>
			)) }
		</div>
	);
}

ReactDOM.render(
	<AudioContainer />,
	document.getElementById('root')
);
