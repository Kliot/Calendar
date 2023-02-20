import React from "react";
import "./App.css";
import Main from "./components/main/Main";
import Theme from "./Theme";

function App() {
  return (
    <Theme>
      <div className="App">
        <Main></Main>
      </div>
    </Theme>
  );
}

export default App;
