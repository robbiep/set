import React from "react";
import { StartButton } from './components/StartButton';
import { Board } from './components/Board/Board';
import { SetFound } from './components/SetFound';

function App() {
  return (
    <div>
      <StartButton />
      <Board />
      <SetFound />
    </div>
  );
}

export default App;