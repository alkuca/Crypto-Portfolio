import React, { Component } from 'react';
import './App.css';
import Navbar from "./Components/Navbar"
import ValueBlock from "./Components/ValueBlock";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>

        <div className="block--container">
          <div className="block--container--content">
              <ValueBlock type="USD" value="$ 372 460.47"/>
              <ValueBlock type="Bitcoin (BTC)" value="46.23564565"/>
              {/* replace next div block with ValeBlock Component */}
              <div className="value--block">
                  <div className="blue--line"/>
                  <div className="value--block-content">
                      <p className="value--block--value--type">Daily Change</p>
                      <p className="value--block--value makeGreen">57.43 %</p>
                  </div>
              </div>
              {/* end here */}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
