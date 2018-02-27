import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import helpers from './helpers';

class Instrument extends React.Component {
  render() {
    return (
      <div>
        <div className="instrument-row">
          <button className="effect-pop" onClick={this.props.onClickStartTone}>Start</button>
          <button className="effect-pop" onClick={this.props.onClickEndTone}>Stop</button>
        </div>
      </div>
    );
  }
}

class Audio extends React.Component {
  constructor(props) {
    super(props);
    const oscillatorNodeContext = new AudioContext();
    this.state = {
      oscillatorNodeContext: oscillatorNodeContext,
      oscillatorNode: null
    }
  }

	startTone() {
	  this.state.oscillatorNodeContext.resume();
	  if(this.state.oscillatorNode) this.state.oscillatorNode.stop();
	  this.state.oscillatorNode = this.state.oscillatorNodeContext.createOscillator();
	  this.state.oscillatorNode.connect(this.state.oscillatorNodeContext.destination);
	  this.state.oscillatorNode.start();
	}

	endTone(step) {
	  if (this.state.oscillatorNode) this.state.oscillatorNode.stop();
	}
	changeTo(type) {
	  this.state.oscillatorNode.type = type;
	}
	changeFrequency(frequency) {
	  this.state.oscillatorNode.frequency.setValueAtTime(Math.pow(2, frequency / 100), this.state.oscillatorNodeContext.currentTime);
	}
	changeDetune(detune) {
	  this.state.oscillatorNode.detune.setValueAtTime(detune, this.state.oscillatorNodeContext.currentTime);
	}

  render() {
    return (
      <div>
      	<Instrument
      	  onClickStartTone={(i) => this.startTone(i)}
      	  onClickEndTone={(i) => this.endTone(i)}
      	/>
	    </div>
    );
  }
}

ReactDOM.render(
  <Audio />,
  document.getElementById('root') 
);
