import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
const Login = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);
  return (
    <Wrapper>
      <Logo src="https://1000logos.net/wp-content/uploads/2017/09/Uber-logo.jpg"></Logo>
      <Tittle>Log in to access your account</Tittle>

      <UberLogo src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_558,h_372/v1565733741/assets/0f/9719ad-69a4-4c0d-9444-ce6d8c3f9759/original/Signup.svg"></UberLogo>

      <SigninwithGoogle onClick={() => signInWithPopup(auth, provider)}>
        <button> sign in with google</button>
      </SigninwithGoogle>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`
flex flex-col h-screen w-screen bg-white p-4
 `;
const SigninwithGoogle = tw.div`
bg-black text-white  text-center self-center py-2 mt-5 w-full
 `;
const UberLogo = tw.img`
 `;
const Tittle = tw.div`
 pt-4 text-gray-500 
 `;
const Logo = tw.img`
h-10 w-auto object-contain self-start
 `;
