const words = [
  { word: "javascript", hint: "A popular programming language" },
  { word: "ocean", hint: "A large body of water"},
  { word: "loop", hint: "Repeats a block of code until a condition is met"},
  { word: "elephant", hint: "The largest land animal" },
  { word: "variable", hint: "A container used to store data"},
  { word: "banana", hint: "A yellow tropical fruit" },
  {word: "dragon", hint:"A flying lizard"},
  {word:"cat", hint:"A carnivorous mammal"},
  {word:"france", hint:"A french speaking country"},
  {word:"dolphin", hint:"A small toothed whale"},
  {word:"spider", hint:"An insect in class arachnida"},
  {word:"salamander", hint:"An amphibian"},
  {word:"earth", hint:"the planet you live in"}
];

let selectedWord = "";
let maxGuesses = 5;
let correctGuesses = [];
let wrongGuesses = [];
let currentWordIndex = 0;


const hintElement = document.getElementById("text");
const blanksContainer = document.querySelector(".blanks");
const wrongLetterElement = document.getElementById("wrong-letter");
const remainingElement = document.getElementById("remaining");
const inputElement = document.getElementById("input");
const resetButton = document.getElementById("reset");

const popupCard = document.getElementById("popup-card");
const outcomeImage = document.getElementById("outcome-image");
const continueButton = document.getElementById("continue");
const resetGameButton = document.getElementById("reset-game");

function startGame() {
  resetOutcome();
  
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0;
  }
  
  const randomWord = words[currentWordIndex];
  selectedWord = randomWord.word.toLowerCase();
  correctGuesses = [];
  wrongGuesses = [];
  maxGuesses = 5;

  hintElement.textContent = randomWord.hint;
  remainingElement.textContent = maxGuesses;
  wrongLetterElement.textContent = "";
  blanksContainer.innerHTML = selectedWord
    .split("")
    .map(() => `<span>_</span>`)
    .join("");
}

function checkGuess(letter) {
  if (selectedWord.includes(letter)) {
    correctGuesses.push(letter);
    updateBlanks();
  } else {
    if (!wrongGuesses.includes(letter)) {
      wrongGuesses.push(letter);
      maxGuesses--;
      wrongLetterElement.textContent = wrongGuesses.join(", ");
      remainingElement.textContent = maxGuesses;
    }
  }

  if (maxGuesses === 0) {
    handleGameEnd(false); 
  } else if (!blanksContainer.textContent.includes("_")) {
    handleGameEnd(true); 
  }
}

function updateBlanks() {
  const blanks = selectedWord.split("").map((letter) =>
    correctGuesses.includes(letter) ? letter : "_"
  );
  blanksContainer.innerHTML = blanks.map((l) => `<span>${l}</span>`).join("");
}


function handleGameEnd(isWin) {
  showPopup(isWin);
  inputElement.disabled = true;
}

function showPopup(isWin) {
  popupCard.style.display = "flex";
  if (isWin) {
    outcomeImage.src = "smile.png";
    outcomeImage.alt = "You Won!";
    continueButton.style.display = "inline-block"; 
    resetGameButton.style.display = "none";
  } else {
    outcomeImage.src = "sad.png";
    outcomeImage.alt = "You Lost!";
    resetGameButton.style.display = "inline-block"; 
    continueButton.style.display = "none";
  }
}

function resetOutcome() {
  popupCard.style.display = "none";
  outcomeImage.style.display = "block";
  continueButton.style.display = "none";
  resetGameButton.style.display = "none";
  inputElement.disabled = false; 
}

inputElement.addEventListener("input", (e) => {
  const letter = e.target.value.toLowerCase();
  if (letter.match(/^[a-z]$/)) {
    checkGuess(letter);
  }
  e.target.value = "";
});

resetButton.addEventListener("click", startGame);

continueButton.addEventListener("click", () => {
  currentWordIndex++;
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0;
  }
  popupCard.style.display = "none";
  startGame();
});

resetGameButton.addEventListener("click", () => {
  currentWordIndex = 0;
  popupCard.style.display = "none";
  startGame();
});

startGame();