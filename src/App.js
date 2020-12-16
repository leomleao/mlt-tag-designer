import React, { Component } from 'react';
import './App.css';
import Tag from './Components/Tag.js';
import RotateViewer from './Components/RotateViewer.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      font: 'serif',
      space: 0,
      start: 0,
    };
  }

  toggleShow = () => {
    this.setState((state) => ({ isShow: !state.isShow }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>MLT Tag Designer</h1>
        </header>
        <div className="App-body">
          <div className="disc-preview">
            <Tag
              className="App-logo"
              typedName={this.state.name}
              fontFamily={this.state.font}
              spaceBetween={this.state.space}
              startPosition={this.state.start}
            />
            <RotateViewer />
          </div>
          <div className="table">
            <ul>
              <li>{this.state.name}</li>
              <li>{this.state.font}</li>
              <li>{this.state.space}</li>
              <li>{this.state.start}</li>
            </ul>
          </div>
          <div className="disc-properties">
            <label>
              Select font:
              <select
                id="fontFamily"
                name="font"
                onChange={(input) =>
                  this.setState({ font: input.target.value })
                }
              >
                <option value="arial">Arial</option>
                <option value="courierNew">Courier New</option>
                <option value="cambria">Cambria</option>
                <option value="monospace">Monospace</option>
              </select>
            </label>
            <label>
              Type desired name:
              <input
                type="text"
                name="name"
                onChange={(input) =>
                  this.setState({ name: input.target.value })
                }
              />
            </label>
            <label>
              Select space between caracters:
              <input
                type="range"
                name="space"
                min="0"
                max="1"
                step="0.000001"
                onChange={(input) =>
                  this.setState({ space: input.target.value })
                }
              />
            </label>
            <label>
              Select starting point:
              <input
                type="range"
                name="start"
                min="0"
                max="360"
                step="1"
                onChange={(input) =>
                  this.setState({ start: input.target.value })
                }
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
