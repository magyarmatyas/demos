const gameArea = document.getElementById("game-area");
const score = document.getElementById("score-number");
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
const buttons = [up, down, left, right];
const highScoreNumber = document.getElementById("highscore-number");
let snake = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let foodPos = { x: 0, y: 0 };
let snakeBody = [];
let scoreNumber = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreNumber.innerText = `${highScore}`;
direction = "right";

const setSnakePos = () => {
  snake.x = Math.floor(Math.random() * 10 + 1);
  snake.y = Math.floor(Math.random() * 10 + 1);
};

const setFoodPos = () => {
  const random = () => {
    foodPos.x = Math.floor(Math.random() * 20 + 1);
    foodPos.y = Math.floor(Math.random() * 20 + 1);
  };

  random();

  if (foodPos.x === snake.x && foodPos.y === snake.y) {
    random();
  }
};

const gameLoop = () => {
  velocity = { x: 1, y: 0 };
  const check = () => {
    let html = `<div class="bg-red-600 row-span-1 col-span-1" style="grid-area: ${foodPos.y} / ${foodPos.x}"></div>`;
    if (snake.x === foodPos.x && snake.y === foodPos.y) {
      scoreNumber += 1;
      console.log(scoreNumber);
      score.innerHTML = scoreNumber;
      if (scoreNumber > highScore) {
        highScore = scoreNumber;
        highScoreNumber.innerText = `${highScore}`;
        localStorage.setItem("high-score", highScore);
      }
      setFoodPos();
      snakeBody.push({ x: foodPos.x, y: foodPos.y });
    }

    snake.x += velocity.x;
    snake.y += velocity.y;

    if (snakeBody.length > 0) {
      snakeBody.unshift({ x: snake.x, y: snake.y });
      snakeBody.pop();
    }

    snakeBody[0] = [snake.x, snake.y];

    snakeBody.forEach((body) => {
      html += `<div class="snake" style="grid-column-start: ${body[0]}; grid-row-start: ${body[1]}; background-color: white"></div>`;
    });

    gameArea.innerHTML = html;

    if (snake.x > 20 || snake.x < 1 || snake.y > 20 || snake.y < 1) {
      scoreNumber = 0;
      score.innerHTML = scoreNumber;
      snakeBody = [];
      gameArea.innerHTML = "";
      alert("Game Over");
      clearInterval(checking);
    }
    if (snakeBody.length > 0) {
      snakeBody.forEach((body) => {
        if (
          body != snakeBody[0] &&
          body[0] === snake.x &&
          body[1] === snake.y
        ) {
          scoreNumber = 0;
          score.innerHTML = scoreNumber;
          snakeBody = [];
          alert("Game Over");
          clearInterval(checking);
          gameArea.innerHTML = "";
        }
      });
    }
  };
  const checking = setInterval(check, 500);
};

up.addEventListener("click", () => {
  if (velocity.y !== 1) {
    velocity.x = 0;
    velocity.y = -1;
  }
});
down.addEventListener("click", () => {
  if (velocity.y !== -1) {
    velocity.x = 0;
    velocity.y = 1;
  }
});
left.addEventListener("click", () => {
  if (velocity.x !== 1) {
    velocity.x = -1;
    velocity.y = 0;
  }
});
right.addEventListener("click", () => {
  if (velocity.x !== -1) {
    velocity.x = 1;
    velocity.y = 0;
  }
});

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      if (velocity.x !== -1) {
        velocity.x = 1;
        velocity.y = 0;
      }
      break;
    case "ArrowLeft":
      if (velocity.x !== 1) {
        velocity.x = -1;
        velocity.y = 0;
      }
      break;
    case "ArrowUp":
      if (velocity.y !== 1) {
        velocity.x = 0;
        velocity.y = -1;
      }
      break;
    case "ArrowDown":
      if (velocity.y !== -1) {
        velocity.x = 0;
        velocity.y = 1;
      }
      break;
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (snakeBody.length === 0) {
      setSnakePos();
      setFoodPos();
      gameLoop();
    }
  });
});

addEventListener("keydown", (e) => {
  if (e.code === "Space" && snakeBody.length === 0) {
    setSnakePos();
    setFoodPos();
    gameLoop();
  }
});
