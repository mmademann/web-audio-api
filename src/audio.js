
const oscillatorNodeContext = new AudioContext();
let oscillatorNode;
const startTone = () => {
    // allow the user to play sounds
    oscillatorNodeContext.resume();
    // stop the previous oscillator from playing
    if(oscillatorNode) oscillatorNode.stop();
    // create a new oscillator node (the old node is discarded)
    oscillatorNode = oscillatorNodeContext.createOscillator();
    // connect it to the destination
    oscillatorNode.connect(oscillatorNodeContext.destination);
    // start the oscillator
    oscillatorNode.start();
}
const endTone = () => {
    // stop the oscillator
    oscillatorNode.stop();
}
const changeTo = (type) => {
    oscillatorNode.type = type;
}
const changeFrequency = (frequency) => {
    // this helps us perceive the sound as being linear
    oscillatorNode.frequency.setValueAtTime(Math.pow(2, frequency / 100), oscillatorNodeContext.currentTime);
}
const changeDetune = (detune) => {
    oscillatorNode.detune.setValueAtTime(detune, oscillatorNodeContext.currentTime);
}
