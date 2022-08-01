function gameStart(gameField, numberOfCards) {

  // Создаем игровое поле
  let cardsArray = [],
      randomNumbers = [],
      firstCard = null,
      secondCard = null
      numberOfCards = numberOfCards

  for (let i = 1; i <= numberOfCards / 2; i++) {
    randomNumbers.push(i)
    randomNumbers.push(i)
  }

  randomNumbers = randomNumbers.sort(() => Math.random() - 0.5);

  for (const cardNumber of randomNumbers) {
    cardsArray.push(new User(gameField, cardNumber, flip))
  }

  console.log(randomNumbers)
  console.log(cardsArray)

  // Логика игры
  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true
        secondCard.success = true
        firstCard = null
        secondCard = null
      }
    }

    // Сброс игры
    if (document.querySelectorAll('.card.success').length == randomNumbers.length) {
      document.getElementById('play-again').classList.remove('hidden')
      clearInterval(newT)
    }

    document.getElementById('play-again').addEventListener('click', function() {
      gameField.innerHTML = ''
      cardsArray = [],
      randomNumbers = [],
      firstCard = null,
      secondCard = null
      gameStart(gameField, numberOfCards);
      document.getElementById('game').classList.add('hidden');
      document.getElementById('play-again').classList.add('hidden');
      currentCount = 60;
      // inputNumber.value = 0;
      console.log(inputNumber.value);
    })
  }
}

class User {
  card
  _open = false
  _success = false
  constructor(container, number, status) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = number;
    this.number = number

    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true;
        this.card.classList.add('open');
        status(this);
      } 
      console.log(this)
    })

    container.append(this.card);
  }

  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }

  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }

  get success() {
    return this._open
  }
}

// Таймер в 1 минуту. Начальные условия
const countdown = document.getElementById('timer');
countdown.innerText = 60;
let newT;
let currentCount;



// Кастомизация ползунка начального условия карточек. Игрок выбирает поле
// от 4 до 10 карточек

let leftButton = document.getElementById('l-btn');
let rightButton = document.getElementById('r-btn');
let inputNumber = document.getElementById('input');

leftButton.addEventListener('click', function() {
  let countDown = parseInt(inputNumber.value, 10)
  if (countDown > 4) {
    countDown = countDown - 2;
    inputNumber.value = countDown
  }
  console.log(inputNumber.value)
});

rightButton.addEventListener('click', function() {
  let countDown = parseInt(inputNumber.value, 10)
  if (countDown < 10) {
    countDown = countDown + 2;
    inputNumber.value = countDown
  }
  console.log(inputNumber.value)
});


// Таймер в 1 минуту. Функция "startTimer" срабатывает при клике на кнопку "Начать игру"
function startTimer() {
  console.log(inputNumber.value)
  gameStart(document.getElementById('game'), inputNumber.value)
  a1.classList.remove('hidden');
  currentCount = 60;
  newT = setInterval(timerGo, 1000);

  function timerGo() {
    currentCount--
    countdown.innerText = currentCount

    if (currentCount < 1) {
      clearInterval(newT)
      document.getElementById('startingButton').classList.add('time-is-up')
      document.getElementById('game').classList.add('time-is-up')
      alert('Время вышло!')
      document.getElementById('play-again').classList.remove('hidden')

      document.getElementById('play-again').addEventListener('click', function() {
        document.getElementById('startingButton').classList.remove('time-is-up')
        document.getElementById('game').classList.remove('time-is-up')
        countdown.innerText = 60;
        gameField.innerHTML = ''
        cardsArray = [],
        randomNumbers = [],
        firstCard = null,
        secondCard = null
        gameStart(gameField, numberOfCards);
        document.getElementById('game').classList.add('hidden');
        document.getElementById('play-again').classList.add('hidden');
      })
    }
  }

}

let a1 = document.getElementById('game')
let gameStartingButton = document.getElementById('startingButton')
gameStartingButton.addEventListener('click', startTimer)