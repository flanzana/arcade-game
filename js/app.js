// ------------------------------------ E N E M I E S ----------------------------------------
// Enemies our player must avoid
var Enemy = function(x, y, v) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    this.x = x;
    this.y = y;

    // Setting the Enemy speed
    this.v = v;
};

// Update the enemy's position and speed
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //enemy will change x coordinate depending on speed, while y coordinate stays always the same
    this.x += this.v * dt;

    //when enemy goes off screen on right, put it back on the beginning
    if (this.x > 505) {
        this.x = -101;
        // change speed of enemy when enemy start again from the left
        // max speed can be 250, if speed more than 250, put it back to 90
        this.v = (this.v * Math.random() + 90);
        if (this.v > 240) {
            this.v = 90
        }
        //console.log(this.v);
    }

    // Handles collision with the Player
    collisionWithPlayer();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ------------------------------------ P L A Y E R ----------------------------------------
var Player = function(x, y) {
    // Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/char-boy.png';

    // Setting the Player initial location
    this.x = x;
    this.y = y;
};

// The update method for the Player
Player.prototype.update = function() {
    // when player reaches water, display number of wins and move player back to initial location
    if (this.y === -15) {
        player.x = 202;
        player.y = 400;
        addWin();
    }
};

// The render method for the Player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input.
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
var enemy1 = new Enemy(-404, 68, 120);
var enemy2 = new Enemy(-101, 151, 80);
var enemy3 = new Enemy(-202, 151, 80);
var enemy4 = new Enemy(-303, 234, 160);
var enemy5 = new Enemy(0, 317, 100);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var lifeCount = 3;
var winCount = 0;

// Handles collision Enemy with the Player
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

            // for each collision, you lost one life. when you lose all 3 lives, game over
            removeLife();
        }
    })
}

// lives - everytime enemy hits player, player lose one life
function removeLife() {
    lifeCount -= 1;
    console.log(`Lives: ${lifeCount}`);

    if (lifeCount == 2) {
        document.querySelector(".heart3").classList.add("lost");
    } else if (lifeCount == 1) {
        document.querySelector(".heart2").classList.add("lost");
    } else if (lifeCount == 0) {
        document.querySelector(".heart1").classList.add("lost");
    }

    // When player loses all three lives, the game is over.
    setTimeout(function() {
        if (lifeCount === 0) {
            document.querySelector(".lose-mes").classList.remove("hide");
            showModal();
        }
    }, 500);
}

// function to count and display many times player reaches the water
function addWin() {
    winCount = winCount + 1;
    console.log(`Win: ${winCount}`);
    document.getElementById("moves").innerHTML = winCount;

    // When the player reaches water 10 times, player wins the game.
    setTimeout(function() {
        if (winCount === 10) {
            document.querySelector(".win-mes").classList.remove("hide");
            showModal();
        }
    }, 500);
}

function showModal() {
    // unable to move player when modal is displayed
    document.removeEventListener('keyup', playerHandleKeys);

    //show modal
    var modal = document.getElementById("modal");
    modal.classList.remove("hide");

    // when click on button play again, start new game
    document.getElementById("play-again").onclick = function() {
        resetAndPlayAgain();
    }
}

function resetAndPlayAgain() {
    // hide modal
    modal.classList.add("hide");
    document.querySelector(".win-mes").classList.add("hide");
    document.querySelector(".lose-mes").classList.add("hide");

    // put back 3 lifes and put moves to 0
    winCount = 0;
    document.getElementById("moves").innerHTML = winCount;

    lifeCount = 3;
    document.querySelector(".heart1").classList.remove("lost");
    document.querySelector(".heart2").classList.remove("lost");
    document.querySelector(".heart3").classList.remove("lost");

    // enable to move player again with keyboard
    document.addEventListener("keyup", playerHandleKeys);
}


// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', playerHandleKeys);

function playerHandleKeys(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}