flgUserMove = false
currentPlayer = startPlayer()


for (let i = 0; i < link.length; i++) {
	let l = link[i]
	l.addEventListener("click", function (e) {
		e.preventDefault()
		
		/*let win = false
		let draw = false*/

		let casella = e.currentTarget,
			row = parseInt(e.currentTarget.dataset.row),
			col = parseInt(e.currentTarget.dataset.col)
		let resultMatch = null			


		if (flgUserMove === true) {
			if (grid[row][col] === null) {
				if (currentPlayer === "O") {
					casella.classList.add("playerOPlay")
				} else {
					casella.classList.add("playerXPlay")
				}
				grid[row][col] = currentPlayer
				playAudio(`../static/mp3/player${currentPlayer}.mp3`)
				removeMove(currentPlayer)
					
				//CHECK RISULTATO//
				resultMatch = resultMatchCheck(grid)
						
				if (resultMatch != null) {
					if (resultMatch != "draw") {
						setTimeout(function() {
							winUpdate()
							restartCleaning()
						}, 1000)
					} else if (resultMatch === "draw") {
						setTimeout(function() {
							restartCleaning()
						}, 500)
					}
				} else if (resultMatch === null) {
					flgUserMove = false
					
					currentPlayer = currentPlayer === "O" ? "X" : "O" 

					animationPlayer(currentPlayer)

					setTimeout(function() {
						flgUserMove = true
					}, 2400)
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
	setTimeout(function() {
		flgUserMove = true
	}, 2400)

	return currentPlayer
}