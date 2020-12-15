import React from 'react';

class InputFont extends React.Component {
  render() {
    return (
      <label>
        Select font:
        <select id="fontFamily" name="font">
          <option>Arial</option>
          <option>Courier New</option>
          <option>Cambria</option>
        </select>
      </label>
    );
  }
}

class InputName extends React.Component {
  render() {
    return (
      <label>
        {this.props.label}
        <input
          type="text"
          name="name"
          onChange={(input) => this.setState({ name: input.target.value })}
        />
      </label>
    );
  }
}

class InputRange extends React.Component {
  render() {
    return (
      <label>
        Type desired name:
        <input
          type="text"
          name="name"
          onChange={(input) => this.setState({ name: input.target.value })}
        />
      </label>
    );
  }
}
export { InputFont, InputName, InputRange };
