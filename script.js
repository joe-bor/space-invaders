  /*
    Your code is immaculate, and I noticed you got the enemy ships to fire back at the 
    player! Congrats! 
    I noticed that the enemy bullets can 'erased' by a single bullet fired by the 
    player, as dictated by the moveBullet() method of enemyBullet, which has as a 
    condition: 
      else if (board[this.location - 1] instanceof Bullet) {
        board.splice(this.location, 1, 0);
        clearInterval(this.intervalId);) 
      }
    So when the two bullets 'collide' and occupy the same space, the enemyBullet is 
    nullified. I do not know if this is standard Space Invaders mechanics, but it
    appears to make it nearly impossible to lose because when the player 'sprays and 
    prays' they can't be hit by bullets. you could implement some functionality to 
    remember or store the 'next' location of the enemy bullet and so that when it occu-
    pies the same space as the player bullet, it does not get erased from the board. 
    You could possibly have a seperate variable store the hypothetical next location 
    of the bullet so that when it does occupy the same space as a player bullet, the 
    interval will skip to the variable where the hypothetical next location would be.
    
    I read through and was impressed with your rigorous application of objects and classes!
    I also wanted to applaud your use of ternary conditions for cleaner, dryer code!
    Your key handling function was very smooth as well; I know for mine I used a single 
    function to handle all movements, using if-else conditionals to parse out the functionality
    for each button. I noticed how you used switch-case for the same functionality. This
    is more readable and succinct than the bulky if-else statements. It is also unique
    how you used a function for keyboard event handling instead of an eventListener.
  */
class Bullet {
  constructor(
    owner,
    location,
    intervalId,
    image = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" fill="#d03535" viewBox="0 0 256 256"><path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128Z"></path></svg>`
  ) {
    this.owner = owner;
    this.location = location;
    this.intervalId = intervalId;
    this.image = image;
  }

  moveBullet() {
    //bullet disappears at right edge
    if (this.location % WIDTH === WIDTH - 1) {
      board.splice(this.location, 1, 0);
      clearInterval(this.intervalId);
    }
    //check what's on the index next to it
    else if (board[this.location + 1] instanceof Bullet) return;
    else if (board[this.location + 1] === 0) {
      board.splice(this.location, 2, 0, this);
      this.location += 1;
    } else if (board[this.location + 1] instanceof EnemyShip) {
      board.splice(this.location, 1, 0);
      this.location += 1;
      clearInterval(this.intervalId);
      this.collideBullet(board[this.location]);
    }
    render();
  }

  collideBullet(ship) {
    //check enemies[] for match
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].location !== this.location) continue;
      else {
        board.splice(this.location, 1, 0);
        this.owner.updateScore(ship);
        ship.damageShip();
      }
    }
  }
}

class EnemyBullet {
  constructor(
    owner,
    location,
    intervalId,
    image = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" fill="#d03535" viewBox="0 0 256 256"><path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128Z"></path></svg>`
  ) {
    this.owner = owner;
    this.location = location;
    this.intervalId = intervalId;
    this.image = image;
  }

  moveBullet() {
    if (this.location % WIDTH === 0) {
      board.splice(this.location, 1, 0);
      clearInterval(this.intervalId);
    }
    //check what's on the index next to it
    else if (board[this.location - 1] instanceof Bullet) {
      board.splice(this.location, 1, 0);
      clearInterval(this.intervalId);
    } else if (board[this.location + -1] === 0) {
      board.splice(this.location, 1, 0);
      this.location -= 1;
      board.splice(this.location, 1, this);
    } else if (board[this.location - 1] instanceof PlayerShip) {
      board.splice(this.location, 1, 0);
      this.location -= 1;
      clearInterval(this.intervalId);
      this.collideBullet(board[this.location]);
    }
    render();
  }

  collideBullet(ship) {
    board.splice(this.location, 0);
    ship.damageShip();
  }
}

