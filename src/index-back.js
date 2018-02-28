import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// find the correct Audio Context from the browser
// AudioContext constant - contains all audio and oscillator nodes
const Context = window.AudioContext || window.webkitAudioContext || null;
const AUDIO_CONTEXT = new Context();
const DEFAULT_FREQUENCIES = [ 220, 138, 164, 440, 329 ];

// returns the oscillator controls
const Playback = (props) => {
	return (
		<div className="control-row">
			Oscillator
			<button onClick={props.startOscillator}>Play</button>
			<button onClick={props.stopOscillator}>Stop</button>
		</div>
	)
}

const WaveType = (props) => {
	return (
		<div className="control-row">
			Waveform
			<button
				value="sine"
				onClick={props.selectWaveType}>Sine
			</button>
			<button
				value="sawtooth"
				onClick={props.selectWaveType}>Saw
			</button>
			<button
				value="triangle"
				onClick={props.selectWaveType}>Tri
			</button>
			<button
				value="square"
				onClick={props.selectWaveType}>Square
			</button>
		</div>
	)
}

const Frequency = (props) => {
	return (
		<div>
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
					onInput={props.tuneFrequency}>
				</input>
			</div>
			<div className="control-row">
				<p>Volume</p>
				<input
					type="range" min="-150" max="150"
					defaultValue="50"
					onInput={props.changeGain}>
				</input>
			</div>
		</div>
	)
}

// oscillator component w/ audio controls
class Oscillator extends React.Component {

	oscillator = null;

	// stops the oscillator if removed
	componentWillUnmount() {
		if (this.oscillator) this.oscillator.stop();
	}

	componentDidMount() {}

	// creates the oscillator
	startOscillator = () => {
		AUDIO_CONTEXT.resume();
		if (this.oscillator) this.oscillator.stop();
		this.oscillator = AUDIO_CONTEXT.createOscillator();
		this.gainNode = AUDIO_CONTEXT.createGain();

		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(AUDIO_CONTEXT.destination);

		this.oscillator.frequency.setValueAtTime(
			this.props.frequency,
			AUDIO_CONTEXT.currentTime
		);
		this.oscillator.connect(AUDIO_CONTEXT.destination);
		this.oscillator.start();
	}

	// stops the oscillator
	stopOscillator = () => {
		if (this.oscillator) this.oscillator.stop();
	}

	// changes the wave type of the oscillator
	selectWaveType = (event) => {
		if (this.oscillator) this.oscillator.type = event.target.value;
	}

	// slides through different frequencies
	changeFrequency = (event) => {
		if (this.oscillator) {
			this.oscillator.frequency.setValueAtTime(
				Math.pow(2, event.target.value / 100),
				AUDIO_CONTEXT.currentTime
			);
		}
	}

	// fine tunes the frequency
	tuneFrequency = (event) => {
		if (this.oscillator) {
			this.oscillator.detune.setValueAtTime(
				event.target.value,
				AUDIO_CONTEXT.currentTime
			);
		}
	}

	changeGain = (event) => {
		if (this.gainNode) {
			this.gainNode.gain.setValueAtTime(
				(parseInt(event.target.value, 10) / 100),
				AUDIO_CONTEXT.currentTime
			);
		}
	}

	render() {
		return (
			<div className="oscillator-row">
				<Playback
					startOscillator={ this.startOscillator }
					stopOscillator={ this.stopOscillator } />
				<WaveType selectWaveType={ this.selectWaveType } />
				<Frequency
					frequency={ this.props.frequency }
					changeFrequency={ this.changeFrequency }
					changeGain={ this.changeGain }
					tuneFrequency={ this.tuneFrequency } />
			</div>
		);
	}
}

// main audio wrapper
// creates an oscillator for each frequency
const AudioContainer = (props) => {
	return (
		<div>
			<p>::: Oscillations ::</p>
			{ DEFAULT_FREQUENCIES.map((freq, i) => (
				<Oscillator
					index={i}
					key={ `tone_${freq}` }
					frequency={ freq }
				/>
			)) }
		</div>
	);
}

ReactDOM.render(
	<AudioContainer />,
	document.getElementById('app')
);
