import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { CarList } from "./data/CarList";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";
const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff, ridevalue } = router.query;
  console.log("pickup", pickup);
  console.log(dropoff);
  console.log(CarList);
  console.log("ridevalue", ridevalue);

  const [pickupcoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffcoordinates, setDropOffCoordinates] = useState([0, 0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const getPickupCoordinate = async (pickup) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA",
          limit: 1,
        })
    );
    const data = await response.json();
    console.log(data.features[0].center);
    console.log(data);
    setPickupCoordinates(data.features[0].center);
  };
  const getDrofoffCoordinate = async (dropoff) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA",
          limit: 1,
        })
    );
    const data = await response.json();
    console.log(data.features[0].center);
    console.log(data);
    setDropOffCoordinates(data.features[0].center);
  };
  // const getPickupCoordinate = (pickup) => {
  //   // const location = "Santa Monica";
  //   //fetch function to call api  and get the data
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
  //       new URLSearchParams({
  //         access_token:
  //           "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA",
  //         limit: 1,
  //       })
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.features[0].center);
  //       console.log(data);

  //       setPickupCoordinates(data.features[0].center);
  //     });
  // };

  // const getDrofoffCoordinate = (dropoff) => {
  //   // const location = "Los Angeles";
  //   //fetch function to call api  and get the data
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
  //       new URLSearchParams({
  //         access_token:
  //           "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA",
  //         limit: 1,
  //       })
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.features[0].center);
  //       console.log(data);

  //       setDropOffCoordinates(data.features[0].center);
  //     });
  // };
  useEffect(() => {
    getPickupCoordinate(pickup);
    getDrofoffCoordinate(dropoff);
    console.log("p", pickup, "d", dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <Map
        pickupcoordinates={pickupcoordinates}
        dropoffcoordinates={dropoffcoordinates}
      />
      <RideContainer>
        <Title>Choose a ride , or Swipe up for more</Title>

        <RideSelector
          pickupCoordinates={pickupcoordinates}
          dropoffCoordinates={dropoffcoordinates}
          ridevalue={ridevalue}
        />

        <ConfirmButton>
          <button>Confirm UberX</button>
        </ConfirmButton>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;
const Wrapper = tw.div`
flex flex-col  h-screen  overflow-hidden`;
const Title = tw.div`text-center text-gray-500 text-xs py-2 border-b
`;
const RideContainer = tw.div`
flex-1 flex flex-col h-1/2`;
const ConfirmButton = tw.div`
bg-black text-white	p-2 text-center mt-1

`;
