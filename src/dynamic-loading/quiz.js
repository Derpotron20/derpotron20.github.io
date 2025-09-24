document.addEventListener("DOMContentLoaded", () => {
    const statFiles = [
        "../src/components/stats/budget.html",
        "../src/components/stats/gdp-quarter.html",
        "../src/components/stats/gdp-annual.html",
        "../src/components/stats/gdp-total.html",
        "../src/components/stats/cash-rate.html",
        "../src/components/stats/consumer.html",
        "../src/components/stats/prev_consumer.html"
    ];

    // Pick a random file
    const chosenFile = statFiles[Math.floor(Math.random() * statFiles.length)];

    fetch(chosenFile)
        .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch ${chosenFile}`);
            return res.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Grab section name from <h3>
            const sectionEl = doc.querySelector("h3");
            const sectionName = sectionEl ? sectionEl.textContent.trim() : "Unknown Section";

            // Grab <li> + <p class="list">
            const items = doc.querySelectorAll("li");
            const values = doc.querySelectorAll("p.list");

            if (items.length === 0 || values.length === 0 || items.length !== values.length) {
                document.getElementById("question").textContent =
                    `No stats found in ${chosenFile}`;
                return;
            }

            // Pick a random stat
            const index = Math.floor(Math.random() * items.length);
            const statName = items[index].textContent.trim();
            const statValue = values[index].textContent.trim();

            // Display question with section
            const questionEl = document.getElementById("question");
            questionEl.textContent = `What is the value of: ${statName} (${sectionName})?`;

            const input = document.getElementById("input");

            const checkAnswer = () => {
                if (input.value.trim() === statValue) {
                    alert(`✅ Correct! ${statName} (${sectionName}) = ${statValue}`);
                } else {
                    alert(`❌ Wrong. The correct answer is ${statValue}`);
                }
            };

            // Check on Enter key
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault(); // prevent newline
                    checkAnswer();
                }
            });

            // Check on blur/change
            input.addEventListener("change", checkAnswer);
        })
        .catch(err => {
            console.error(err);
            document.getElementById("question").textContent =
                "Error loading stat: " + err.message;
        });
});
