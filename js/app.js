// Character superclass
var Character = function(x,y,speed){
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Draw the character on the screen
Character.prototype.render = function(x,y,sprite){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    Character.call(this,x,y,speed);
    // Set enemy's width and height
    this.w = 75;
    this.h = 50;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

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

// Check for Collisions
Enemy.prototype.checkCollision = function() {
    // 2D collision detection method. If a collision is detected game
    // gives an alert and resets the player's position.
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

    Character.call(this,x,y,speed);
    this.sprite = 'images/char-horn-girl.png';

    // Set the player's width and height
    this.h = 50;
    this.w = 50;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Update the player's position
Player.prototype.update = function() {
    // Check if the player reached the water, which means the player's y
    // is less than 0. If so, alert the player about win and reset the
    // player's position to the starting point.
    if(this.y < 0){
        this.reset();
        alert("You won!");
    }

    // Make sure the player can not go above his starting point's
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
    this.x = 200;
    this.y = 400;
};

// Instantiate enemies object.
// Place all enemy objects in an array called allEnemies
// All enemies has starting x values -100 to have them smoothly appear on the canvas.
// The first enemy has y value 60 which puts it on the first row of the road.
// The second enemy has y value 150 which puts it on the second row of the road.
// The third enemy has y value 230 which puts it on the third row of the road.
// All enemies' speeds are calculated with Math.random() with minimum value
//for speed 50 ans maximum value 300.
var allEnemies = [
        new Enemy(-100,60,Math.floor(Math.random() * (300 - 50) + 50)),
        new Enemy(-100,150,Math.floor(Math.random() * (300 - 50) + 50)),
        new Enemy(-100,230,Math.floor(Math.random() * (300 - 50) + 50))
];

// Instantiate the player object:
// Place the player object in a variable called player
var player = new Player(200, 400, 100);


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