class PlayerShip {
  constructor(
    health = 5,
    isGameOver = false,
    isWinner = false,
    score = 0,
    location = 260,
    bullets = [],
    image = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="40" transform="rotate(90)" fill="#FF237a" viewBox="0 0 256 256"><path d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224Zm71.62-68.17-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83Zm-139.23,34Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM140,100a12,12,0,1,0-12,12A12,12,0,0,0,140,100Zm68,52.36-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"></path></svg>`
  ) {
    this.health = health;
    this.isGameOver = isGameOver;
    this.isWinner = isWinner;
    this.score = score;
    this.location = location;
    this.bullets = bullets;
    this.image = image;
  }

  moveShipLeft() {
    if (this.location % WIDTH !== 0) {
      if (board[this.location - 1] === 0) {
        board.splice(this.location, 1, 0);
        board.splice(this.location - 1, 1, this);
        this.location = this.location - 1;
        render();
      }
    }
  }

  moveShipRight() {
    if (this.location % WIDTH !== WIDTH - 1) {
      if (board[this.location + 1] === 0) {
        board.splice(this.location, 1, 0);
        board.splice(this.location + 1, 1, this);
        this.location = this.location + 1;
        render();
      }
    }
  }

  moveShipUp() {
    if (this.location - WIDTH >= 0) {
      if (board[this.location - WIDTH] === 0) {
        board.splice(this.location, 1, 0);
        board.splice(this.location - WIDTH, 1, this);
        this.location = this.location - WIDTH;
        render();
      }
    }
  }

  moveShipDown() {
    if (this.location + WIDTH <= 575) {
      if (board[this.location + WIDTH] === 0) {
        board.splice(this.location, 1, 0);
        board.splice(this.location + WIDTH, 1, this);
        this.location = this.location + WIDTH;
        render();
      }
    }
  }

  shootBullet() {
    if (board[this.location + 1] !== 0) {
      return;
    } else {
      let bullet = new Bullet(this, this.location + 1);
      this.bullets.push(bullet);
      board[bullet.location] = bullet;
      soundShoot.play();
      bullet.intervalId = setInterval(bullet.moveBullet.bind(bullet), 100);
      render();
    }
  }

  updateScore(ship) {
    this.score += ship.location % WIDTH;
  }

  damageShip() {
    this.health -= 1;

    if (this.health === 0) {
      this.isAlive = false;
      this.isGameOver = true;
    }
  }
}

class EnemyShip {
  static enemyNum = 0;

  constructor(
    health = 1,
    isAlive = true,
    location,
    image = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" fill="#1fa23e" viewBox="0 0 256 256"><path d="M183.59,213.47a8,8,0,0,1-15.18,5.06l-8-24a8,8,0,0,1,15.18-5.06ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184Zm-37.47.41a8,8,0,0,0-10.12,5.06l-8,24a8,8,0,0,0,15.18,5.06l8-24A8,8,0,0,0,90.53,184.41ZM248,112c0,16.22-13.37,30.89-37.65,41.29C188.22,162.78,159,168,128,168s-60.22-5.22-82.35-14.71C21.37,142.89,8,128.22,8,112c0-8.37,3.67-20.79,21.17-32.5,11.37-7.61,26.94-13.76,45.18-17.85A63.64,63.64,0,0,1,173,50.45a64.84,64.84,0,0,1,9.11,11.3C223.43,71.09,248,89.74,248,112ZM176,96a47.66,47.66,0,0,0-6.06-23.35l-.06-.09A48.07,48.07,0,0,0,127.36,48C101.25,48.34,80,70.25,80,96.83v3a7.92,7.92,0,0,0,6.13,7.76A188.24,188.24,0,0,0,128,112a188.09,188.09,0,0,0,41.85-4.37A7.93,7.93,0,0,0,176,99.87Z"></path></svg>`
  ) {
    this.image = image;
    this.health = health;
    this.isAlive = isAlive;
    this.location = location;
    EnemyShip.enemyNum++;
  }

