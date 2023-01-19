let form = document.querySelector("#myForm")

form.addEventListener("submit", function(e) {
	e.preventDefault()

	let inputText = document.querySelector("#user_input")

	let gradiFahrenheit = inputText.value
	gradiFahrenheit = parseFloat(gradiFahrenheit)


	let gradiCelsius = calcCelsius(gradiFahrenheit)

		function calcCelsius(Fahrenheit) {
			let operatoreFormula = 9/5 
			let Celsius = (gradiFahrenheit * operatoreFormula) + 32 

			return Celsius
		}

	let output = document.querySelector("#output")
	output.innerHTML = `I gradiFahrenheit da lei inseriti, equivalgono a ${gradiCelsius} Gradi Celsius`
})