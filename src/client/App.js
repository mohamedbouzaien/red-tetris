import React from "react";
import Tetris from './components/Tetris';
import SignUpForm from "./components/SignUpForm";
import { HashRouter, Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <HashRouter hashType="noslash">
        <Route path="/" exact component={SignUpForm} />
        <Route path="/:roomName[:userName]" component={Tetris} />
    </HashRouter>
  </div>
);
export default App;
