// ===== Stats Quiz =====
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

const sectionSelect = document.getElementById("section-select");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");

startBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#section-form input[name='section']:checked");
    selectedSections = Array.from(checkboxes).map(cb => cb.value);
    if (!selectedSections.length) { alert("Select at least one section."); return; }
    availableFiles = selectedSections.map(s => statFiles[s]);
    sectionSelect.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
});

async function loadQuestion() {
    if (!availableFiles.length) { questionEl.innerHTML = "No stats found."; return; }

    const randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];

    try {
        const response = await fetch(randomFile);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const sections = doc.querySelectorAll("h3");
        if (!sections.length) { questionEl.innerHTML = "No stats found in file."; return; }

        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        const sectionTitle = randomSection.textContent;
        const listItems = randomSection.nextElementSibling?.querySelectorAll("li");

        if (!listItems?.length) { questionEl.innerHTML = "No list items in section."; return; }

        const randomIndex = Math.floor(Math.random() * listItems.length);
        const chosenLabel = listItems[randomIndex].textContent;
        const chosenValue = listItems[randomIndex].nextElementSibling?.textContent.trim() || "No value found";

        currentQuestion = { section: sectionTitle, label: chosenLabel, answer: chosenValue };
        questionEl.innerHTML = `From <strong>${sectionTitle}</strong>:<br> What is <strong>${chosenLabel}</strong>?`;
        inputEl.value = "";
        inputEl.disabled = false;

        const oldNext = document.getElementById("next-btn");
        if (oldNext) oldNext.remove();
    } catch (err) {
        console.error(err);
        questionEl.innerHTML = "Error loading stats.";
    }
}

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

    if (!document.getElementById("next-btn")) {
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next Question";
        nextBtn.id = "next-btn";
        nextBtn.addEventListener("click", () => {
            nextBtn.remove();
            inputEl.disabled = false;
            loadQuestion();
        });
        questionEl.appendChild(nextBtn);
    }

    questionEl.appendChild(feedback);
}

// ===== Definitions Quiz (manual check, no auto-mark, next button after first submit) =====
const defFiles = {
    "intro": "../src/components/defs/intro.html",
    "cons_busi": "../src/components/defs/cons_busi.html",
    "markets": "../src/components/defs/markets.html",
    "labour": "../src/components/defs/labour.html",
    "finance": "../src/components/defs/finance.html",
    "gov": "../src/components/defs/gov.html"
};

let defSelectedSections = [];
let defAvailableFiles = [];
let defCurrentQuestion = null;

const defSectionSelect = document.getElementById("def-section-select");
const defStartBtn = document.getElementById("def-start-btn");
const defQuizContainer = document.getElementById("def-quiz");
const defQuestionEl = document.getElementById("def-question");
const defInputEl = document.getElementById("def-input");

defStartBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("#def-section-form input[name='section']:checked");
    defSelectedSections = Array.from(checkboxes).map(cb => cb.value);
    if (!defSelectedSections.length) { alert("Select at least one section."); return; }
    defAvailableFiles = defSelectedSections.map(s => defFiles[s]);
    defSectionSelect.style.display = "none";
    defQuizContainer.style.display = "block";
    loadDefQuestion();
});

async function loadDefQuestion() {
    if (!defAvailableFiles.length) { defQuestionEl.innerHTML = "No definitions found."; return; }

    const randomFile = defAvailableFiles[Math.floor(Math.random() * defAvailableFiles.length)];

    try {
        const response = await fetch(randomFile);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const ul = doc.querySelector("ul");
        if (!ul) { defQuestionEl.innerHTML = "No list found."; return; }

        const terms = [];
        const children = Array.from(ul.children);
        for (let i = 0; i < children.length; i++) {
            const el = children[i];
            if (el.tagName === "LI") {
                let nextEl = children[i + 1];
                while (nextEl && !(nextEl.tagName === "P" && nextEl.classList.contains("list"))) {
                    nextEl = nextEl.nextElementSibling;
                }
                if (nextEl) terms.push({ term: el.textContent.trim(), def: nextEl.textContent.trim() });
            }
        }

        if (!terms.length) { defQuestionEl.innerHTML = "No definitions found."; return; }

        const chosen = terms[Math.floor(Math.random() * terms.length)];
        defCurrentQuestion = { term: chosen.term, answer: chosen.def };

        defQuestionEl.innerHTML = `Define <strong>${chosen.term}</strong>.`;

        defInputEl.value = "";
        defInputEl.disabled = false;

        // Remove old feedback and next button if exists
        const oldFeedback = defQuestionEl.querySelector(".def-feedback");
        if (oldFeedback) oldFeedback.remove();
        const oldNext = document.getElementById("def-next-btn");
        if (oldNext) oldNext.remove();
    } catch (err) {
        console.error(err);
        defQuestionEl.innerHTML = "Error loading definitions.";
    }
}

// Submit answer on Enter
defInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        showDefAnswer();
    }
});

function showDefAnswer() {
    if (!defCurrentQuestion) return;

    // Only show answer once
    let feedback = defQuestionEl.querySelector(".def-feedback");
    if (!feedback) {
        feedback = document.createElement("p");
        feedback.classList.add("def-feedback");
        feedback.style.color = "green"; // match stats quiz "correct" color
        feedback.innerHTML = `<strong>Answer:</strong> ${defCurrentQuestion.answer}`;
        defQuestionEl.appendChild(feedback);

        // Add Next Question button
        const nextBtn = document.createElement("button");
        nextBtn.id = "def-next-btn";
        nextBtn.textContent = "Next Question";
        nextBtn.addEventListener("click", () => {
            nextBtn.remove();
            feedback.remove();
            loadDefQuestion();
        });
        defQuestionEl.appendChild(nextBtn);
    }
}

