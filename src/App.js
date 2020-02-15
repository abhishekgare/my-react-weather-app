import React, { Fragment } from "react";
import WeatherComponent from "./components/WeatherComponent";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <WeatherComponent />
      </div>
    );
  }
}

export default App;
