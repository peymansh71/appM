import React, { Component, useContext } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import { mapboxgl } from 'mapbox-gl'
import $ from "jquery";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
class Canvas extends Component {
  // componentDidMount() {
  //     mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  //     var map = new mapboxgl.Map({
  //         container: 'map-area',
  //         style: 'mapbox://styles/mapbox/streets-v11'
  //     });

  // }

  render() {
    // const context = useContext(simpleContext)
    return <div id="map-area"></div>;
  }
}

export default Canvas;
