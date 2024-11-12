// dogGuessGame.js
// Dog breeds data
const dogBreeds = [
  {
    image: "https://example.com/beagle.jpg",
    name: "Beagle",
    options: ["Poodle", "Bulldog", "Beagle", "Chihuahua"]
  },
  {
    image: "https://example.com/poodle.jpg",
    name: "Poodle",
    options: ["Poodle", "German Shepherd", "Labrador", "Boxer"]
  },
  {
    image: "https://example.com/bulldog.jpg",
    name: "Bulldog",
    options: ["Bulldog", "Pug", "Shih Tzu", "French Bulldog"]
  },
  // Add more breeds here...
];

let currentQuestion = 0;
let score = 0;
let seconds = 0;
let intervalId;

// Load first question
loadQuestion();
startTimer();

// Function to load question
function loadQuestion() {
  const dogImage = document.getElementById("dog-image");
  const options = document.querySelectorAll(".options button");
  const result = document.getElementById("result");
  const nextQuestionButton = document.getElementById("next-question");
  const gameHeader = document.getElementById("game-header");

  // Reset result and options
  result.textContent = "";
  options.forEach((option) => option.disabled = false);

  // Load current question
  dogImage.src = dogBreeds[currentQuestion].image;
  options.forEach((option, index) => {
    option.textContent = dogBreeds[currentQuestion].options[index];
    option.addEventListener("click", checkAnswer);
  });
}

// Function to check answer
function checkAnswer(event) {
  const options = document.querySelectorAll(".options button");
  const result = document.getElementById("result");
  const nextQuestionButton = document.getElementById("next-question");

  // Disable options
  options.forEach((option) => option.disabled = true);

  // Check if answer is correct
  if (event.target.textContent === dogBreeds[currentQuestion].name) {
    score++;
    result.textContent = `Correct! Your score is ${score}/${currentQuestion + 1}`;
  } else {
    result.textContent = `Incorrect. The correct answer is ${dogBreeds[currentQuestion].name}. Your score is ${score}/${currentQuestion + 1}`;
  }
}

// Function to load next question
document.getElementById("next-question").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion >= dogBreeds.length) {
    showResultsPage();
  } else {
    loadQuestion();
  }
});

// Function to start timer
function startTimer() {
  intervalId = setInterval(() => {
    seconds++;
    const timer = document.getElementById("timer");
    const minutes = Math.floor(seconds / 60);
    const secondsDisplay = seconds % 60;
    timer.textContent = `Time: ${padZero(minutes)}:${padZero(secondsDisplay)}`;
  }, 1000);
}

// Function to pad zero
function padZero(value) {
  return (value < 10 ? "0" : "") + value;
}

// Function to show results page
function showResultsPage() {
  clearInterval(intervalId);
  const gameHeader = document.getElementById("game-header");
  const dogImage = document.getElementById("dog-image");
  const options = document.querySelectorAll(".options");
  const nextQuestionButton = document.getElementById("next-question");
  const resultsPage = document.getElementById("results-page");
  const finalScore = document.getElementById("final-score");
  const totalTime = document.getElementById("total-time");

  gameHeader.style.display = "none";
  dogImage.style.display = "none";
  options.forEach((option) => option.style.display = "none");
  nextQuestionButton.style.display = "none";
  resultsPage.style.display = "block";

  const minutes = Math.floor(seconds / 60);
  const secondsDisplay = seconds % 60;
  finalScore.textContent = `Your final score is ${score}/${dogBreeds.length}`;
  totalTime.textContent = `Total time: ${padZero(minutes)}:${padZero(secondsDisplay)}`;

  document.getElementById("play-again").addEventListener("click", () => {
    location.reload();
  });
}
