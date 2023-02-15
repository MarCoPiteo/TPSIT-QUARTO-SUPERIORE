let link = document.querySelectorAll(".pitchSquare")
let restart = document.querySelector(".btnRestart")
let resetWinBtn = document.querySelector(".btnResetWin")

let grid = [
	[null, null, null], 
	[null, null, null], 
	[null, null, null]
]

let playerLifeRemove

let player1Wins = 0
let player2Wins = 0


let userPlayer = "O"
let currentPlayer = start()



for (let i = 0; i < link.length; i++) {
	let l = link[i]
	l.addEventListener("click", function (e) {
		e.preventDefault()
		
		let win = false
		let draw = false
		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)


		if (grid[row][col] === null) {
			if (currentPlayer === userPlayer) {
				casella.classList.add("player1Play")

				grid[row][col] = currentPlayer
				removeMove(currentPlayer)

				win = checkWinner(currentPlayer)
				if (win === true) {
					//win() 		SVILUPPARE FUNZIONE PER DARE LA VITTORIA

					winUpdate()
					restartCleaning()
				} else {
					draw = fullCellsCheck()

					if (draw === true)  {
						//draw		SVILUPPARE FUNZIONE PER DARE IL PAREGGIO
						restartCleaning()
					} else {
						currentPlayer = "X"
					}
				}
				animationPlayer(currentPlayer)		
			} 
			
			setRandomMove(grid)

			casella.classList.add("player2Play")

			grid[row][col] = currentPlayer
			removeMove(currentPlayer)
			

			
		}
	})
}
restart.addEventListener("click", function(e) {			//CHIEDERE IL PERCHE, SE METTO L'EVENTLISTENER DEL RESTART, NEL FOR PRINCIPALE, VIENE MANDATO IN ESECUZIONE PIU VOLTE, SFASANDO L'ANIMAZIONE. FUORI DA QUEL FOR, INVECE NO.
	e.preventDefault()

	restartCleaning()
})


//FUNZIONI

function setRandomMove(grid) {
	let emptyCells = getEmptyCells(grid)

	//Math.floor(Math.random() * (emptyCells.length - 1) +)
}


function getEmptyCells(grid) {
	let emptyCells = []
	let b = 0

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === null) {
				emptyCells.push(`${i} ${j}`)
			}
		}
	}

	return emptyCells
}


function start() {
	let r = Math.floor(Math.random() *2)

	if (r === 0) {		//PLAYER 1(IRONMAN) = O, PLAYER 2(THANOS) = X
		currentPlayer = userPlayer
	} else {
		currentPlayer = "X"	
	}
	animationPlayer(currentPlayer)

	return currentPlayer
}	

function animationPlayer(currentPlayer) {
const animateCSS = (element = '.playerImages', animation = 'pulse', prefix = 'animate__', 
	duration = 'slow', repeating = 'repeat-2')

  new Promise((resolve, reject) => {
	let i = 0
    const bounce = `${prefix}${animation}`;
    const slower = `${prefix}${duration}`
    const repeat = `${prefix}${repeating}`

    const currentPlayerAnimation = document.querySelectorAll(element);

    if (currentPlayer === userPlayer) {
    	i = 0
    } else if (currentPlayer === "X") {
    	i = 1
    }

	currentPlayerAnimation[i].classList.add(`${prefix}animated`, bounce, slower, repeat);

    function handleAnimationEnd(event) {
		event.stopPropagation();
		currentPlayerAnimation[i].classList.remove(`${prefix}animated`, bounce, slower, repeat);
		resolve('Animation ended');
    }
    
    currentPlayerAnimation[i].addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}





function removeMove(currentPlayer) {
	if (currentPlayer === "O") {
		playerLifeRemove = document.querySelectorAll(".player1LifeImage")
	} else if (currentPlayer === "X") {
		playerLifeRemove = document.querySelectorAll(".player2LifeImage")
	}

	for (let i = 0; i < playerLifeRemove.length; i++) {
		if (playerLifeRemove[i].dataset.move === "0") {
			playerLifeRemove[i].classList.add("removeMove")

			playerLifeRemove[i].dataset.move = "1"
			return
		}
	}	
}


function winUpdate() {
	let winOutput

	if (currentPlayer === "O") {
		player1Wins += 1

		winOutput = document.querySelector(".player1Win")
		winOutput.innerHTML = player1Wins
	} else if (currentPlayer === "X") {
		player2Wins += 1

		winOutput = document.querySelector(".player2Win")
		winOutput.innerHTML = player2Wins
	}
}

function fullCellsCheck() {
	let fullCells = 0

	for (let i = 0; i < link.length; i++) {
		if (link[i].dataset.stato != "null") {
			fullCells += 1
		}

		if (fullCells >= 8) {
			return true
		}
	}
}


function checkWinner(currentPlayer) {
	if (link[0].dataset.stato === currentPlayer && link[3].dataset.stato === currentPlayer && 
		link[6].dataset.stato === currentPlayer) {		//COLONNA SINISTRA
		return true
	console.log("vittoria")
	} else if (link[1].dataset.stato === currentPlayer && link[4].dataset.stato === currentPlayer && 
		link[7].dataset.stato === currentPlayer) {		//COLONNA CENTRALE
		return true
		console.log("vittoria")
	} else if (link[2].dataset.stato === currentPlayer && link[5].dataset.stato === currentPlayer && 
		link[8].dataset.stato === currentPlayer) {		//COLONNA DESTRA
		return true
		console.log("vittoria")
	} else if(link[0].dataset.stato === currentPlayer && link[1].dataset.stato === currentPlayer && 
		link[2].dataset.stato === currentPlayer) { 		//RIGA ALTA
		return true
		console.log("vittoria")
	} else if (link[3].dataset.stato === currentPlayer && link[4].dataset.stato === currentPlayer && 
		link[5].dataset.stato === currentPlayer) {		//RIGA CENTRALE
		return true
		console.log("vittoria")
	} else if (link[6].dataset.stato === currentPlayer && link[7].dataset.stato === currentPlayer && 
		link[8].dataset.stato === currentPlayer) {		//RIGA BASSA
		return true
		console.log("vittoria")
	} else if (link[0].dataset.stato === currentPlayer && link[4].dataset.stato === currentPlayer && 
		link[8].dataset.stato === currentPlayer) {		//DIAGONALE SINISTRA-DESTRA
		return true
		console.log("vittoria")
	} else if (link[2].dataset.stato === currentPlayer && link[4].dataset.stato === currentPlayer && 
		link[6].dataset.stato === currentPlayer) {		//DIAGONALE DESTRA-SINISTRA
		return true
		console.log("vittoria")
	} else {
		return false
	} 
}

















/*function humanPlayerChoice() {
	let humanPlayerChoice = 
}*/







