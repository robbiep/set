

class Player {
    constructor(playerId) {
        this.playerId = playerId || 0;
        this.eloScore = 0;
        this.username = '';
        this.gamesWon = 0;
        this.gamesTied = 0;
        this.gamesLost = 0;

        this.loadPlayer(playerId);
    }

    loadPlayer(playerId) {
        // temp
        this.eloScore = 1500;
        this.username = 'tacocat';
        this.gamesWon = 10;
        this.gamesTied = 4;
        this.gamesLost = 8;
    }
}

module.exports = { Player };