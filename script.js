class Bullet {
  constructor(location, intervalId) {
    this.location = location;
    this.intervalId = intervalId;
  }

  moveBullet() {
    console.log(this); //!

    if (this.location % WIDTH === WIDTH - 1) {
      console.log("border"); //!
      clearInterval(this.intervalId);
      board.splice(this.location, 1, 0);
    }
    //check what's on the index next to it
    else if (
      board[this.location + 1] === 0 ||
      board[this.location + 1] === "bullet"
    ) {
      board.splice(this.location, 2, 0, "bullet");
      this.location = this.location + 1;
    } else if (board[this.location + 1] === "ufo") {
      console.log("Hit! Clear Interval"); //!
      clearInterval(this.intervalId);
      board.splice(this.location, 2, 0, 0);

      //!go into enemies[] , access the enemy that has location === where 'ufo' was spliced = [this.location + 1] set to dead
      enemies.forEach((enemy) => {
        if (enemy.location === this.location + 1) {
          enemy.destroyShip();
        }
      });

      /*
      if there is a UFO beside it
      clearinterval
      splice the bullet and the ufo
      get board location of ufo
      use this location to access enemy with same location in enemies[]
      set matching ufo to  'dead'
      set conditions in render to only render alive ufo

      */
    }
    render();
  }
}

class PlayerShip {
  constructor(health = 5, gameOver = false, score = 0, location = 260) {
    this.health = health;
    this.gameOver = gameOver;
    this.score = score;
    this.location = location;
  }

  moveShipLeft() {
    if (this.location % WIDTH !== 0) {
      board.splice(this.location, 1, 0);
      board.splice(this.location - 1, 1, "hero");
      this.location = this.location - 1;
      render();
    }
  }

  moveShipRight() {
    if (this.location % WIDTH !== WIDTH - 1) {
      board.splice(this.location, 1, 0);
      board.splice(this.location + 1, 1, "hero");
      this.location = this.location + 1;
      render();
    }
  }

  moveShipUp() {
    if (this.location - WIDTH >= 0) {
      board.splice(this.location, 1, 0);
      board.splice(this.location - WIDTH, 1, "hero");
      this.location = this.location - WIDTH;
      render();
    }
  }

  moveShipDown() {
    if (this.location + WIDTH <= 575) {
      board.splice(this.location, 1, 0);
      board.splice(this.location + WIDTH, 1, "hero");
      this.location = this.location + WIDTH;
      render();
    }
  }

  shootBullet() {
    if (board[this.location + 1] !== 0) {
      console.log("cant shoot"); //!
    } else {
      console.log("shoot"); //!
      let bullet = new Bullet(this.location + 1);
      board[bullet.location] = "bullet";
      bullet.intervalId = setInterval(bullet.moveBullet.bind(bullet), 500);
      render();
    }

    //i need to pass this to Bullet class
    //const bulletIntervalId = setInterval(bullet.moveBullet.bind(bullet), 500);
  }
}

class EnemyShip {
  static enemyNum = 0;

  constructor(health = 1, isAlive = true, location) {
    this.health = health;
    this.isAlive = isAlive;
    this.location = location;
    EnemyShip.enemyNum++;
  }

  destroyShip() {
    this.isAlive = false;
    EnemyShip.enemyNum--;
  }

  moveEnemyShipsUp() {
    board.splice(this.location, 1, 0);
    board.splice(this.location - WIDTH, 1, "ufo");
    this.location = this.location - WIDTH;
    render();
  }

  moveEnemyShipsDown() {
    board.splice(this.location, 1, "0");
    board.splice(this.location + WIDTH, 1, "ufo");
    this.location = this.location + WIDTH;
    render();
  }

  moveEnemyShipsLeft() {
    board.splice(this.location, 1, 0);
    board.splice(this.location - 1, 1, "ufo");
    this.location = this.location - 1;
    render();
  }
}

