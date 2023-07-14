import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import React, { useState } from "react";

function App() {

  return (

    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
