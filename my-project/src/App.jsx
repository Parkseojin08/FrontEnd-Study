import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Header from "./web/header/header.jsx";
import SignUp from "./web/header/signup/signUp.jsx";
import SignIn from "./web/header/signin/signIn.jsx";
import Content from "./web/content/content.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Content />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header />
              <SignUp />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header />
              <SignIn />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
