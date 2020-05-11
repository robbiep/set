import React from "react";
import { StartGameButton } from './components/StartGameButton';
import { StartTurnButton } from './components/StartTurnButton';
import { PlayerScore } from './components/PlayerScore';
import { Board } from './components/Board';
import { SetFound } from './components/SetFound';

function App() {
    return (
        <div>
            <div  className="button-box col-lg-12">
                <StartGameButton />
                <StartTurnButton />
            </div>
            <PlayerScore />
            <Board />
            <SetFound />
        </div>
    );
}

export default App;