/*FINIRE FUNZIONE WIN AND DRAW. 
FINIRE FUNZIONE CHE TOGLIE LE MOSSE AGLI AVVERSARI
FARE DESIGN PAGINA HOME DI SCELTA PERSONAGGIO E BACKGROUND
FINIRE ANCHE BACKGROUND TRIS TABLE
FINIRE INDICATORE PERSONAGGIO CHE INIZIA
FINIRE CAMBIO NUMERO VITTORIE AI PLAYER*/


let link = document.querySelectorAll(".pitchSquare")
let restart = document.querySelector(".btnLink")

//let player1Life = document.querySelectorAll 	DA FINIRE

let currentPlayer
let r = Math.floor(Math.random() *2)

if (r === 0) {		//PLAYER 1(IRONMAN) = O, PLAYER 2(THANOS) = X
	currentPlayer = "O"
} else {
	currentPlayer = "X"
}
	
for (let i = 0; i < link.length; i++) {
	let l = link[i]

	l.addEventListener("click", function (e) {
		e.preventDefault()

		let win = false
		let draw = false
		let casella = e.currentTarget

		if (casella.dataset.stato === "null") {
			if (currentPlayer === "O") {
				casella.classList.add("player1Play")

				casella.dataset.stato = currentPlayer

				win = checkWinner(currentPlayer)
				if (win === true) {
					//win() 		SVILUPPARE FUNZIONE PER DARE LA VITTORIA
					restartCleaning()
				} else {
					draw = fullCellsCheck()

					if (draw === true) {
						//draw		SVILUPPARE FUNZIONE PER DARE IL PAREGGIO
						restartCleaning()

					} else {
						currentPlayer = "X"
					}

				}
			} else {
				casella.classList.add("player2Play")

				casella.dataset.stato = currentPlayer

				win = checkWinner(currentPlayer)
				if (win === true) {
					//win() 		SVILUPPARE FUNZIONE PER DARE LA VITTORIA
					restartCleaning()
				} else {
					draw = fullCellsCheck()

					if (draw === true)  {
						//draw		SVILUPPARE FUNZIONE PER DARE IL PAREGGIO
						restartCleaning()

					} else {
						currentPlayer = "O"
					}

				}
			}	
		}
	})

	restart.addEventListener("click", function(e) {
		e.preventDefault()

		restartCleaning()
	})
}



function restartCleaning() {
	for (let i = 0; i < link.length; i++) {
		if (link[i].dataset.stato === "O") {
			link[i].classList.remove("player1Play")
		} else {
			link[i].classList.remove("player2Play")
		}
		
		link[i].dataset.stato = "null"
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