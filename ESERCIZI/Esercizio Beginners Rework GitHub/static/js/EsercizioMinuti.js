let form = document.querySelector("#myForm")

form.addEventListener("submit", function(e) {
	e.preventDefault()

	let inputTextOre = document.querySelector("#user_input_ore")
	let inputTextMinuti = document.querySelector("#user_input_minuti")

	let ore = inputTextOre.value
	ore = parseInt(ore)

	let minuti = inputTextMinuti.value
	minuti = parseInt(minuti)

	let millisecondi = calcMillisecondi(minuti)

	function calcMillisecondi(minutes) {
		let minutiDaTrasformare = (ore * 60) + minutes
		let milliseconds = minutiDaTrasformare*60*1000

		return milliseconds
	}

	let output = document.querySelector("#output")
	output.innerHTML = `Le ore e i minuti da lei inseriti, corrispondono a ${millisecondi} millisecondi`
})