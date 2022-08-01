let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value
};

let a1 = document.getElementById('game')
let gameStartingButton = document.getElementById('startingButton')
gameStartingButton.addEventListener('click', function() {
  a1.classList.remove('hidden')
})

console.log(gameStartingButton)

function cardsOnStart() {
  console.log(output.innerText)
  return output.innerHTML;
}