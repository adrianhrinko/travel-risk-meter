import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  constructor(private router: Router) { 
  }

  onCountryClick(countryCode: string) {
    this.router.navigate(['/country'], {queryParams: {code: countryCode}});
  }

  ngOnInit() {
  var that = this;
  var map = new mapboxgl.Map({
    accessToken: environment.mapbox_token,
    container: 'map',
style: 'mapbox://styles/mapbox/light-v9',
    center: [-100.04, 38.907],
    zoom: 3
    });
     
    map.on('load', function() {
    // Add a source for the state polygons.
    map.addSource('countries', {
      'type': 'vector',
      'url': 'mapbox://adriqueh.6ft2llt7'
    });
     
    // Add a layer showing the state polygons.
    map.addLayer({
    'id': 'countries-layer',
    'source-layer': 'ne_10m_admin_0_countries-5csi85',
    'source': 'countries',
    'type': 'fill',
    'paint': {
      'fill-color': '#52489C', //this is the color you want your tileset to have (I used a nice purple color)
      'fill-outline-color': '#F2F2F2'
    }
    });
     
    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'countries-layer', function(e) {
        const countryCode = e.features[0].properties.ADM0_A3_IS;
        that.onCountryClick(countryCode);
    });
     
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'countries-layer', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'countries-layer', function() {
    map.getCanvas().style.cursor = '';
    });
    });

  }

}
