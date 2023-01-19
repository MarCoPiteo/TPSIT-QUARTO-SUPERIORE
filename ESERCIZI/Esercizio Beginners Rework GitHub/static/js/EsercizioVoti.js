let form = document.querySelector("#myForm")

form.addEventListener("submit", function(e) {
	e.preventDefault()

	let inputText = document.querySelector("#user_input")

	let voto = inputText.value
	voto = parseFloat(voto)
	let tipoVoto = classVoto(voto)


	function classVoto(voto) {
			if (voto<6) {
				var classificVoto = `Il voto ${voto} è insufficiente`
			} else if (voto>=6 && voto<=6.9) {
				var classificVoto = `Il voto ${voto} è sufficiente`			
			} else if (voto>=7 && voto<=7.9) {			
				var classificVoto = `Il voto ${voto} è discreto`
			} else if (voto>=8) {			
				var classificVoto = `Il voto ${voto} è buono`
			}

			return classificVoto
		}

	let output = document.querySelector("#output")
	output.innerHTML = tipoVoto
})