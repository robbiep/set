# Player Turns

### Taking a turn
* After full hand is dealt and there are remaining sets left in the game, each player can start their turn at any time
* A turn allows the player to choose which cards are in the set
* A turn lasts five seconds, and prevents other players from interacting with them game during this time
* Once a player makes their selection, the set is validated

### Turn completion
* If the selection is a valid set will then be removed from the game and the player score incremented
* If the selection is invalid, the player will be blocked from taking any action until:
  * Another player successfully completes their turn
  * All other players unsuccessfully complete their turns
  * Additional cards are dealt

### Continuing the game
* After a succesful turn:
  * If the board is at the minimum size and there are remaining sets, the game will continue
  * If the board has no remaining sets, new cards will be dealt (if available) or the game will end

