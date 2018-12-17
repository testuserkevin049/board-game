
/**
 * 
 *  GAME BOARD - This is a grid integer matrices that defines the players/enemy position.
 *              Each box in the grid position is also defined by the grid matrix which contains
 *              an id attribute of the grid number. All the enemies also contain positional id
 *              attribute in the markup. The board has a default height and width which restrict
 *              movement of the player. 
 * 
 * 
 * PLAYER - Most sofisticated player in the board this movement and actions.
 *          Movement of a player is triggered by a keyboard keyup event and restricted wthin
 *          bounds defined by the client board.
 * 
 * 
 * 
 */

var grid = [[1,2,3,4,5,6,7,8,9,10],
            [11,12,13,14,15,16,17,18,19,20],
            [21,22,23,24,25,26,27,28,29,30],
            [31,32,33,34,35,36,37,38,39,40],
            [41,42,43,44,45,46,47,48,49,50],
            [51,52,53,54,55,56,57,58,59,60],
            [61,62,63,64,65,66,67,68,69,70],
            [71,72,73,74,75,76,77,78,79,80],
            [81,82,83,84,85,86,87,88,89,90],
            [91,92,93,94,95,96,97,98,99,100]];

var gridMatrix = [[1,2,3,4,5],
                 [6,7,8,9,10],
                 [11,12,13,14,15],
                 [16,17,18,19,10],
                 [11,12,13,14,15]];

var player = function (score, position) {
    this.score = score;
    this.position = position;
}

player.prototype.eat = function () {
    player.score += 1;
};

player.prototype.move = function (newPosition) {
    player.position = newPosition;
};
