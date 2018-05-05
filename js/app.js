// ------------------------------------ E N E M I E S ----------------------------------------
// Enemies our player must avoid
var Enemy = function(x, y, v) {
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
    // --Updates the Enemy location (you need to implement)
    //enemy will change x coordinate depending on speed, while y coordinate stays always the same
    this.x += this.v * dt;

    //when enemy goes off screen on right, put it back on the beginning
    if (this.x > 505) {
        this.x = -101;
    }

    // --Handles collision with the Player (you need to implement)
    collisionWithPlayer();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ------------------------------------ P L A Y E R ----------------------------------------
var Player = function(x, y) {
    // --Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/char-boy.png';

    // --Setting the Player initial location
    this.x = x;
    this.y = y;
};

// --The update method for the Player (can be similar to the one for the Enemy)
Player.prototype.update = function() {
    // when player reaches water, move player back to initial location
    if (this.y === -15) {
        setTimeout(function() {
            player.x = 202;
            player.y = 400;
        }, 500);
    }
};

// --The render method for the Player (use the code from the render method for the Enemy)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// --The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input.
Player.prototype.handleInput = function(move) {
    // one cell is 101 width and 83 height: the most bottom y 400, top y -15 (400-83*5), left x 0 and right x 404 (4*101)
    // when player in water (this.y > 0), it not possible to move to any direction
    if ((move === 'left') && (this.x > 0) && (this.y > 0)) {
        this.x -= 101;
    } else if ((move === 'right') && (this.x < 404) && (this.y > 0)) {
        this.x += 101;
    } else if ((move === 'up') && (this.y > -15)) {
        this.y -= 83;
    } else if ((move === 'down') && (this.y < 400) && (this.y > 0)) {
        this.y += 83;
    } else {
        // when on the edge, let coordinates stay the same
        this.x = this.x;
        this.y = this.y;
    }
};

// ----------------------------------------------------------------------------
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202, 400);

// y coordinates: 400 - 317 - 234 - 151 - 68 - -15
var enemy1 = new Enemy(-100, 68, 80);
var enemy2 = new Enemy(-400, 68, 80);
var enemy3 = new Enemy(0, 151, 120);
var enemy4 = new Enemy(-300, 234, 100);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// --Handles collision Enemy with the Player (you need to implement)
// help from https://stackoverflow.com/questions/2440377/javascript-collision-detection
function collisionWithPlayer() {
    allEnemies.forEach(function(enemy) {
        var xd = player.x - enemy.x;
        var yd = player.y - enemy.y;
        var w = 73;

        // when distance between is too small, bug hits player and player gets returned to initial position
        if (xd * xd + yd * yd <= w * w) {
            player.x = 202;
            player.y = 400;
        }
    })
}

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
