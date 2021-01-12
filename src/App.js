import React, { Component } from 'react';
import './App.css';
import Tag from './Components/Tag.js';
import RotateViewer from './Components/RotateViewer.js';

/**
 * change the onchange functions to handle...
 */

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
                <option value="American Captain">American Captain</option>
                <option value="Bauhaus 93">Bauhaus 93</option>
                <option value="Berlin Sans FB Demi">Berlin Sans FB Demi</option>
                <option value="Cooper Black">Cooper Black</option>
                <option value="Forte">Forte</option>
                <option value="Gill Sans Ultra Bold Condensed">
                  Gill Sans Ultra Bold Condensed
                </option>
                <option value="Hobo Std">Hobo Std</option>
                <option value="Nyam Regular">Nyam Regular</option>
                <option value="Showcard Gothic">Showcard Gothic</option>
                <option value="Stencil">Stencil</option>
                <option value="Tekton Pro">Tekton Pro</option>
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
