import React, { Component } from 'react';
import './App.css';
import Tag from './Components/Tag';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      font: '',
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
              name={this.state.name}
              font={this.state.font}
            />
          </div>
          <div className="disc-properties">
            <label>
              Select font:
              <select id="fontFamily" name="font">
                <option id="arialFont" value="arial">
                  Arial
                </option>
                <option id="courierNewFont" value="courierNew">
                  Courier New
                </option>
                <option id="cambriaFont" value="cambria">
                  Cambria
                </option>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
