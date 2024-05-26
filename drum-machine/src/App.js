import './App.css';
import React from 'react';

// Array of drums
const drums = [
  { id: 'Q', type: "Heater-1", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { id: 'W', type: "Heater-2", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" },
  { id: 'E', type: "Heater-3", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" },
  { id: 'A', type: "Heater-4", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" },
  { id: 'S', type: "Clap", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" },
  { id: 'D', type: "Open-HH", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" },
  { id: 'Z', type: "Kick-n'-Hat", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" },
  { id: 'X', type: "Kick", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" },
  { id: 'C', type: "Closed-HH", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" }
];

// function to play audio element
const playAudio = async (audioElement) => {
  try {
    const audio = document.getElementById(audioElement);
    await audio.play();
  } catch (e) {
    console.log(`Error playing audio: ${e}`);
  }
}

// React component which comprises an individual drum pad
class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 100
    };
  };

  play = () => playAudio(this.props.drumId);

  changeVolume = (newVolume) => {
    this.setState({ volume: newVolume });
    document.getElementById(this.props.drumId).volume = newVolume / 100;
  };

  render() {
    return (
      <button id={this.props.drumType} className='drum-pad' onClick={this.play}>
        <p>{this.props.drumId}</p>
        <audio id={this.props.drumId} className='clip' src={this.props.drumSound} type="audio/mp3" />
        <input type="range" min="0" max="100" value={this.state.volume} className="slider" id="myRange" onChange={e => this.changeVolume(e.target.value)} />
      </button>
    );
  };
}

// React component which comprises all the individual drum pads, drum kit display, and drum kit controls
class DrumKit extends React.Component {
  constructor(props) {
    super(props);

  };

  render() {
    return (
      <div id="drum-machine">
        <div id="drums">
          {drums.map(drum => <Drum key={`${drum.id}-${drum.type}`} drumId={drum.id} drumType={drum.type} drumSound={drum.source} />)}
        </div>
        <p id="display"></p>
      </div>
    );
  };
}

// App
function App() {
  return (
    <div className="App">
      <DrumKit />
    </div>
  );
}

export default App;

// Code to handle key presses globally
const handleKeyDown = (e) => {
  const key = e.key.toUpperCase();
  if (drums.some(drum => drum.id.toUpperCase() === key)) {
    playAudio(key);
  }
};
document.addEventListener('keydown', handleKeyDown, true);

// Code to update display
const updateDisplay = (e) => {
  const drumPlaying = drums.filter(drum => drum.id === e.target.id)[0];
  document.getElementById("display").innerText = `${drumPlaying.type.replaceAll('-', ' ')}`;
}
document.addEventListener('play', updateDisplay, true);