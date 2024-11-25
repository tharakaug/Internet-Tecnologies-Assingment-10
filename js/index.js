$(document).ready(function () {
    const gameArea = $("#game-area");
    const playerCar = $("#player-car");
    let score = 0;
    let speed = 5;
    let gameInterval;
    let obstacleInterval;
  
    $(document).on("keydown", function (e) {
      const carPos = playerCar.position();
      switch (e.key) {
        case "ArrowLeft": 
          if (carPos.left > 0) playerCar.css("left", carPos.left - 20);
          break;
        case "ArrowRight":
          if (carPos.left < gameArea.width() - playerCar.width())
            playerCar.css("left", carPos.left + 20);
          break;
      }
    });
  
    function createObstacle() {
      const obstacle = $('<div class="obstacle"></div>');
      const obstacleLeft = Math.random() * (gameArea.width() - 50); 
      obstacle.css({ top: "-100px", left: obstacleLeft });
      gameArea.append(obstacle);
    }
  
    function moveObstacles() {
      $(".obstacle").each(function () {
        const obstacle = $(this);
        const obstaclePos = obstacle.position();
  
        obstacle.css("top", obstaclePos.top + speed);
  
        if (obstaclePos.top > gameArea.height()) {
          obstacle.remove();
          score += 10; 
          $("#score").text(score);
        }
  
        if (checkCollision(playerCar, obstacle)) {
          endGame();
        }
      });
    }
  
    function checkCollision(player, obstacle) {
      const p = player.position();
      const o = obstacle.position();
      return !(
        p.top + player.height() < o.top ||
        p.top > o.top + obstacle.height() ||
        p.left + player.width() < o.left ||
        p.left > o.left + obstacle.width()
      );
    }
  
    function startGame() {
      score = 0;
      speed = 5;
      $("#score").text(score);
      playerCar.css({ left: "175px", bottom: "20px" }); 
      $("#game-menu").addClass("hidden"); 
  
      gameInterval = setInterval(() => {
        moveObstacles();
        speed += 0.01; 
      }, 30);
  
      obstacleInterval = setInterval(createObstacle, 1000);
    }
  
    function endGame() {
      clearInterval(gameInterval);
      clearInterval(obstacleInterval);
      document.getElementById('message').style.display = 'block';
      $(".obstacle").remove(); 
      $("#play-btn").text("Restart"); 
      $("#game-menu").removeClass("hidden"); 
    }
  
    $("#play-btn").on("click", function () {
      startGame();
    });
  });
  