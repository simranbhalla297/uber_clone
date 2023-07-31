import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

// import mapboxgl from "!mapbox-gl";
// mapboxgl.accessToken =
//   "pk.eyJ1Ijoic2ltcmFuLTEyMyIsImEiOiJjbGJodGxzMG8wdDdlM3BwNHJ2dTE4djZmIn0.Q3ZQXC8-G1o2iwqXDtn2pA";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photo: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, []);
  console.log(user);
  // useEffect(() => {
  //   console.log("hello");

  //   const map = new mapboxgl.Map({
  //     container: "map",
  //     style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
  //     center: [-99.29011, 39.39172],
  //     zoom: 3,
  //   });
  // }, []);
  const getButtonValue = (event) => {
    const getSameValue = event.currentTarget.value;
    console.log(getSameValue);
    localStorage.setItem("items", JSON.stringify(getSameValue));
  };
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        {/* headrer */}
        <Header>
          <UberLogo>uber</UberLogo>
          <Profile>
            <ProfileNasme>{user && user.name}</ProfileNasme>

            {user && user.photoURL ? (
              <>
                <ProfilePhoto src={user && user.photoURL}></ProfilePhoto>
              </>
            ) : (
              <>
                <ProfileFirstName onClick={() => signOut(auth)}>
                  {user && user.name.charAt(0)}
                </ProfileFirstName>
              </>
            )}
          </Profile>
        </Header>
        {/* ActionButtons */}
        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://cdn.dribbble.com/users/914217/screenshots/6122089/360-spin.png?compress=1&resize=400x300&vertical=top"></ActionButtonImage>
              <button value="Ride" onClick={getButtonValue}>
                Ride
              </button>
            </ActionButton>
          </Link>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://cdn.dribbble.com/users/914217/screenshots/6122089/360-spin.png?compress=1&resize=400x300&vertical=top"></ActionButtonImage>
              <button value="Wheels" onClick={getButtonValue}>
                Wheels
              </button>
            </ActionButton>
          </Link>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://cdn.dribbble.com/users/914217/screenshots/6122089/360-spin.png?compress=1&resize=400x300&vertical=top"></ActionButtonImage>
              <button value="Reserve" onClick={getButtonValue}>
                Reserve
              </button>
            </ActionButton>
          </Link>
        </ActionButtons>
        {/* inputButton */}
        <InputButton>
          <Input placeholder="Where to ?" />
        </InputButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`flex flex-col  h-screen  overflow-hidden`;
const ActionItems = tw.div`
 flex-1 flex flex-col h-1/2 overflow-y-scroll`;

const Header = tw.div`
 flex 
`;
const UberLogo = tw.div`
text-2xl font-bold mt-3 flex-1

`;
const ProfileFirstName = tw.div` h-12 w-12 rounded-full border border-red-700 p-1 m-1 text-center align-center bg-red-200
`;
const Profile = tw.div`
flex 
 `;
const PhotoContainer = tw.div``;
const ProfileNasme = tw.div`
mr-4 text-sm mt-3

`;
const ProfilePhoto = tw.img`
 h-12 w-12 rounded-full border border-red-700 p-1 m-1

`;
const ActionButtons = tw.div`
flex justify-between  
 `;
const ActionButton = tw.div` 
flex h-42 flex-col item-center text-xs text-center bg-gray-300 rounded-lg justify-center transform hover:scale-105 transition mr-1

`;
const ActionButtonImage = tw.img`
h-22

	`;
const InputButton = tw.div`
mt-2 
`;
const Input = tw.input`
`;
