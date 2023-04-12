import React from "react";
import SignUpForm from "./components/SignUpForm";
import { HashRouter, Route } from "react-router-dom";
import Game from "./components/Game";

const App = () => (
  <div className="App">
    <HashRouter hashType="noslash">
        <Route path="/" exact component={SignUpForm} />
        <Route path="/:roomName[:userName]" component={Game} />
    </HashRouter>
  </div>
);
export default App;
