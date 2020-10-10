import React, { Component } from 'react';
import './App.css';
import Tag from './Components/Tag'
 
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      name: "",
    };
  }
 
  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };
 
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <Tag className="App-logo" name={this.state.name}/>
            <label>
              <input type="text" name="name" onChange={e => this.setState({ name: e.target.value })} />
            </label>          
        </header>
      </div>      
    );
  }
}
 
export default App;