import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA";
export default function Map(props) {
  useEffect(() => {
    console.log("hello");

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      // center: [-99.29011, 39.39172],
      zoom: 3,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    if (props.pickupcoordinates) {
      addToMap(map, props.pickupcoordinates);
    }
    if (props.dropoffcoordinates) {
      addToMap(map, props.dropoffcoordinates);
    }
    if (props.pickupcoordinates && props.dropoffcoordinates) {
      map.fitBounds([props.pickupcoordinates, props.dropoffcoordinates], {
        padding: 50,
      });
    }
  }, [props.pickupcoordinates, props.dropoffcoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat(coordinates)
      .addTo(map);
  };
  return <Wrapper id="map"></Wrapper>;
}

const Wrapper = tw.div`
flex-1 h-1/2`;
