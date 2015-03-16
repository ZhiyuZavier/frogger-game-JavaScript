// Enemies our player must avoid
var Enemy = function(RamdomX, RamdomY) {
    // Loading the image by setting this.sprite to the appropriate image in the image folder 
    this.sprite = 'images/enemy-bug.png';
    // Setting the Enemy initial location
    this.x = RamdomX;
    this.y = RamdomY;
};

// Handles collision with the Player
Enemy.prototype.collide = function() { 
    if (((this.y > player.y - 30) && (this.y < player.y + 30))&&
    ((this.x > player.x - 50) && (this.x < player.x + 30)))
    {    
    player.x = 200;
    player.y = 415;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 505){
		this.x = (this.x + dt * 75); // Setting the Enemy speed
		this.collide();
    }
    else {this.x = Math.floor(Math.random() * (-600)) - 100;} // recycle bugs to stage left
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
//one enemy each line, give them random starting points
	for (var index = 0; index < 3; index++) {
   		allEnemies[index] = new Enemy(Math.floor(Math.random() * (-600)) - 100, ((index+1)*55)+(index*30));
}

// The player we can control
var Player = function() {
	// Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/char-princess-girl.png';
    // Setting the Player initial location
    this.x = 200;
    this.y = 415;

};

// The update method for the Player				
Player.prototype.update = function(dt){}

// The render method for the Player
Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
}

// The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input.
Player.prototype.handleInput = function(direction){
	//Don't allow player to move off screen
			if (((this.y < 83) && (direction === "up"))||
				((this.y > 414) && (direction === "down"))||
				((this.x < 0) && (direction === "left"))||
				((this.x > 400) && (direction === "right")))

			{
				return;
			}
	         //Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.

	        if((this.y < 166) && ((direction === "left") || (direction === "right"))){
	        	setTimeout(this.reset(),3000);
	        }			
				else if (direction === "up"){
						this.y = this.y - 83;
							}
				else if (direction === "down"){
						this.y = this.y + 83;	
							}			
				else if (direction === "right"){
						this.x = this.x + 101;	
							}
				else if (direction === "left"){
						this.x = this.x - 101;	
							}

		};

// If the player reaches the water the game should be reset by moving the player back to the initial location
Player.prototype.reset = function(){
		this.x = 200;
		this.y = 415;	
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

// Place the player object in a variable called player
var player = new Player();
