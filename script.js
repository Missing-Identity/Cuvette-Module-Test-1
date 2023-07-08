let playerScore = localStorage.getItem('playerScore') ? Number(localStorage.getItem('playerScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? Number(localStorage.getItem('computerScore')) : 0;

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'draw';
    }
    if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')) {
        return 'win';
    }
    return 'lose';
}

function updateScores() {
    document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
}


function handleClick(choice) {
    let computerChoice = computerPlay();
    let result = playRound(choice, computerChoice);

    // Hide all battle icons
    let battleIcons = document.getElementsByClassName('battle-icon');
    for (let i = 0; i < battleIcons.length; i++) {
        battleIcons[i].style.display = 'none';
    }

    // Show the selected battle icons
    document.getElementById(`player-${choice}`).style.display = 'block';
    document.getElementById(`computer-${computerChoice}`).style.display = 'block';

    if (result === 'win') {
        playerScore++;
        document.getElementById('message').textContent = "You win this round!";
        document.getElementById('message').classList.add('win');
    }
    else if (result === 'lose') {
        computerScore++;
        document.getElementById('message').textContent = "You Lost against PC!";
        document.getElementById('message').classList.remove('win');
    }
    else {
        document.getElementById('message').textContent = "It's a draw!";
        document.getElementById('message').classList.remove('win');
    }
    document.getElementById('choices').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    updateScores();

    // Check if either player has reached 16 points after scores are updated
    if (playerScore === 5 || computerScore === 5) {
        displayWinner(playerScore === 16 ? 'Player' : 'Computer');
    } else {
        document.getElementById('choices').style.display = 'none';
        document.getElementById('result').style.display = 'block';
    }

    // Call updateScores to update score display
    updateScores();
}

function displayWinner(winner) {
    document.getElementById('result').style.display = 'none';
    document.getElementById('winnerScreen').style.display = 'block';
    document.getElementById('winner').textContent = `${winner} wins!`;
    playerScore = 0;
    computerScore = 0;
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
    updateScores();
}





document.getElementById('rock').addEventListener('click', function () {
    handleClick('rock');
});

document.getElementById('paper').addEventListener('click', function () {
    handleClick('paper');
});

document.getElementById('scissors').addEventListener('click', function () {
    handleClick('scissors');
});

document.getElementById('playAgain').addEventListener('click', function () {
    document.getElementById('choices').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('winnerScreen').style.display = 'none'; // hide the winner screen

    // Hide the winner's trophy
    document.getElementById('winner').textContent = '';

    // Hide all battle icons
    let battleIcons = document.getElementsByClassName('battle-icon');
    for (let i = 0; i < battleIcons.length; i++) {
        battleIcons[i].style.display = 'none';
    }

    // Reveal choice buttons
    let choiceButtons = document.getElementsByClassName('choice-btn');
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].style.display = 'block';
    }
});

var modal = document.getElementById('rulesModal');
var btn = document.getElementById("rules");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

updateScores(); // initialize the scores when the game loads
