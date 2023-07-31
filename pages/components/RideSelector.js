import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { CarList } from "../data/CarList";
// import mapboxgl from "!mapbox-gl";

const RideSelector = ({ pickupCoordinates, dropoffCoordinates, ridevalue }) => {
  const [rideduration, setRideDuration] = useState(0);
  const [ridedistance, setRideDistance] = useState("");

  console.log("hello rider comlj");

  console.log("pick", pickupCoordinates);
  console.log("drop", dropoffCoordinates);
  console.log("ridevalue", ridevalue);

  useEffect(() => {
    console.log("simrannnnnhimanshu");
    console.log("simrannnnnhimanshu", ridevalue);
  });
  useEffect(() => {
    console.log("simran");
    const mapboxglaccessToken =
      "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA";
    if (ridevalue === "Ride") {
      setTimeout(() => {
        fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=${mapboxglaccessToken}`
        )
          .then((res) => res.json())

          .then((data) => {
            console.log("duration data", data);
            console.log("run after some time");
            if (data.code == "Ok") {
              setRideDuration(data.routes[0].duration / 100);
              setRideDistance(data.routes[0].distance);
            }
          });
      }, 1000);
    } else if (ridevalue === "Wheels") {
      setTimeout(() => {
        fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?alternatives=true&continue_straight=true&geometries=polyline&language=en&overview=simplified&steps=true&access_token=${mapboxglaccessToken}`
        )
          .then((res) => res.json())

          .then((data) => {
            console.log("duration data", data);
            console.log("run after some time");
            if (data.code == "Ok") {
              setRideDuration(data.routes[0].duration / 100);
              setRideDistance(data.routes[0].distance);
            }
          });
      }, 1000);
    } else {
      console.log("bad luck");
    }
  }, [dropoffCoordinates, pickupCoordinates]);

  return (
    <Wrapper>
      <CarListItems>
        {CarList.map((list, index) => {
          return (
            <Car key={index}>
              <CarImages src={list.image} />
              <CarDetails>
                <CarName>{list.name}</CarName>
                <Time>{list.time}</Time>
                <TotalDistance>
                  Distance:{Math.trunc(ridedistance)}
                  {ridedistance.toString().length > 3 ? "km" : "m"}
                </TotalDistance>
              </CarDetails>
              <CarFare>{"$" + (rideduration * list.fare).toFixed(2)}</CarFare>
            </Car>
          );
        })}
      </CarListItems>
    </Wrapper>
  );
};

export default RideSelector;
const Wrapper = tw.div`flex-1   overflow-y-scroll flex flex-col `;

const CarListItems = tw.div``;
const Car = tw.div`flex p-4 items-center  border-b `;
const CarImages = tw.img`h-14 mr-2`;
const CarName = tw.div`font-medium`;
const CarDetails = tw.div`flex-1`;
const CarFare = tw.div`text-sm`;
const Time = tw.div`text-xs text-blue-500`;
const TotalDistance = tw.div`text-xs text-blue-500`;
