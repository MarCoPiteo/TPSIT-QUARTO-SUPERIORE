
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
    document.querySelector(".urlBox").innerHTML = data.url
}

function catchCallback(error) {
    //console.log(error)
    error = "Mr. Chuck Norris doesn't have jokes"
    document.querySelector(".sentenceBox").innerHTML = error
}