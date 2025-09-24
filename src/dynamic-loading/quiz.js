// All available stat HTML paths by section ID
const statFiles = {
    "budget": "../src/components/stats/budget.html",
    "gdp-quarter": "../src/components/stats/gdp-quarter.html",
    "gdp-annual": "../src/components/stats/gdp-annual.html",
    "gdp-total": "../src/components/stats/gdp-total.html",
    "cash-rate": "../src/components/stats/cash-rate.html",
    "consumer": "../src/components/stats/consumer.html",
    "prev_consumer": "../src/components/stats/prev_consumer.html"
};

let selectedSections = [];
let availableFiles = [];
let currentQuestion = null;

// Elements
const sectionSelect = document.getElementById("section-select");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");

// Start quiz after selecting sections
startBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#section-form input[name='section']:checked");
    selectedSections = Array.from(checkboxes).map(cb => cb.value);

    if (selectedSections.length === 0) {
        alert("Please select at least one section to continue.");
        return;
    }

    availableFiles = selectedSections.map(section => statFiles[section]);

    // Hide selector, show quiz
    sectionSelect.style.display = "none";
    quizContainer.style.display = "block";

    loadQuestion();
});

// Load a random question
async function loadQuestion() {
    if (availableFiles.length === 0) {
        questionEl.innerHTML = "No stats found in the selected sections.";
        return;
    }

    const randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];

    try {
        const response = await fetch(randomFile);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const sections = doc.querySelectorAll("h3");
        if (sections.length === 0) {
            questionEl.innerHTML = "No stats found in " + randomFile;
            return;
        }

        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        const sectionTitle = randomSection.textContent;
        const listItems = randomSection.nextElementSibling?.querySelectorAll("li");

        if (!listItems || listItems.length === 0) {
            questionEl.innerHTML = "No list items in section: " + sectionTitle;
            return;
        }

        const randomIndex = Math.floor(Math.random() * listItems.length);
        const chosenLabel = listItems[randomIndex].textContent;
        const chosenValue = listItems[randomIndex].nextElementSibling?.textContent.trim();

        if (!chosenValue) {
            questionEl.innerHTML = "Couldn't find a value for " + chosenLabel;
            return;
        }

        currentQuestion = { section: sectionTitle, label: chosenLabel, answer: chosenValue };

        questionEl.innerHTML = `From <strong>${sectionTitle}</strong>:<br> What is <strong>${chosenLabel}</strong>?`;
        inputEl.value = "";
    } catch (err) {
        console.error("Error loading file:", err);
        questionEl.innerHTML = "Error loading stats.";
    }
}

// Submit on Enter
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        checkAnswer();
    }
});

function checkAnswer() {
    if (!currentQuestion) return;

    const userAnswer = inputEl.value.trim();
    const correctAnswer = currentQuestion.answer;

    // Clear old feedback
    const oldFeedback = questionEl.querySelector(".feedback");
    if (oldFeedback) oldFeedback.remove();

    let feedback = document.createElement("p");
    feedback.classList.add("feedback");

    if (userAnswer === correctAnswer) {
        feedback.style.color = "green";
        feedback.innerHTML = `Correct! ${currentQuestion.label} = ${correctAnswer}`;
    } else {
        feedback.style.color = "red";
        feedback.innerHTML = `Wrong. The correct answer is <strong>${correctAnswer}</strong>`;
    }

    // Only add Next button once
    if (!document.getElementById("next-btn")) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next Question";
        nextBtn.id = "next-btn";
        nextBtn.addEventListener("click", () => {
            nextBtn.remove(); 
            inputEl.disabled = false; // re-enable input for next Q
            loadQuestion();
        });
        questionEl.appendChild(nextBtn);
    }
    questionEl.appendChild(feedback);
}
