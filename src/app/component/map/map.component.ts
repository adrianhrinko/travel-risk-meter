import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;

  constructor(private router: Router) { 
  }

  onCountryClick(countryCode: string) {
    this.router.navigate(['/country'], {queryParams: {code: countryCode}});
  }

  ngOnInit() {
  var that = this;
  this.map = new mapboxgl.Map({
    accessToken: environment.mapbox_token,
    container: 'map',
    style: 'mapbox://styles/adriqueh/ckarchk0u25u11ins7gefflk0',
    center: [0, 0],
    zoom: 1.3
    });
  var map = this.map;
     
    this.map.on('load', function() {
      var layers = map.getStyle().layers;
      var firstSymbolId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
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
      'fill-color': '#FFCE00', //this is the color you want your tileset to have (I used a nice purple color)
      'fill-outline-color': '#343b42'
    }
    }, firstSymbolId);
     
    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'countries-layer', function(e) {
        const countryCode = e.features[0].properties.ADM0_A3_IS;
        that.onCountryClick(countryCode);
    });
     
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'countries-layer', function(e) {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'countries-layer', function(e) {
    map.getCanvas().style.cursor = '';
    });
    });

    

  }


  onSearchChange(searchValue: string) {
  if (searchValue.length === 0) {
    this.flyToDefaultPosition();
    return;
  }

   const result = this.map.querySourceFeatures('countries', {sourceLayer: 'ne_10m_admin_0_countries-5csi85', validate: false})
   ?.filter(x => this.matchesSearchCriteria(x, searchValue));

   if (result.length > 0) {
     const searchedCountry = result[0];
     console.log(searchedCountry);
     var coords = (searchedCountry.geometry as any)?.coordinates[0][0];

     if (coords instanceof Array && typeof coords[0] !== 'number') {
       coords = coords[0];
     }

     console.log(coords);
     this.map.flyTo({
      center: [
      coords[0],
      coords[1]
      ],
      zoom: 3,
      essential: true
      });
      return;
   } 
   this.flyToDefaultPosition();
  }

  flyToDefaultPosition() {
    this.map.flyTo({
      center: [0, 0],
      zoom: 1.5,
      essential: true
      });
  }

  matchesSearchCriteria(country: any, searchValue: string): boolean {
    const searchValueLower = searchValue.toLowerCase();
    const countryName = country?.properties?.NAME?.toLowerCase();
    const countryISO = country?.properties?.ADM0_A3_IS?.toLowerCase();

    return countryName?.match('.*' + searchValueLower + '.*')?.length > 0 ||
    countryISO?.match('^' + searchValueLower + '.*')?.length > 0;
  }

}
