let differences = [];
let found = [];
let timerInterval;        
let elapsedSeconds = 0;

function startTimer() {
  clearInterval(timerInterval);
  elapsedSeconds = 0;
  document.getElementById("timer").textContent = `Time: 0s`;

  timerInterval = setInterval(() => {
    elapsedSeconds++;
    document.getElementById("timer").textContent = `Time: ${elapsedSeconds}s`;
  }, 1000);
}

// ✅ Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

async function loadLevel() {
  try {
    const response = await fetch("config.json");
    const data = await response.json();

    differences = data.differences;
    found = [];

    document.getElementById("image1").src = data.image1;
    document.getElementById("image2").src = data.image2;
    document.getElementById("found-count").textContent = "Found: 0";

    document.querySelectorAll(".marker").forEach((el) => el.remove());
    clearFeedback();
    startTimer(); // Clear feedback from previous clicks
  } catch (err) {
    console.error("Error loading level:", err);
    alert("Failed to load game data.");
  }
}

function handleClick(clickX, clickY) {
  addClickIndicator(clickX, clickY); // Show feedback circle
  let isCorrect = false;

  // ✅ NEW: Get displayed image size and calculate scale ratio
  const img = document.getElementById("image2");
  const displayedWidth = img.clientWidth;
  const displayedHeight = img.clientHeight;
  const originalWidth = 600; // Match original config image width
  const originalHeight = img.naturalHeight * (originalWidth / img.naturalWidth);

  const scaleX = displayedWidth / originalWidth;
  const scaleY = displayedHeight / originalHeight;

  differences.forEach((diff, index) => {
    // ✅ NEW: Scale the config coordinates to match current image size
    const scaledX = diff.x * scaleX;
    const scaledY = diff.y * scaleY;
    const scaledWidth = diff.width * scaleX;
    const scaledHeight = diff.height * scaleY;

    const withinX = clickX >= scaledX && clickX <= scaledX + scaledWidth;
    const withinY = clickY >= scaledY && clickY <= scaledY + scaledHeight;

    if (withinX && withinY && !found.includes(index)) {
      found.push(index);
      addMarker(scaledX + scaledWidth / 2, scaledY + scaledHeight / 2); // marker at center
      isCorrect = true;

      document.getElementById(
        "found-count"
      ).textContent = `Found: ${found.length}`;
      if (found.length === differences.length) {
        displayCompletionMessage();
      }
    }
  });

  showFeedback(isCorrect);
}

// Add feedback text based on whether the click was correct or wrong
function showFeedback(isCorrect) {
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.textContent = isCorrect ? "Correct!" : "Wrong!"; // CHANGE: Correct/Incorrect feedback
  document.body.appendChild(feedback);

  setTimeout(() => feedback.remove(), 1000); 
}

// Clear previous feedback if any
function clearFeedback() {
  const previousFeedback = document.querySelectorAll(".feedback");
  previousFeedback.forEach((feedback) => feedback.remove());
}

function addClickIndicator(x, y) {
  const circle = document.createElement("div");
  circle.className = "click-circle";
  circle.style.left = `${x - 1 * 10}px`;
  circle.style.top = `${y - 1 * 10}px`;
  document.getElementById("image2-wrapper").appendChild(circle);

  // Auto-remove it after a short time
  setTimeout(() => circle.remove(), 100);
}

document
  .getElementById("image2-wrapper")
  .addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    handleClick(clickX, clickY); 
  });

// CHANGE: Add touch support
document
  .getElementById("image2-wrapper")
  .addEventListener("touchstart", function (e) {
    const touch = e.touches[0];
    const rect = this.getBoundingClientRect();
    const clickX = touch.clientX - rect.left;
    const clickY = touch.clientY - rect.top;
    handleClick(clickX, clickY);
  });

function addMarker(x, y) {
  const marker = document.createElement("div");
  marker.className = "marker";
  marker.style.left = `${x - 15}px`;
  marker.style.top = `${y - 15}px`;
  document.getElementById("image2-wrapper").appendChild(marker);
}
function displayCompletionMessage() {
  stopTimer();
  const message = document.createElement("div");
  message.className = "completion-message";
  message.textContent = "🎉 You found all the differences!";
  document.body.appendChild(message);
}


loadLevel();

document.getElementById("reset-button").addEventListener("click", function () {
  clearInterval(timerInterval); 
  loadLevel(); // Reload level
});