document.addEventListener("DOMContentLoaded", () => {
    const statFiles = [
        "src/components/stats/budget.html",
        "src/components/stats/gdp-quarter.html",
        "src/components/stats/gdp-annual.html",
        "src/components/stats/gdp-total.html",
        "src/components/stats/cash-rate.html",
        "src/components/stats/consumer.html",
        "src/components/stats/prev_consumer.html"
    ];

    const questionEl = document.getElementById("question");
    const input = document.getElementById("input");

    let currentStat = null;

    function randomFile() {
        return statFiles[Math.floor(Math.random() * statFiles.length)];
    }

    async function loadQuestion() {
        input.value = "";
        questionEl.textContent = "Loading...";
        const btn = document.getElementById("next-btn");
        if (btn) btn.remove();

        try {
            const file = randomFile();
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Failed to fetch ${file}`);
            const html = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const sectionEl = doc.querySelector("h3");
            const sectionName = sectionEl ? sectionEl.textContent.trim() : "Unknown Section";

            const items = doc.querySelectorAll("li");
            const values = doc.querySelectorAll("p.list");

            if (items.length === 0 || values.length === 0 || items.length !== values.length) {
                questionEl.textContent = `No stats found in ${file}`;
                return;
            }

            const index = Math.floor(Math.random() * items.length);
            const statName = items[index].textContent.trim();
            const statValue = values[index].textContent.trim();

            currentStat = { name: statName, value: statValue, section: sectionName };

            questionEl.textContent = `What is the value and measure of: ${statName} (${sectionName})?`;
        } catch (err) {
            console.error(err);
            questionEl.textContent = "Error loading stat: " + err.message;
        }
    }

    function checkAnswer() {
        if (!currentStat) return;

        const isCorrect = input.value.trim() === currentStat.value;

        questionEl.innerHTML = `
            <p>${isCorrect ? "Correct!" : "Wrong."}</p>
            <p>The correct answer is <strong>${currentStat.value}</strong> for 
            ${currentStat.name} (${currentStat.section}).</p>
        `;

        const nextBtn = document.createElement("button");
        nextBtn.id = "next-btn";
        nextBtn.textContent = "Next Question";
        nextBtn.addEventListener("click", loadQuestion);
        questionEl.appendChild(nextBtn);
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            checkAnswer();
        }
    });
    input.addEventListener("change", checkAnswer);

    loadQuestion();
});