// function welcomeMessage() {
//   alert("Welcome the good ol' fashion game of Rock, Paper, Scissors, Lizard and Spock! Remember the rules are simple!\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock");
// }

const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('.player-score');
const computerScoreElem = document.querySelector('.computer-score');
const resultElem = document.querySelector('#result');
const playAgainBtn = document.querySelector('#play-again');
const countdownElem = document.querySelector('#countdown');
const computerChoiceElem = document.querySelector('#computer-choice');
const matchHistoryElem = document.querySelector('matchHistory');
const matchResElem = document.querySelector('matchRes');
const winner = document.querySelector(".winner");

const weapons = ['rock', 'paper', 'scissors','lizard','spock'];
let playerScore = 0;
let computerScore = 0;
let countdown = 20;
let timeout;

// Function to generate random weapon for computer
function computerPlay() {
  const weaponIndex = Math.floor(Math.random() * weapons.length);
  return weapons[weaponIndex];
}

// Function to update score and display result
function updateScore(playerWeapon, computerWeapon) {
  clearTimeout(timeout);
  
  if (playerWeapon) {
    computerChoiceElem.innerHTML = `Computer choose: ${computerWeapon}.`;
    if (playerWeapon === computerWeapon) {
      resultElem.innerHTML = "It's a tie! Try again.";
      
      
    } else if (
      (playerWeapon === 'rock' && computerWeapon === 'scissors') ||
      (playerWeapon === 'paper' && computerWeapon === 'rock') ||
      (playerWeapon === 'scissors' && computerWeapon === 'paper') ||
      (playerWeapon === 'rock' && computerWeapon === 'lizard') ||
      (playerWeapon === 'paper' && computerWeapon === 'spock') ||
      (playerWeapon === 'scissors' && computerWeapon === 'lizard') ||
      (playerWeapon === 'lizard' && computerWeapon === 'spock') ||
      (playerWeapon === 'lizard' && computerWeapon === 'paper') ||
      (playerWeapon === 'spock' && computerWeapon === 'scissors') ||
      (playerWeapon === 'spock' && computerWeapon === 'rock')
            
    )  {
      resultElem.innerHTML = 'You win!';
      playerScore++;
      playerScoreElem.innerHTML = `Player: ${playerScore}`;
      // matchResElem.innerHTML = `Player: ${matchHistory}`;
      
    } else {
      resultElem.innerHTML = 'Computer wins!';
      computerScore++;
      computerScoreElem.innerHTML = `Computer: ${computerScore}`;
      
    }
    
    startTimer();
  } else {
    computerChoiceElem.innerHTML = `Game Over`;
    resultElem.innerHTML = 'You did not make a choice!';
    resultElem.style.color = 'red';
    stopTimer();
  
  }

  if (playerScore === 5) {
    resultElem.textContent = 'You win the game!';
    resultElem.innerHTML = 'You win the game!';
    resultElem.style.color = 'green';
    computerChoiceElem.innerHTML = 'Game Over';
    disableOptions();
    stopTimer();
  }

  if (computerScore === 5) {
    resultElem.style.color = 'red';
    computerChoiceElem.innerHTML = 'Game Over';
    disableOptions();
    stopTimer();
    
}

  }

  const checkHandHistory = () => {
    let table = document.getElementById("matchHistory");
    let row = table.insertRow(1);
    let cellPHand = row.insertCell();
    let cellCHand = row.insertCell();
    let matchRes = row.insertCell();

    cellPHand.innerHTML += `<td>${playerScore}</tr>`;
    cellCHand.innerHTML += `<td> ${computerScore} </td>`;
    matchRes.innerHTML += `<td> ${resultElem.innerHTML} </td>`;
    return;
}

// Function to handle player choice
function selectWeapon() {
  clearTimeout(timeout);
  countdownElem.innerHTML = '20';
  countdown = 20;
  const playerWeapon = this.id;
  const computerWeapon = computerPlay();
  updateScore(playerWeapon, computerWeapon);
  checkHandHistory(playerWeapon, computerWeapon);
}

// Function to start countdown timer
function startTimer() {
  countdown--;
  countdownElem.innerHTML = countdown;
  if (countdown === 0) {
    const computerWeapon = computerPlay();
    updateScore(null, computerWeapon);
  } else {
    timeout = setTimeout(startTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timeout);
  countdown = 20;
  countdownElem.textContent = countdown;
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  countdown = 20;
  playerScoreElem.innerHTML = 'Player: 0';
  computerScoreElem.innerHTML = 'Computer: 0';
  resultElem.innerHTML = 'Choose your weapon!';
  countdownElem.innerHTML = '20';
  resultElem.style.color = '#660033';
  computerChoiceElem.innerHTML = '';
  enableOptions();
  startTimer();
}

function disableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'none';
  });
}

function enableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'auto';
  });
}

// Event listeners
choices.forEach((choice) => choice.addEventListener('click', selectWeapon));
playAgainBtn.addEventListener('click', resetGame);

// Start countdown timer when page loads
countdownElem.innerHTML = countdown; // Set initial value of countdown in HTML
timeout = setTimeout(startTimer, 1000);


audioElement.play();

// function updateScores(result, points) {
//   if(result === 1) {
//     playerScore += points;
//   }
//   if(result === 2) {
//     computerScore += points;
//   }
//   if(result === 0) {
//     computerScore += 0;
//     playerScore += 0;
//   }
// }