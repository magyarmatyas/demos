const h1 = () => {
    document.querySelector(".title").innerHTML = `<img src="img.jpg">`;
}

document.querySelector(".title").addEventListener("click", h1);