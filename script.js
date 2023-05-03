class Ship {
  constructor(health, bullets) {
    this.health = health;
    this.bullets = bullets;
  }
}

class Bullet {
  constructor(speed) {
    this.speed = speed;
  }
}

class PlayerShip extends Ship {
  constructor(gameOver = false, score = 0) {
    super(5, 20);
    this.gameOver = gameOver;
    this.score = score;
  }

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

//TODO: Keep track of number of enemies left, enemyNum++ every time we instantiate enemyNum-- when they die?
class EnemyShip extends Ship {
  static enemyNum = 0;

  constructor(isAlive = true) {
    super(5, Infinity);
    this.isAlive = isAlive;
    EnemyShip.enemyNum++;
  }

  destroyShip() {
    this.isAlive = false;
    EnemyShip.enemyNum--;
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
player.gameOver;
player.score;

/*-------------------
    CACHED ELEMENTS
-------------------*/
const gameBoard = document.querySelector("#game-board");
for (let i = 0; i <= 575; i++) {
  let divTilesEl = document.createElement("div");
  divTilesEl.classList.add("tiles");
  gameBoard.appendChild(divTilesEl);
}
//Starting Point
const divTilesArr = [...document.querySelectorAll(".tiles")];
divTilesArr[260].classList.add("player");

/*------------------ 
    EVENT LISTENERS 
-------------------*/
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
    default:
      console.log("Invalid key input"); //TODO: replace with 'buzz/error' sound
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

/*
HOW TO SHOOT:
find player position = playerShipIndex
find it's center = width/2 ?
create an element w/ class='bullet' ?
make it move along the div array ?
checking for collisions along the way
  if collision is detected, run collide function () = > {
    delete bullet (remove class)
    delete enemy (remove class)
    explode sounds
  }

*/
