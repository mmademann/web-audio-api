import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// find the correct Audio Context from the browser
const audioContext = window.AudioContext || window.webkitAudioContext || null;

// AudioContext constant - contains all audio and oscillator nodes
const AUDIO_CONTEXT = new audioContext();
const DEFAULT_FREQUENCIES = [ 220, 138, 164, 440, 329 ];

// returns the oscillator controls
const Controls = (props) => {
	return (
		<div>
			<div className="control-row">
				Oscillator
				<button onClick={props.startOscillator}>Play</button>
				<button onClick={props.stopOscillator}>Stop</button>
			</div>
			<div className="control-row">
				Waveform
				<button value="sine" onClick={props.selectWaveType}>Sine</button>
				<button value="sawtooth" onClick={props.selectWaveType}>Saw</button>
				<button value="triangle" onClick={props.selectWaveType}>Tri</button>
				<button value="square" onClick={props.selectWaveType}>Square</button>
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
					onInput={props.tuneFrequency}>
				</input>
			</div>
		</div>
	)
}

// oscillator component w/ audio controls
class Oscillator extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	    tune: '100',
	    wave: 'sine',
	    frequencies: DEFAULT_FREQUENCIES
	  };

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
		this.oscillator.frequency.setValueAtTime(
			this.props.frequency,
			AUDIO_CONTEXT.currentTime
		);
		this.oscillator.connect(AUDIO_CONTEXT.destination);
		this.oscillator.start();
	};

	// stops the oscillator
	stopOscillator = () => {
		if (this.oscillator) this.oscillator.stop();

		this.setState({
		  tune: 		'100',
		  wave: 		'sine',
		  frequency: 	this.props.frequency
		});
	};

	// changes the wave type of the oscillator
	selectWaveType = (event) => {
		if (this.oscillator) this.oscillator.type = event.target.value;
	};

	// slides through different frequencies
	changeFrequency = (event) => {
		if (this.oscillator) {
			this.oscillator.frequency.setValueAtTime(
				Math.pow(2, event.target.value / 100),
				AUDIO_CONTEXT.currentTime
			);
		}
	};

	// fine tunes the frequency
	tuneFrequency = (event) => {
		if (this.oscillator) {
			this.oscillator.detune.setValueAtTime(
				event.target.value,
				AUDIO_CONTEXT.currentTime
			);
		}
	};

	render() {
		return (
			<div className="oscillator-row">
				<Controls
					frequency={ this.props.frequency }
					startOscillator={ this.startOscillator }
					stopOscillator={ this.stopOscillator }
					selectWaveType={ this.selectWaveType }
					changeFrequency={ this.changeFrequency }
					tuneFrequency={ this.tuneFrequency }
				/>
			</div>
		);
	}
}

// Audio component w/ audio controls
class AudioContainer extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    tune: 		'100',
	    wave: 		'sine',
	    frequency: 	this.props.frequency,
	  };
	}

	oscillator = null;

	// creates the oscillator
	startOscillator = () => {
		AUDIO_CONTEXT.resume();
		if (this.oscillator) this.oscillator.stop();
		this.oscillator = AUDIO_CONTEXT.createOscillator();
		this.oscillator.frequency.setValueAtTime(
			this.props.frequency,
			AUDIO_CONTEXT.currentTime
		);
		this.oscillator.connect(AUDIO_CONTEXT.destination);
		this.oscillator.start();
	};

	// stops the oscillator
	stopOscillator = () => {
		if (this.oscillator) this.oscillator.stop();

		this.setState({
		  tune: 		'100',
		  wave: 		'sine',
		  frequency: 	this.props.frequency
		});
	};

	// changes the wave type of the oscillator
	selectWaveType = (event) => {
		if (this.oscillator) this.oscillator.type = event.target.value;
	};

	// slides through different frequencies
	changeFrequency = (event) => {
		if (this.oscillator) {
			this.oscillator.frequency.setValueAtTime(
				Math.pow(2, event.target.value / 100),
				AUDIO_CONTEXT.currentTime
			);
		}
	};

	// fine tunes the frequency
	tuneFrequency = (event) => {
		if (this.oscillator) {
			this.oscillator.detune.setValueAtTime(
				event.target.value,
				AUDIO_CONTEXT.currentTime
			);
		}
	};

	render() {

		return (
			<div>
				{ DEFAULT_FREQUENCIES.map(freq => (
					<Oscillator
						key={ `tone_${freq}` }
						frequency={ freq }
					/>
				)) }
			</div>
		);

		return (
			<div className="oscillator-row">
				<Controls
					frequency={ this.props.frequency }
					startOscillator={ this.startOscillator }
					stopOscillator={ this.stopOscillator }
					selectWaveType={ this.selectWaveType }
					changeFrequency={ this.changeFrequency }
					tuneFrequency={ this.tuneFrequency }
				/>
			</div>
		);
	}
}

// main audio wrapper
// creates an oscillator for each frequency
const AudioContainer = (props) => {
	console.log(props)
	return (
		<div>
			<p>::: Oscillations ::</p>
			{ DEFAULT_FREQUENCIES.map(freq => (
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
	document.getElementById('app')
);
