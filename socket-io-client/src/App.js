import React from "react";
import { StartGameButton } from './components/StartGameButton';
import { StartTurnButton } from './components/StartTurnButton';
import { SetForm } from './components/SetForm';
import { Board } from './components/Board';
import { SetFound } from './components/SetFound';

function App() {
    return (
        <div>
            <StartGameButton />
            <StartTurnButton />
            <Board />
            <SetFound />
        </div>
    );
}

export default App;