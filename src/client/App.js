import React from "react";
import Tetris from './components/Tetris';
import SignUpForm from "./components/SignUpForm";
import { HashRouter, Routes, Route, Router, Link } from "react-router-dom";
import Page1 from "./components/page1";
const App = () => (
  <div className="App">
    <HashRouter hashType="noslash">
      <Routes>
        <Route path="/" exact element={ <SignUpForm />} />
        <Route path="/:roomName[:userName]" exact element={<Tetris />} />
      </Routes>

    </HashRouter>
  </div>
);
/*
    <HashRouter hashType="noslash">
      <Routes>
        <Route path="/" exact component={SignUpForm} />
        <Route path="/:name[:userName]" component={Tetris} />
      </Routes>
    </HashRouter>
    */
export default App;