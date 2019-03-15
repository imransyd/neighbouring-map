import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    venues: []
  }

  componentDidMount(){
    this.getVenues()
  }
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=APIHERE&callback=initMap")
    window.initMap = this.initMap
  }
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id:"IDHERE_APICODE",
      client_secret:"SECRETCLIENT_APICODE",
      query: "coffee",
      near:"Göteborg",
      v: "20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap())
      console.log(response)
    })
    .catch(error =>{
      console.log("ERROR!!" + error)
    })
  }
 

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 57.75581520000001, lng: 12.0782484},
      zoom: 12
    })
    this.state.venues.map(myVenue=>{
      
      let marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat, 
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      })
  })
  }
  render() {
    return (
      <div className="App">
       <main>
        <div id="map"></div>
       </main>
      </div>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}



export default App;
