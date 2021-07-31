const alphabet = 'abcdefghijklmnopqrstuvwxyz'; //Alphabet string which contain all alphabet in order
let gameStart = false;

let letterArray = [];
let letterString = '';
const buttonArray = [];
const boxArray = [];

let score = 0;
let health = 10;

//DOM Element
const buttonNodes = document.querySelectorAll('.alphabet-btn');
const buttons = Array.from(buttonNodes);
console.log(buttonNodes)
let dom_score = document.querySelector('[data-score]');
let dom_health = document.getElementById('health');

function createAlphabetBoxes() {
  const container = document.getElementById('playground');
  for (let i = 0; i < 26; i += 1) {
    const alphabet = document.createElement('div');
    alphabet.setAttribute('class', 'alphabet-box');

    const alphabetButton = document.createElement('button');
    alphabetButton.setAttribute('class', 'alphabet-btn');
    alphabetButton.setAttribute('data-alphabet', String.fromCharCode(97 + i));
    alphabetButton.innerText = String.fromCharCode(65 + i);
    buttonArray.push(alphabetButton);
    alphabet.appendChild(alphabetButton);
    boxArray.push(alphabet);
    container.appendChild(alphabet);
  }
}



// Function to display timer
const timerDisplay = document.querySelector('[data-timer]');
function displayTimer(usertime) {
  timerDisplay.innerHTML = usertime; // shows initial time
  let ticker = setInterval(countDown, 1000); // counts one second then calls function
  function countDown() {
    if (usertime == 0 || health == 0) {
      clearInterval(ticker); // stops the setInterval method
      buttons.forEach((button) => (button.disabled = true)); //disable all buttons after timer up
    } else {
      timerDisplay.innerHTML = usertime - 1; // -1 counteracts the one second delay at start
      usertime--;
    }
  }
}

// Function to check if character pick is in the right alphabet order

function checkAlphabet(str) {
  return str[0] == 'a' && alphabet.includes(str);
}

//  functon update helath and score
function updateStat(str) {
  if (checkAlphabet(str)) {
    // right answer
    score++;
    dom_score.textContent = score; // update score on dom
  } else {
    // wrong answer
    if (gameStart == false) {
      health = 10;
    } else health--;
    dom_health.value = health; // update health on dom
    letterArray.pop(); // removes last element from array
    return false;
  }
  return true;
}

function shuffle() {
  var container = document.getElementById('playground');
  var elementsArray = Array.prototype.slice.call(
    container.getElementsByClassName('alphabet-box')
  );
  elementsArray.forEach(function (element) {
    container.removeChild(element);
  });
  shuffleArray(elementsArray);
  elementsArray.forEach(function (element) {
    container.appendChild(element);
  });
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// functions to place the alphabets on random locations
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function placeRandom() {
  const playground = document.getElementById('playground');
  for(let i = 0; i < boxArray.length; i++){
    const randomTop = getRandomNumber(playground.offsetTop, playground.offsetHeight - 100);
    const randomLeft = getRandomNumber(playground.offsetLeft, playground.offsetWidth);

    boxArray[i].style.top = randomTop + 'px';
    boxArray[i].style.left = randomLeft + 'px';
  }
};

createAlphabetBoxes();


buttonArray.forEach((button) => {
  button.addEventListener('click', () => {
        letterArray.push(button.dataset.alphabet);
        shuffle();
        letterString = letterArray.join(''); // builds string to compare with checkAlphabet
        if (button.dataset.alphabet == 'a') {
          // timer begins when user presses "a"
          displayTimer(60);
          gameStart = true;
        }
        if (updateStat(letterString)) {
          button.disabled = true; // disable button if alphabet is picked in order.
        }
      });
});



placeRandom();
