function update_page() {
    document.getElementById("page").style.height = window.innerHeight + "px";
    change_colour();
}

function change_colour() {
    var colour = "#" + Math.floor(Math.random() * 16777215).toString(16);

    document.body.style.backgroundColor = colour;
    document.getElementById('the-color').textContent = colour;
}
