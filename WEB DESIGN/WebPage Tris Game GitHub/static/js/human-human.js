/*FINIRE FUNZIONE WIN AND DRAW. 
FARE DESIGN PAGINA HOME DI SCELTA PERSONAGGIO E BACKGROUND
*/






flgUserMove = false


currentPlayer = startPlayer()


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


		if (flgUserMove === true) {
			if (grid[row][col] === null) {
				if (currentPlayer === "O") {
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
					flgUserMove = false

					if (currentPlayer === "O") {
						currentPlayer = "X"
					} else {
						currentPlayer = "O"
					} 
					animationPlayer(currentPlayer)
				}
			}
		}
	})
}



//------------------FUNZIONI---------------//
function startPlayer() {
	let r = Math.floor(Math.random() *2)

	if (r === 0) {		//PLAYER 1(IRONMAN) = O, PLAYER 2(THANOS) = X
		currentPlayer = "O"
	} else {
		currentPlayer = "X"		
	}
	animationPlayer(currentPlayer)

	return currentPlayer
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

		setTimeout(function() {
			flgUserMove = true
		}, 250)
    }
    
    currentPlayerAnimation[i].addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}

