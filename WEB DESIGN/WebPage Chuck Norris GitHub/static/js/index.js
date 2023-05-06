

document.querySelector("#categoriesForm").addEventListener("submit", function(e) {
    e.preventDefault()

    let categorySelected = document.querySelector(".categoriesSelector[name=categoriesSelector]").value
    
    console.log(categorySelected)
    if (categorySelected === "random") {
        fetch("https://api.chucknorris.io/jokes/random")
            .then(thenCallback)
            .then(finalCallback)
            .catch(catchCallback)
    } else {
        fetch(`https://api.chucknorris.io/jokes/random?category=${categorySelected}`)
            .then(thenCallback)
            .then(finalCallback)
            .catch(catchCallback)
    }
}) 


function thenCallback(response){
    //console.log(response)
    //console.log(response.status)

    if(response.status === 200){
        return response.json()
    }
}

function finalCallback(data) {
    console.log(data)
    //console.log(data.value)

    //QUI HO ACCESSO AL JSON FINALE
    document.querySelector(".sentenceBox").innerHTML = data.value

    document.querySelector(".urlBox").setAttribute('href', data.url)
    document.querySelector(".urlBox").classList.remove("disabled")    
}

function catchCallback(error) {
    //console.log(error)
    error = "Mr. Chuck Norris doesn't have jokes"
    document.querySelector(".sentenceBox").innerHTML = error
}


document.querySelector(".copyButton").addEventListener("click", function(e) {
    let CopyArea = document.querySelector(".sentenceBox");
    let copiedText = document.querySelector(".copyButton")


    let range = document.createRange();
    range.selectNode(CopyArea);

    navigator.clipboard.writeText(CopyArea.textContent);
    let CopyAler = document.execCommand('copy');

    copiedText.classList.add("transition")

    copiedText.innerHTML = "Copied Joke"
    setTimeout(function() {
        copiedText.innerHTML = "Copy"
    }, 2000)   
    return CopyAler;
})