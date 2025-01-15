import "./Login.css";

import { auth, provider } from "./firebase";
import { getAuth, signInWithPopup } from "firebase/auth";

import { Button } from "@mui/material";
import React from "react";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((e) => alert(e.message));
  };
  return (
<div className='login'>
  <div className='login__container'>
    <p className='login__label'>
      Cool<span className='login__label-m'>Mail</span>
    </p>
    <img src='/email.svg' alt='' />
    <Button variant='contained' color='primary' onClick={signIn}>
      Connexion
    </Button>
  </div>
</div>
  );
}

export default Login;
