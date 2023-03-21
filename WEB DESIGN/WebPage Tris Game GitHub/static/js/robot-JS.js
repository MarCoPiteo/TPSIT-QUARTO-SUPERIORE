//FINIRE DI FARE START PLAYER FACENDO SCEGLIERE QUALE DEI DUE DEVE ESSERE


flgUserMove = true

let userPlayer = startPlayer()
currentPlayer = userPlayer 



for (let i = 0; i < link.length; i++) {
	let l = link[i]

	l.addEventListener("click", function (e) {
		e.preventDefault()
		
		let win = false
		let draw = false

		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)
		let resultMatch = null	

		//if (flgAnimationStop)		DA FARE
		if (flgUserMove === true) {
			if (grid[row][col] === null) {
				if (userPlayer === "O") {
					casella.classList.add("player1Play")
				} else {
					casella.classList.add("player2Play")
				}
				grid[row][col] = currentPlayer
	
					removeMove(currentPlayer)
	
	//CHECK RISULTATO//
				resultMatch = resultMatchCheck(currentPlayer)
	
				if (resultMatch === "win") {
					setTimeout(function() {
						winUpdate()
						restartCleaning()
					}, 1000)
				} else if (resultMatch === "draw") {
					setTimeout(function() {
						restartCleaning()
					}, 500)
				} else if (resultMatch === null) {
					if (userPlayer === "O") {
						currentPlayer = "X"
					} else {
						currentPlayer = "O"
					} 
					flgUserMove = false

					animationPlayer(currentPlayer)
	
	
	
					//COMPUTER MOVE//
					setTimeout(function(){
						let computerMove = getBestMove(grid)
						grid[computerMove[0]][computerMove[1]] = currentPlayer
	
						let computerCasella = document.querySelector(`.pitchSquare[data-row="${computerMove[0]}"][data-col="${computerMove[1]}"]`)
	
						if (userPlayer === "O") {
							computerCasella.classList.add("player2Play")
						} else {
							computerCasella.classList.add("player1Play")
						}
	
	
						resultMatch = resultMatchCheck(currentPlayer)
	
						if (resultMatch === "win") {
							setTimeout(function() {
								winUpdate()
								restartCleaning()
							}, 1000)
						} else if (resultMatch === "draw") {
							setTimeout(function() {
								restartCleaning()
							}, 500)
						} else if (resultMatch === null) {
							removeMove(currentPlayer)

							currentPlayer = userPlayer

							animationPlayer(currentPlayer)
						}
						flgUserMove = true
					}, 2000)
				}
			}
		}
	})
}
	


//------------------DA NON SPOSTARE---------------//
function startPlayer() {
	//PAGINA HOME PER INIZIO GIOCO

	let userPlayer = "O"

	animationPlayer(userPlayer)

	return userPlayer
}

function getBestMove(grid) {
	let emptyCells = getEmptyCells(grid)

	let move = []
	move = emptyCells[0]

	emptyCells.pop()

	return move
}

function animationPlayer(currentPlayer) {
	const animateCSS = (element = '.playerImages', animation = 'pulse', prefix = 'animate__', 
		duration = 'slow', repeating = 'repeat-1')

  new Promise((resolve, reject) => {
	let i = 0
    const bounce = `${prefix}${animation}`;
    const slower = `${prefix}${duration}`
    const repeat = `${prefix}${repeating}`

    const currentPlayerAnimation = document.querySelectorAll(element);

    if (currentPlayer === "O") {
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