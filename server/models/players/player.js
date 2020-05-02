

class Player {
    constructor(playerId) {
        this.playedId = 0;
        this.eloScore = 0;
        this.username = '';
        this.gamesWon = 0;
        this.gamesTied = 0;
        this.gamesLost = 0;
    }
}

module.exports = { Player };