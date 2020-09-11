import React from "react";
import { Search, Profile } from "./components";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Divider } from "semantic-ui-react";

function App() {
  const [selectedPerson, setPerson] = React.useState(null);

  return (
    <div className="App">
      <img
        alt="star wars logo"
        className="app-logo"
        src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG14.png"
      />
      <h2 className="subtitle">Character Lookup</h2>
      <Search setPerson={setPerson} />
      <div className="lightsaber" />
      <Profile person={selectedPerson} />
    </div>
  );
}

export default App;
