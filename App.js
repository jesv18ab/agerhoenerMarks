import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Accuracy} from "expo-location";

const url2 = 'https://arpo-prod-api-app.azurewebsites.net/records/?searchText=&take=200&zoomLevel=6.505000000000001&mapBounds=6.311220033140885&mapBounds=53.27908359032372&mapBounds=13.959950596326209&mapBounds=58.54520338469064&speciesGroups=Fugle&taxonIds=966eddf8-f785-ea11-aa77-501ac539d1ea&searchMode=3&includeDescendantTaxons=true&isDeleted=&hasMedia=false&excludeSaughtButNotFound=true&includeSpeciesGroupFacet=false&url=';


export default class App extends React.Component {
  mapViewRef = React.createRef();

  state = {

    markers: [],
  };

  componentDidMount= async () => {
    await this.getLocations();
  };


  getLocations = async () => {
    let response2 = await fetch(url2);
    const result2 = await response2.json();
    const listOfMarkers = Object.values(result2);
    this.setState({markers: markers});
    let markers = [];
    Object.values(result2)[0].map((item, index) => {
      let latitude = Object.values(Object.values(item)[3])[0];
      let longitude = Object.values(Object.values(item)[3])[1];
      let marker = {latitude, longitude };
      markers.push(marker)
    });

    this.setState({markers: Object.values(markers)})
  };


  render() {
    const {markers} = this.state;

    if (markers)
    {
      return (
          <View style={styles.container}>
            <MapView
                provider="google"
                style={styles.map}
            >
              {markers.map((item, key) =>
                  (
                      <Marker
                          coordinate={{  latitude: item.latitude, longitude: item.longitude }}
                          title="Christiania"
                          description="blablabal"
                          key={key}
                      />
                  ))}
            </MapView>

          </View>
      );
    } else {
      return (
          <View>
            <Text>Ingen datat
            </Text>
          </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: { flex: 1 },
  infoBox: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 20,
  },
});