  damageShip() {
    this.health -= 1;

    if (this.health === 0) this.destroyShip();
    return;
  }

  destroyShip() {
    if (this.isAlive === true) {
      soundInvaderKilled.play();
      this.isAlive = false;
      EnemyShip.enemyNum--;
    }
  }

  moveEnemyShipsUp() {
    board.splice(this.location, 1, 0);
    board.splice(this.location - WIDTH, 1, this);
    this.location = this.location - WIDTH;
    render();
  }

  moveEnemyShipsDown() {
    board.splice(this.location, 1, 0);
    board.splice(this.location + WIDTH, 1, this);
    this.location = this.location + WIDTH;
    render();
  }

  moveEnemyShipsLeft() {
    board.splice(this.location, 1, 0);
    board.splice(this.location - 1, 1, this);
    this.location = this.location - 1;
    render();
  }

  shootBullet() {
    let randomNum = Math.random();
    if (randomNum >= 0.8) {
      if (board[this.location - 1] instanceof EnemyShip) {
        return;
      } else {
        let enemyBullet = new EnemyBullet(this, this.location - 1);
        board[enemyBullet.location] = enemyBullet;
        enemyBullet.intervalId = setInterval(
          enemyBullet.moveBullet.bind(enemyBullet),
          100
        );
        render();
      }
    }
  }
}

/*------------------
    CONSTANTS
--------------------*/
const WIDTH = 32;
const soundShoot = new Audio("SoundEffects/shoot.wav");
const soundInvaderKilled = new Audio("SoundEffects/invaderKilled.wav");
const soundInvaderMove = new Audio("SoundEffects/invaderMove.wav");
const soundGameOver = new Audio("SoundEffects/retroGameOver.wav");
const soundPlayerWins = new Audio("SoundEffects/winner.wav");

/*------------------
    STATE VARIABLES 
--------------------*/
let board; //32x18 map, long array
let player; //player.health, player.score, player.gameOver, player.location
let enemy; //EnemyShip.enemyNum
let enemies; //container for all the enemy instance
let isGoingDown; //direction enemies are going
let moveEnemyID;

/*-------------------
  CACHED ELEMENTS
-------------------*/
//dynamically create div in our HTML
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
const statusBar = document.querySelector("#status-bar");
const modal = document.querySelector("dialog");
const playBtn = document.querySelector("#play-button");
const intro = document.querySelector("#intro");
const goal = document.querySelector(".goal");
const instructions = document.querySelector(".instructions");
const ulEl = document.querySelector("ul");
/*------------------ 
FUNCTIONS 
------------------*/
modal.showModal();

function init() {
  //create an array w/ length = 576 then fill with 0s
  board = [...Array(576).fill(0)];

  //create and put player on board
  player = new PlayerShip();
  board[player.location] = player;

  //sets invaders' locations
  const enemyLoc = [
    85, 86, 87, 88, 89, 90, 91, 92, 117, 118, 119, 120, 121, 122, 123, 124, 149,
    150, 151, 152, 153, 154, 155, 156, 181, 182, 183, 184, 185, 186, 187, 188,
    213, 214, 215, 216, 217, 218, 219, 220, 245, 246, 247, 248, 249, 250, 251,
    252, 277, 278, 279, 280, 281, 282, 283, 284,
  ];
  enemies = [];
  for (let i = 0; i < enemyLoc.length; i++) {
    enemy = new EnemyShip(1, true, enemyLoc[i]);
    board[enemyLoc[i]] = enemy;
    enemies.push(enemy);
  }
  moveEnemyID = setInterval(moveEnemy, 500);

  statusBar.style.visibility = "visible";

  document.addEventListener("keydown", handleKeyDown);

  render();
}

