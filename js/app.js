// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Set enemy's width and height
    this.w = 75;
    this.h = 50;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;

    // Check for collisions
    this.checkCollision();

    // Reset the enemy's position and speed if it reaches the right side of
    // the canvas. Since in engine.js canvas width is set to 505 we check if
    // enemy's x position is greater or equal to 505.
    if (this.x >= 505){
        this.x = -100;
        this.speed = Math.floor(Math.random() * (300 - 50) + 50);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Check for Collisions
Enemy.prototype.checkCollision = function() {
    // 2D collision detection method. If collision is detected game
    // alerts us and resets the player's position.
   if(player.x < this.x + this.w &&
        player.x + player.w > this.x &&
        player.y < this.y + this.h &&
        player.h + player.y > this.y){
        alert("Oops! Try again");
        player.reset();
    }
};


// Player class
var Player = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';

    // Set the player's width and height
    this.h = 50;
    this.w = 50;
};


// Update the player's position
Player.prototype.update = function() {
    // Check if the player reached the water, which means the player's y
    // is less than 0. If so, alert the player about win and reset the
    // player's position to the starting point.
    if(this.y < 0){
        player.reset();
        alert("You won!");
    }

    //Make sure the player can not go above his starting point's
    // y coordinate. Set players y to starting point's y value.
    else if(this.y > 400){
        this.y = 400;
    }
    // Make sure player can not go out of the canvas on the left
    // and right canvas borders.
    else if(this.x < 0){
        this.x = 0;
    }
    else if (this.x > 400){
        this.x = 400;
    }
};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Handle keybord input
Player.prototype.handleInput = function(key) {
    if(key == 'left') {
        this.x = this.x - this.speed;
    }
    if(key == 'right') {
        this.x = this.x + this.speed;
    }
    if(key == 'up') {
        this.y = this.y - this.speed;
    }
    if(key == 'down') {
       this.y = this.y + this.speed;
    }

};

// Reset the player's position back to the starting point.
Player.prototype.reset = function(){
    player.x = 200;
    player.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
        new Enemy(-100,60,Math.floor(Math.random() * (300 - 50) + 50)),
        new Enemy(-100,150,Math.floor(Math.random() * (300 - 50) + 50)),
        new Enemy(-100,230,Math.floor(Math.random() * (300 - 50) + 50))
];
var player = new Player(200, 400, 75);


// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
