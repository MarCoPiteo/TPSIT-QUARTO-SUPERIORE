let form = document.querySelector("#myForm")

form.addEventListener("submit", function(e) {
	e.preventDefault()

	let inputTextOra = document.querySelector("#user_input_ora")
	let orarioItalia = inputTextOra.value
    orarioItalia = parseInt(orarioItalia)

    if (orarioItalia>=24 || orarioItalia<0) {
    	let outputOreMinuti = document.querySelector("#outputNY")
		outputOreMinuti.innerHTML = "Inserisci un ora Italiana giusta"
    } else if (orarioItalia<=23 || orarioItalia>=0) {
    	if (orarioItalia==0) {
        	orarioItalia=24
    	}	

	    let inputTextMinuti = document.querySelector("#user_input_minuti")
    	let minutiItalia = inputTextMinuti.value
        minutiItalia = parseInt(minutiItalia)

        if (minutiItalia>59 || minutiItalia<=0) {
            outputOreMinuti = document.querySelector("#outputNY")
			outputOreMinuti.innerHTML = "Inserisci i minuti giusti"
        } else {
        	let c = 24 - orarioItalia

		    let fusoNY = calcFusoNY(orarioItalia, c)
		    let fusoTokyo = calcFusoTokyo(orarioItalia, c)
		    let fusoMosca = calcFusoMosca(orarioItalia, c)

		    function calcFusoNY(ItalyTime, operatore) {    
		        let orarioNY = ItalyTime - 6
		        let NYtime = (ItalyTime + operatore + orarioNY)%24   

		        return NYtime 
		    }
		    function calcFusoTokyo(ItalyTime, operatore) {
		        let orarioTokyo = ItalyTime + 7
		        let TokyoTime = (ItalyTime + operatore + orarioTokyo)%24

		        return TokyoTime
		    }
		    function calcFusoMosca(ItalyTime, operatore) {
		        let orarioMosca = ItalyTime + 1
		        let MoscaTime = (ItalyTime + operatore + orarioMosca)%24

		        return MoscaTime
		    }

			outputNY = document.querySelector("#outputNY")
			outputTokyo = document.querySelector("#outputTokyo")
			outputMosca = document.querySelector("#outputMosca")

			outputNY.innerHTML = `A New York sono le ore ${fusoNY}.${minutiItalia}`
			outputTokyo.innerHTML = `A Tokyo sono le ore ${fusoTokyo}.${minutiItalia}`
			outputMosca.innerHTML = `A Mosca sono le ore ${fusoMosca}.${minutiItalia}`
	    }
    }
})