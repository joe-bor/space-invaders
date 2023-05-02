class Ship {
  constructor(health, bullets) {
    this.health = health;
    this.bullets = bullets;
  }
}

class PlayerShip extends Ship {
  constructor() {
    super(5, 20);
  }

  //TODO: add 'borders'
  moveShipLeft() {
    let playerShipIndex = divTilesArr.indexOf(
      document.querySelector(".player")
    );
    if (playerShipIndex % 32 !== 0) {
      divTilesArr[playerShipIndex].classList.remove("player");
      divTilesArr[playerShipIndex + -1].classList.add("player");
    }
  }

  moveShipRight() {
    let playerShipIndex = divTilesArr.indexOf(
      document.querySelector(".player")
    );
    if (playerShipIndex % 32 !== 31) {
      divTilesArr[playerShipIndex].classList.remove("player");
      divTilesArr[playerShipIndex + 1].classList.add("player");
    }
  }

  moveShipUp() {
    let playerShipIndex = divTilesArr.indexOf(
      document.querySelector(".player")
    );
    if (playerShipIndex - 32 >= 0) {
      divTilesArr[playerShipIndex].classList.remove("player");
      divTilesArr[playerShipIndex - 32].classList.add("player");
    }
  }

  moveShipDown() {
    let playerShipIndex = divTilesArr.indexOf(
      document.querySelector(".player")
    );
    if (playerShipIndex + 32 <= 575) {
      divTilesArr[playerShipIndex].classList.remove("player");
      divTilesArr[playerShipIndex + 32].classList.add("player");
    }
  }

  shootBullet() {
    //call this function when `shift` is pressed
    //on  press, create a new object (define a class for this?)
    //define how it moves, setInterval(ƒ moveBullet)
    console.log("shoot");
  }
}

class EnemyShip extends Ship {
  constructor() {
    super(5, Infinity);
  }
}

/*------------------
    CONSTANTS
--------------------*/
const player = new PlayerShip();
const enemy = new EnemyShip();

/*------------------
    STATE VARIABLES 
--------------------*/
player.health;
player.bullets;

/*-------------------
    CACHED ELEMENTS
-------------------*/
const playerDiv = document.querySelector("#player");
const divTilesArr = [...document.querySelectorAll(".tiles")];

/*------------------ 
    EVENT LISTENERS 
-------------------*/
//!! switch-case vs if-else ?
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.moveShipLeft();
      break;
    case "ArrowRight":
      player.moveShipRight();
      break;
    case "ArrowUp":
      player.moveShipUp();
      break;
    case "ArrowDown":
      player.moveShipDown();
      break;
    case "z":
      player.shootBullet();
      break;
  }
});

/*------------------ 
    FUNCTIONS 
------------------*/
//!! DELETE this later
divTilesArr.forEach((divTile, index) => {
  divTile.innerText = index;
});

/*
HOW TO MOVE:
Find the index of the element that has the class='player' indexOf() + classList.contains()? 
this would give us the location of our player in the tiles array

then remove class at current location.
move current index position
index + 1 =moveRight | index - 1 = moveLeft | index + 32 = moveDown | index -32 = moveUp
then add class="player" at current position
render
*/
