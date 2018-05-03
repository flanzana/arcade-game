// ---------------------------- E N E M I E S --------------------------------
// Enemies our player must avoid
var Enemy = function(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // --Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;

    // --Setting the Enemy speed (you need to implement)
    this.v = v;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // --Updates the Enemy location (you need to implement)
    //enemy will move on x coordinate depending on speed
    this.x += this.v * dt;  

    // --Handles collision with the Player (you need to implement)


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //when enemy goes off screen on right, put it back on the beginning
    if (this.x > 600) {
        this.x = -100;
    }
};


// ---------------------------- P L A Y E R --------------------------------
// Now write your own player class
// This class requires an update(), render() and a handleInput() method.

var Player = function(x, y) {
    // --Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/char-boy.png';

    // --Setting the Player initial location
    this.x = x;
    this.y = y;
};

// --The update method for the Player (can be similar to the one for the Enemy)
Player.prototype.update = function() {

};

// --The render method for the Player (use the code from the render method for the Enemy)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* --The handleInput method, which should receive user input, allowedKeys (the key which was pressed)
and move the player according to that input. In particular:
- Left key should move the player to the left, right key to the right, 
  up should move the player up and down should move the player down.
- Recall that the player cannot move off screen (so you will need to 
  check for that and handle appropriately).
- If the player reaches the water the game should be reset by moving the player 
  back to the initial location (you can write a separate reset Player method to handle that).
*/
Player.prototype.handleInput = function(move) {

};


// ------------------------------------------------------------
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// --Creating a new Player object
var player = new Player(200, 400);

// --Creating several new Enemies objects and placing them in an array called allEnemies
var enemy1 = new Enemy(-100, 55, 80);
var enemy2 = new Enemy(-400, 55, 80);
var enemy3 = new Enemy(0, 140, 120);
var enemy4 = new Enemy(-300, 225, 100);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
