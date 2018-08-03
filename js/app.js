// Classic arcade game clone by Matej Sučić


//>>>> OBJECTIVES TO DO <<<<

//Enemies our player must avoid
    //Variables applied to each of our instances go here,
    //we've provided one for you to get started
    //The image/sprite for our enemies, this uses
    //a helper we've provided to easily load images
//Update the enemy's position, required method for game
//Parameter: dt, a time delta between ticks
    //You should multiply any movement by the dt parameter
    //which will ensure the game runs at the same speed for
    //all computers.
//Draw the enemy on the screen, required method for game
//Now write your own player class
//This class requires an update(), render() and
//a handleInput() method.
//Now instantiate your objects.
//Place all enemy objects in an array called allEnemies
//Place the player object in a variable called player
//This listens for key presses and sends the keys to your
//Player.handleInput() method. You don't need to modify this.


const maxSpeed = 650;
const minSpeed = 100;
const baseSpeed = 55;


let enemyBug = function(x, y) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.speedy();

};
enemyBug.prototype.speedy = function() {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + baseSpeed);
};

enemyBug.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.speed = this.speedy();
    }

};
// score
enemyBug.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "black";
    ctx.font = "1.5em Lucida Console";
    ctx.fillText("Points = " + player.playerPoints, 180, 20);
};

let Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.playerPoints = 0;
};
// collision detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Player.prototype.update = function() {
    for (let i = 0; i < 3; i++) {
        if ((this.x < allEnemies[i].x + 72) && (this.x + 72 > allEnemies[i].x) && (this.y < allEnemies[i].y + 72) && (this.y + 72 > allEnemies[i].y)) {
            this.reset();
        }
    }
};
// reset to player starting position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

};
Player.prototype.finish = function() {
    this.x = 200;
    this.y = 400;
    this.playerPoints = 0;

};
Player.prototype.pointsScored = function() {
    this.playerPoints += 1;
    if (this.playerPoints == 3) {
        alert("Good Job! Go Once Again!");
        this.finish();
    }
    this.reset();

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    if (key == "down") {
        if (this.y < 400) {
            this.y = this.y + 90;
        }
    } else if (key == "right") {
        if (this.x < 350) {
            this.x = this.x + 90;
        }
    } else if (key == "up") {
        if (this.y > 40) {
            this.y -= 90

        } else {
            this.pointsScored();
        }
    } else if (key == "left") {
        if (this.x > 50) {
            this.x = this.x - 90;
        }
    }

};

let allEnemies = [new enemyBug(0, 40),
    new enemyBug(0, 120),
    new enemyBug(0, 220)
];
let player = new Player(200, 400);

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* >>>>Changes made from original<<<<
  Enemy -> enemyBug
*/