/*------------------
    CONSTANTS
--------------------*/
const WIDTH = 32;
const MARKER = {
  hero: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="40" transform="rotate(90)" fill="#FF237a" viewBox="0 0 256 256"><path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224Zm71.62-68.17-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83Zm-139.23,34Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM140,100a12,12,0,1,0-12,12A12,12,0,0,0,140,100Zm68,52.36-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"></path></svg>`,

  ufo: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" fill="#1fa23e" viewBox="0 0 256 256"><path d="M183.59,213.47a8,8,0,0,1-15.18,5.06l-8-24a8,8,0,0,1,15.18-5.06ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184Zm-37.47.41a8,8,0,0,0-10.12,5.06l-8,24a8,8,0,0,0,15.18,5.06l8-24A8,8,0,0,0,90.53,184.41ZM248,112c0,16.22-13.37,30.89-37.65,41.29C188.22,162.78,159,168,128,168s-60.22-5.22-82.35-14.71C21.37,142.89,8,128.22,8,112c0-8.37,3.67-20.79,21.17-32.5,11.37-7.61,26.94-13.76,45.18-17.85A63.64,63.64,0,0,1,173,50.45a64.84,64.84,0,0,1,9.11,11.3C223.43,71.09,248,89.74,248,112ZM176,96a47.66,47.66,0,0,0-6.06-23.35l-.06-.09A48.07,48.07,0,0,0,127.36,48C101.25,48.34,80,70.25,80,96.83v3a7.92,7.92,0,0,0,6.13,7.76A188.24,188.24,0,0,0,128,112a188.09,188.09,0,0,0,41.85-4.37A7.93,7.93,0,0,0,176,99.87Z"></path></svg>`,
  bullet: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" fill="#d03535" viewBox="0 0 256 256"><path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128Z"></path></svg>`,
  0: " ",
};

/*------------------
    STATE VARIABLES 
--------------------*/
let board; //32x18 map, long array
let player; //player.health, player.score, player.gameOver, player.location
let enemy; //EnemyShip.enemyNum
let enemies; //container for all the enemy instance
let isGoingDown; //direction enemies are going

/*-------------------
CACHED ELEMENTS
-------------------*/

//dynamically create divs in our HTML
const gameBoard = document.querySelector("#game-board");
for (let i = 0; i <= 575; i++) {
  let divTilesEl = document.createElement("div");
  divTilesEl.classList.add("tiles");
  gameBoard.appendChild(divTilesEl);
}

const divTilesArr = document.querySelectorAll(".tiles");

const healthNum = document.querySelector("#health-num");
const scoreNum = document.querySelector("#score-num");
const enemyNum = document.querySelector("#enemy-num");

/*------------------ 
    FUNCTIONS 
------------------*/

init();

function init() {
  board = [...Array(576).fill(0)]; //array length = 576, filled with 0s
  player = new PlayerShip();
  board[player.location] = "hero";
  const enemyLoc = [
    85, 86, 87, 88, 89, 90, 91, 92, 117, 118, 119, 120, 121, 122, 123, 124, 149,
    150, 151, 152, 153, 154, 155, 156, 181, 182, 183, 184, 185, 186, 187, 188,
    213, 214, 215, 216, 217, 218, 219, 220, 245, 246, 247, 248, 249, 250, 251,
    252, 277, 278, 279, 280, 281, 282, 283, 284,
  ];
  enemies = [];
  for (let i = 0; i < enemyLoc.length; i++) {
    board[enemyLoc[i]] = "ufo";
    enemy = new EnemyShip(1, true, enemyLoc[i]);
    enemies.push(enemy);
  }

  render();
}

function render() {
  renderBoard();
  renderStats();
}

function renderBoard() {
  board.forEach((square, idx) => {
    divTilesArr[idx].innerHTML = MARKER[square];
    // divTilesArr[idx].innerText = idx;
  });
}

function renderStats() {
  healthNum.innerText = `${player.health}`;
  scoreNum.innerText = `${player.score}`;
  enemyNum.innerText = `${EnemyShip.enemyNum}`;
}

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

// let moveEnemyID = setInterval(moveEnemy, 500);

function moveEnemy() {
  for (let i = 0; i < enemies.length; i++) {
    //bottom border
    if (enemies[i].location > 543) {
      enemies.forEach((enemy) => {
        if (enemy.isAlive) enemy.moveEnemyShipsLeft();
      });
      isGoingDown = false;
      break;
      //top border
    } else if (enemies[i].location < 32) {
      enemies.forEach((enemy) => {
        if (enemy.isAlive) enemy.moveEnemyShipsLeft();
      });
      isGoingDown = true;
      break;
    }
  }

  if (isGoingDown) {
    enemies.reverse();
    enemies.forEach((enemy) => {
      if (enemy.isAlive) enemy.moveEnemyShipsDown();
    });
    enemies.reverse();
  } else if (!isGoingDown) {
    enemies.forEach((enemy) => {
      if (enemy.isAlive) enemy.moveEnemyShipsUp();
    });
  }
}

/*
!Finish implementing Bullet movement and how it interacts with collisions
!Set win and lose conditions
!Create modal -> before playing
!Gather Sound Effects
!Look for 'logos' or images'
!CSS


!Refactor: splice movements into one
!Refactor: moveShip functions?

*/

/*
BUGS:
negative alien count
bullets getting stuck
*/
