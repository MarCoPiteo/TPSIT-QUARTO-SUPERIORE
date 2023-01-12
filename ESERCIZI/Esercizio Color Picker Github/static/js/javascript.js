let link = document.querySelectorAll(".colorLink")
console.log(link)

for (let i=0; i<link.length; i++) {
	let l = link[i]

	l.addEventListener("click", function(e) {
		e.preventDefault()

		let el = e.currentTarget
		console.log(el.dataset.bgcolor)

		let body = document.querySelector("body")
		body.style.background = el.dataset.bgcolor
	})
}