import React, { Fragment } from "react";
import axios from "axios";
import constants from "../constants";

class WeatherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      weatherObject: {},
      errorOccured: false,
      errorMessage: ""
    };
  }
  handleCityNameChange = event => {
    let { cityName } = this.state;
    cityName = event.target.value;
    this.setState({ cityName });
  };
  handleClick = event => {
    let { cityName, weatherObject } = this.state;
    cityName &&
      axios
        .get(`${constants.weatherApi}?q=${cityName}&appid=${constants.apiKey}`)
        .then(response => {
          weatherObject = response.data;
          this.setState({ weatherObject, errorOccured: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            weatherObject: {},
            errorOccured: true,
            errorMessage: "City not found"
          });
        });
  };
  renderErrorMessage = errorMessage => {
    return (
      <Fragment>
        <span>{errorMessage}</span>
      </Fragment>
    );
  };
  renderContainer = weatherObject => {
    return (
      <Fragment>
        <span>
          temp: {weatherObject && weatherObject.main && weatherObject.main.temp}
        </span>
        <span>city: {weatherObject && weatherObject.name}</span>
      </Fragment>
    );
  };
  render() {
    let { weatherObject, errorOccured, errorMessage } = this.state;
    return (
      <div className="App">
        <input type="text" onChange={this.handleCityNameChange} />
        <input type="button" value="Click me" onClick={this.handleClick} />
        {"name" in weatherObject && this.renderContainer(weatherObject)}
        {errorOccured && this.renderErrorMessage(errorMessage)}
      </div>
    );
  }
}

export default WeatherComponent;
