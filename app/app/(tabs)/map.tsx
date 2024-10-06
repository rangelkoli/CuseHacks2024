import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface Marker {
  id: number;
  Lat: number;
  Lng: number;
  Location: string;
}

const [markers, setMarkers] = useState<Marker[]>([
  {
    id: 1,
    Lat: 43.037050386743296,
    Lng: -76.13887350853764,
    Location: "Syracuse University",
  },
  {
    id: 2,
    Lat: 43.037050386743296,
    Lng: -76.13887350853764,
    Location: "Irving Ave Garage",
  },
  {
    id: 3,
    Lat: 43.03488089797313,
    Lng: -76.13883590528432,
    Location: "Lawrinson Garage",
  },
  {
    id: 4,
    Lat: 43.03820528065662,
    Lng: -76.14042006110778,
    Location: "BBB (Brewster, Brockway, Boland) Garage",
  },
  {
    id: 5,
    Lat: 43.039482352653195,
    Lng: -76.13164371877826,
    Location: "University Place + College Place",
  },
  {
    id: 6,
    Lat: 43.021799426719845,
    Lng: -76.1165806508001,
    Location: "Lyman/Slocum Bus Stop (College Place)",
  },
  {
    id: 7,
    Lat: 43.03668897385142,
    Lng: -76.13399174576683,
    Location: "Sims Drive (S/W Carnegie Hall)",
  },
  {
    id: 8,
    Lat: 43.03652021915986,
    Lng: -76.13876728994317,
    Location: "Law School/ Irving Garage Bridge",
  },
  {
    id: 9,
    Lat: 43.03790392154511,
    Lng: -76.13713960343728,
    Location: "Holden Observatory",
  },
  {
    id: 10,
    Lat: 43.03633653244873,
    Lng: -76.13135221877837,
    Location: "Euclid Ave./ College Pl",
  },
  {
    id: 11,
    Lat: 43.03779489175776,
    Lng: -76.13595578440254,
    Location: "Quad 1 Parking Booth",
  },
  {
    id: 12,
    Lat: 42.96338684730165,
    Lng: -75.84094526652135,
    Location: "Quad - Near Hinds Hall",
  },
  {
    id: 13,
    Lat: 34.08782966884715,
    Lng: -118.35020991921071,
    Location: "Tennis Court - Mount Olympus Stairs",
  },
  {
    id: 14,
    Lat: 37.76220692596614,
    Lng: -122.44641794603191,
    Location: "Mt. Olympus Staircase - Upper, Center, Lower",
  },
  {
    id: 15,
    Lat: 43.03683591550686,
    Lng: -76.12911481693153,
    Location: "Euclid Ave/ Ostrom Ave (Shaw Hall)",
  },
  {
    id: 16,
    Lat: 43.03971446742954,
    Lng: -76.12986400528406,
    Location: "University Place/ Comstock Ave (Ernie Davis Hall)",
  },
  {
    id: 17,
    Lat: 43.04180385979387,
    Lng: -76.12870473227242,
    Location: "Ostrom Avenue + Marshall Street",
  },
  {
    id: 18,
    Lat: 43.223156729710944,
    Lng: -76.28431824282933,
    Location: "Marion Bus Stop",
  },
  {
    id: 19,
    Lat: 43.04277577013353,
    Lng: -76.13285741877799,
    Location: "E. Adams Street + Walnut Place",
  },
  {
    id: 20,
    Lat: 43.04009447595926,
    Lng: -76.1337424034372,
    Location: "Waverly Ave Schine",
  },
  {
    id: 21,
    Lat: 43.04095812225026,
    Lng: -76.13187884761336,
    Location: "Waverly Parking Booth (Hoople)",
  },
  {
    id: 22,
    Lat: 43.04140880790902,
    Lng: -76.13452805556705,
    Location: "Huntington Hall",
  },
  {
    id: 23,
    Lat: 43.03796706504646,
    Lng: -76.1383185880962,
    Location: "Irving Ave + Van Buren Street",
  },
  {
    id: 24,
    Lat: 43.217082758854644,
    Lng: -76.13091475651247,
    Location: "VA Hospital",
  },
  {
    id: 25,
    Lat: 43.04161063777228,
    Lng: -76.13021681693127,
    Location: "Comstock and Marshall",
  },
  {
    id: 26,
    Lat: 43.03925321598912,
    Lng: -76.13962455535581,
    Location: "West Campus Parking Booth",
  },
  {
    id: 27,
    Lat: 43.04072043321113,
    Lng: -76.13018546110764,
    Location: "Waverly + Comstock",
  },
  {
    id: 28,
    Lat: 43.03902618290132,
    Lng: -76.13677301529724,
    Location: "Syracuse Stage East Ent.",
  },
  {
    id: 29,
    Lat: 43.0411267689315,
    Lng: -76.13737383281263,
    Location: "Syracuse Stage Parking Booth",
  },
  {
    id: 30,
    Lat: 43.048180377521305,
    Lng: -76.14357776110732,
    Location: "Panic/ Emergency Phones: Peck Hall",
  },
  {
    id: 31,
    Lat: 43.03971446742954,
    Lng: -76.12986400528406,
    Location: "University Place + Comstock Ave (Ernie Davis Hall)",
  },
  {
    id: 32,
    Lat: 43.04105795790368,
    Lng: -76.12981388994282,
    Location: "Booth Garage",
  },
  {
    id: 33,
    Lat: 43.0421567006738,
    Lng: -76.12953087460181,
    Location: "Adams Street Garage",
  },
  {
    id: 34,
    Lat: 43.04353598642596,
    Lng: -76.13378013042542,
    Location: "University Ave Garage",
  },
  {
    id: 35,
    Lat: 43.040736115952264,
    Lng: -76.13016400343713,
    Location: "Waverly + Comstock",
  },
  {
    id: 36,
    Lat: 43.04913681757058,
    Lng: -76.15866670343675,
    Location: "Warehouse Parking Lot",
  },
  {
    id: 37,
    Lat: 43.05021217362553,
    Lng: -76.14149470343662,
    Location: "Syracuse Center of Excellence",
  },
  {
    id: 38,
    Lat: 43.03677481834652,
    Lng: -76.14110020343735,
    Location: "Campus West Apartments",
  },
  {
    id: 39,
    Lat: 43.03858069465462,
    Lng: -76.13809634630344,
    Location: "Life Sciences",
  },
  {
    id: 40,
    Lat: 43.041152700315365,
    Lng: -76.13946963721695,
    Location: "Life Sciences, R-3 Lot",
  },
]);

const Map = () => {
  // const [markers, setMarkers] = useState<Marker[]>([]);
  const [userCoordinates, setUserCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  //   if (markers.length === 0) {
  //     axios.get("http://10.1.185.75:5050/blue-light-markers").then((response) => {
  //       console.log(response.data);
  //       setMarkers(response.data);
  //     });
  //   }

  //   console.log(markers);
  //   console.log(markers.length);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setUserCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      axios
        .post(
          "http://192.168.1.175:5050/user_location_update",
          {
            user_id: "10",
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log(location);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView>
      <Text>Map</Text>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={{
          latitude: 43.038071,
          longitude: -76.131521,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType='standard'
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
        followsUserLocation={true}
      >
        {markers.length > 0 &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.Lat, longitude: marker.Lng }}
              title={marker.Location}
            >
              <Image
                source={require("../../assets/images/lighticon.png")}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
          ))}
      </MapView>
    </SafeAreaView>
  );
};

export default Map;
