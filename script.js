class Ship {
  constructor(health, bullets) {
    this.health = health;
    this.bullets = bullets;
  }
}

class PlayerShip extends Ship {
  constructor(type) {
    super(5, 20);
    this.type = type; //TODO: Implement in the future? different ships?
  }

  moveShip() {
    //call this function whenever a key is pressed
    //!! switch-case VS if-else ?
    //define moveLeft(), moveRight(), moveUp(), moveDown()
    //run corresponding function depending on which arrow key is pressed, if not one of the four arrow keys, return
  }

  shootBullet() {
    //call this function when `shift` is pressed
    //on  press, create a new object (define a class for this?)
    //define how it moves, setInterval(ƒ moveBullet)
  }
}

class EnemyShip extends Ship {
  constructor(type) {
    super(5, Infinity);
    this.type = type; //TODO: Implement various enemies?
  }
}

/*------------------
    CONSTANTS
--------------------*/
const player = new PlayerShip("Basic");
const enemy = new EnemyShip("Basic");

/*------------------
    STATE VARIABLES 
--------------------*/
player.health;
player.bullets;

/*-------------------
    CACHED ELEMENTS
-------------------*/
const playerDiv = document.querySelector("#player");
const divTilesArr = document.querySelectorAll(".tiles");

/*------------------ 
    EVENT LISTENERS 
-------------------*/
document.addEventListener("keydown", () => {
  console.log("pressed");
});

/*------------------ 
    FUNCTIONS 
------------------*/
divTilesArr.forEach((divTile, index) => {
  divTile.innerText = index;
});

//TODO: moveLeft(), moveRight(), moveUp(), moveDown()