function render() {
  renderBoard();
  renderStats();
  if (checkForWin()) renderModalWin();
  if (checkForLose()) renderModalLose();
}

function renderBoard() {
  board.forEach((square, idx) => {
    divTilesArr[idx].innerHTML = square.image ? square.image : "";
  });
}

function renderStats() {
  healthNum.innerText = `${player.health}`;
  scoreNum.innerText = `${player.score}`;
  enemyNum.innerText = `${EnemyShip.enemyNum}`;
}

function renderModalWin() {
  soundPlayerWins.play();
  intro.style.fontSize = "6vmin";
  intro.style.textAlign = "center";
  intro.style.margin = "8vmin";
  intro.innerHTML = "<strong>Congratulations. You Won!</strong>";
  goal.style.textAlign = "center";
  goal.style.marginTop = "-2vmin";
  goal.style.fontSize = "2vmin";
  goal.innerHTML = "<em>Aren't you glad you got to use the Z key? 😜</em>";
  instructions.innerHTML =
    "Created by : <br> <span id='creator'>Joezari Borlongan <br> SEIR 321 FRANCES </span>";
  instructions.style.marginTop = "20vmin";
  instructions.style.fontSize = "3vmin";
  instructions.textAlign = "left";
  ulEl.remove();
  modal.showModal();
}

function renderModalLose() {
  soundGameOver.play();
  intro.style.fontSize = "6vmin";
  intro.style.textAlign = "center";
  intro.innerHTML = "<strong>GAME OVER  👾</strong>";
  goal.style.textAlign = "center";
  goal.innerText = "Sorry, Better luck next time!";
  modal.showModal();
}

function checkForWin() {
  if (EnemyShip.enemyNum === 0) {
    player.bullets.forEach((bullet) => {
      board.splice(bullet.location, 1, 0);
      clearInterval(bullet.intervalId);
    });
    player.isWinner = true;
    clearInterval(moveEnemyID);
    document.removeEventListener("keydown", handleKeyDown);
    return true;
  }
}

function checkForLose() {
  for (let enemy of enemies) {
    if (enemy.location % WIDTH === 0) {
      clearInterval(moveEnemyID);
      document.removeEventListener("keydown", handleKeyDown);
      player.isGameOver = true;
      return true;
    }
  }
  if (player.health === 0 || player.isAlive === false) {
    player.isGameOver = true;
    clearInterval(moveEnemyID);
    document.removeEventListener("keydown", handleKeyDown);
    return true;
  }
}

function moveEnemy() {
  for (let i = 0; i < enemies.length; i++) {
    //bottom border
    if (enemies[i].location > 543) {
      enemies.forEach((enemy) => {
        if (enemy.isAlive) {
          enemy.moveEnemyShipsLeft();
          enemy.shootBullet();
        }
      });
      isGoingDown = false;
      break;
      //top border
    } else if (enemies[i].location < 32) {
      enemies.forEach((enemy) => {
        if (enemy.isAlive) {
          enemy.moveEnemyShipsLeft();
          enemy.shootBullet();
        }
      });
      isGoingDown = true;
      break;
    }
  }

  if (isGoingDown) {
    enemies.reverse();
    enemies.forEach((enemy) => {
      if (enemy.isAlive) {
        enemy.shootBullet();
        enemy.moveEnemyShipsDown();
      }
    });
    enemies.reverse();
  } else if (!isGoingDown) {
    enemies.forEach((enemy) => {
      if (enemy.isAlive) {
        enemy.moveEnemyShipsUp();
        enemy.shootBullet();
      }
    });
  }
  soundInvaderMove.play();
}

function handleKeyDown(e) {
  if (player.isGameOver) return;
  if (player.isWinner) return;
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
      console.log("Invalid key input");
      break;
  }
}
/*------------------ 
    EVENT LISTENERS 
-------------------*/

playBtn.addEventListener("click", () => {
  modal.close();
  init();
});
