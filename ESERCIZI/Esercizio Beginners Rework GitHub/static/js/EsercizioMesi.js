let form = document.querySelector("#myForm")

form.addEventListener("submit", function(e) {
	e.preventDefault()

	let inputText = document.querySelector("#user_input")

	let mese = inputText.value
	mese = mese.toLowerCase()
	let giorni = switchMesi(mese)

	let output = document.querySelector("#output")
	if (giorni === 0) {
		output.innerHTML = "Inserire un mese corretto"
	} else {
		output.innerHTML = `Il mese di ${mese} ha ${giorni} giorni`
	}


	function switchMesi(month) {
		let days

		switch (month) {
			case "febbraio":
				days = 28					
			break;

			case "aprile":
			case "giugno":
			case "settembre":
			case "novembre":
				days = 30
			break;
			
			case "gennaio":
			case "marzo":
			case "maggio":
			case "luglio":
			case "agosto":
			case "ottobre":
			case "dicembre":
				days = 31
			break;

			default:
				days = 0
			break;
		}	
		return days
	}
})