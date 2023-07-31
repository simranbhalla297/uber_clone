import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HeightIcon from "@mui/icons-material/Height";
import SouthIcon from "@mui/icons-material/South";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import StarsIcon from "@mui/icons-material/Stars";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
const Search = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [ridevalue, setRideValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    console.log(items);
    console.log("search", items);
    setRideValue(items);
    console.log("call data function");
    fetchPost();
  }, []);

  const fetchPost = async () => {
    await getDocs(collection(db, "saved_location")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(todos, newData);
    });
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addDoc(collection(db, "saved_location"), {
  //       pickup: pickup,
  //       drop: dropoff,
  //     });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "saved_location"), {
        pickup: pickup,
        drop: dropoff,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/">
          <ArrowBackIcon style={{ fontSize: 50 }} />
        </Link>
      </ButtonContainer>
      <InputContainer>
        <FromToIcon>
          <FiberManualRecordIcon
            style={{ fontSize: 50, color: "gray", marginBottom: "30px" }}
          />
          <SouthIcon style={{ fontSize: 50, marginBottom: "5px" }} />
        </FromToIcon>
        <InputBoxex>
          <Input
            value={pickup}
            placeholder="Pickup Location"
            onChange={(e) => setPickup(e.target.value)}
          />
          <Input
            placeholder="Drop Location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
        </InputBoxex>
        <EditIcon>
          <AddCircleOutlineRoundedIcon
            style={{ fontSize: 50, color: "gray" }}
            onClick={submit}
          />
        </EditIcon>
      </InputContainer>
      <SavedLocation>
        <StarsIcon
          style={{ color: "gray", fontSize: 60, marginLeft: "10px" }}
        />
        <SavedLocationText>Saved Places</SavedLocationText>
      </SavedLocation>
      <SavedLocationContainer>
        {todos.map((list, index) => {
          return <h2 key={index}>pickup:{list.pickup}</h2>;
        })}
      </SavedLocationContainer>
      <ConfirmLocationButton>
        <Link
          href={{
            pathname: "/confirm",
            query: {
              pickup: pickup,
              dropoff: dropoff,
              ridevalue: ridevalue,
            },
          }}
        >
          <button>Confirm Location</button>
        </Link>
      </ConfirmLocationButton>
    </Wrapper>
  );
};

export default Search;
const Wrapper = tw.div`
bg-gray-200 h-screen
`;
const ButtonContainer = tw.div`
    bg-white px-4
`;
const InputContainer = tw.div` 
 bg-white flex  items-center
 `;
const FromToIcon = tw.div`
flex flex-col px-4 
 `;
const InputBoxex = tw.div`
flex flex-col flex-1 
`;
const Input = tw.input`
 h-10 bg-gray-200 w-full my-2 rounded-2 p-1 outline-none border-none
`;
const EditIcon = tw.div`
 ml-3
`;
const SavedLocation = tw.div`bg-white mt-4 p-1 flex  `;
const SavedLocationText = tw.div`ml-4 font-bold flex items-center text-slate-500	

  `;
const ConfirmLocationButton = tw.div`
bg-black text-white	p-2 text-center m-2`;
const SavedLocationContainer = tw.div`bg-white mt-4 p-3 `;
