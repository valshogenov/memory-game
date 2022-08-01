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

function startingConditions() {
  const gameField = document.getElementById('game');
  const playBtn = document.getElementById('startingButton');
  console.log(gameField)



  playBtn.addEventListener('click', gameStart(document.getElementById('game'), 8))

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

  gameField.classList.remove('hidden');

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
    })
  }
  }




}



startingConditions()