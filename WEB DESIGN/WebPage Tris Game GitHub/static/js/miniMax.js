/*serve: 
1. getEmptyCells() 	DONE
2. chekWinner()		DONE*/
 

/*x --> umano --> min
  o --> robot --> max*/


let grid = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	],
currentPlayer = "O"

/*function getBestMove() {
	let bestScore = -Infinity,
		bestMove
	let emptyCells = getEmptyCells(grid)

	/*
		per ogni cella vuota:

		grid[i][j] = "O"

		chiamiamo miniMax -> ci restituice un punteggio da memorizzare in una variabile locale

		let currentScore -> conterrà il punteggio calcolato con miniMax ottenuto se metto il cerchio nella cella vuota [i, j]
		

		let currentCellScore = minimax(grid, "O")


		confronto currentCellScore con bestScore 
		
		if (currentCellScore > bestScore) :
			bestScore = currentCellScore
			bestMove = [i, j]


			
	
	return bestMove // -> [indiceRiga, indiceColonna]
}

function miniMax(grid, Giocatore) {
	/*
		IMPLEMENTATA CON LA RICORSIONE MI DEVE RESTITUIRE UN PUNTEGGIO 

		Caso Base:
		-  non ci sono piu mosse
		-	qualcuno ha vinto -> return -1 oppure return 1 
		-	non ci sono piu celle disponibili - pareggio -> return 0 

		else: -< se ci sono ancora mosse disponibili 
		let bestScore = -Infinity -> minimax dovrebbe essere applicato a max
		let empyCells = getEmptyCells(grid)
		per ogni cella:
		- riempiamo con il player corrente 
		- let score = minmax(grid, nextGiocatore)
		- grid[i][j]= null -> "cancellare" la mossa appena provata 
		- confrontare lo score corrente con bestScore: 
		bestScore= math.max (score, bestScore)

		return bestScore
	
}*/



function getBestMove() {
	let bestScore = -Infinity
	let	bestMove = []
	let emptyCells = getEmptyCells(grid)
	let currentCellScore = 0


	for (let index = 0; index < emptyCells.length; index++) {
		let empty = emptyCells[index]
		let i = empty[0]
		let j = empty[1]

		grid[i][j] = currentPlayer

		currentCellScore = miniMax(grid, currentPlayer)

		//bestScore = Math.max(currentCellScore, bestScore)

		if (currentCellScore > bestScore) {
			bestScore = currentCellScore

			bestMove = [i, j]
		} 

		grid[i][j] = null
	}

	return bestMove
}


function getEmptyCells(grid) {
	let emptyCells = []
	let b = 0

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === null) {
				emptyCells.push([i, j])
			}
		}
	}
	return emptyCells
}

function miniMax(grid, currentPlayer) {
	let result = 
	if (emptyCells === 0) {
		return bestScore
	} else {
		return grid  = currentPlayer
	}
}


	/*
function miniMax(grid, Giocatore) {
		IMPLEMENTATA CON LA RICORSIONE MI DEVE RESTITUIRE UN PUNTEGGIO 

		Caso Base:
		-  non ci sono piu mosse
		-	qualcuno ha vinto -> return -1 oppure return 1 
		-	non ci sono piu celle disponibili - pareggio -> return 0 

		else: -< se ci sono ancora mosse disponibili 

		per ogni cella:
		- riempiamo con il player corrente 
		- let score = minmax(grid, nextGiocatore)
		- grid[i][j]= null -> "cancellare" la mossa appena provata 
		- confrontare lo score corrente con bestScore: 
		bestScore= math.max (score, bestScore)

		return bestScore
	
}