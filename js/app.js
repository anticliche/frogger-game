// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (Math.random() * (380 - 100) + 100) * dt;
    // reset the bug to a position of -150 if it exceeds 600
    if (this.x > 606) {
         this.x = -150 - (Math.random() * (300 - 1) + 1);
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.bugReset = function () {
    for (var i = 0; i < allEnemies.length; i++)
        allEnemies[i].x = -200;
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {

    // if the player reaches the water, reset his position
    if (this.y < 0) {
    this.resetOnWin();
    console.log("score");
    }
    if (this.collide()) {
      allEnemies[i].bugReset();
      this.reset();
    }
};

// check for collisions

Player.prototype.collide = function () {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && 
            this.x + 50 > allEnemies[i].x && 
            this.y < allEnemies[i].y + 30 && 
            this.y + 30 > allEnemies[i].y) {
            console.log("Deeecent");
            allEnemies[i].bugReset();
            this.reset();
        }    
    }
};

var score = 0;

// Reset player's position to start location

//Player lose situation
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 402;
    score--;
    document.getElementById('score').innerHTML = 'Score ['+score+']';
};

//Player win situation
Player.prototype.resetOnWin = function() {
    this.x = 202;
    this.y = 402;
    score++;
    document.getElementById('score').innerHTML = 'Score ['+score+']';
};


// render()
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//handleInput()
Player.prototype.handleInput = function(key) {
    switch(key) {
    
    case 'shift':
      if (this.y > 165){
        this.y -= 166;
      }
      else if (this.y < 165 < 0 || this.y){
        this.y -= 83;
      }
      break;
    case 'up':
      if (this.y > 0){
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 375) {
        this.y += 83;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -=101;
      }   
      break;
    case 'right':
      if (this.x < 404) {
        this.x +=101;
      }
      break;
        
    }
};



// Now instantiate your objects.
var enemy1 = new Enemy(0,65);
var enemy2 = new Enemy(-200,148);
var enemy3 = new Enemy(0,231);
var enemy4 = new Enemy(0,148);
var enemy5 = new Enemy(-200,231);
var enemy6 = new Enemy(-200,65);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);


// Place the player object in a variable called player
var player = new Player(202,397);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        16: 'shift'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
