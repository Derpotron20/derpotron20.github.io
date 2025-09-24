document.addEventListener("DOMContentLoaded", () => {
    const statSources = {
        "budget":        "../src/components/stats/budget.html",
        "gdp-quarter":   "../src/components/stats/gdp-quarter.html",
        "gdp-annual":    "../src/components/stats/gdp-annual.html",
        "gdp-total":     "../src/components/stats/gdp-total.html",
        "cash-rate":     "../src/components/stats/cash-rate.html",
        "consumer":      "../src/components/stats/consumer.html",
        "prev_consumer": "../src/components/stats/prev_consumer.html"
    };

    const statKeys = Object.keys(statSources);
    const chosenKey = statKeys[Math.floor(Math.random() * statKeys.length)];
    const chosenFile = statSources[chosenKey];

    fetch(chosenFile)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch " + chosenFile);
            return res.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const items = doc.querySelectorAll("li");
            const values = doc.querySelectorAll("p.list");

            if (items.length === 0 || values.length === 0) {
                document.getElementById("question").textContent =
                    `No stats found in ${chosenFile}`;
                return;
            }

            const index = Math.floor(Math.random() * items.length);
            const statName = items[index].textContent.trim();
            const statValue = values[index].textContent.trim();

            document.getElementById("question").textContent =
                `What is the value of: ${statName}?`;

            const input = document.getElementById("input");

            // Function to check answer
            const checkAnswer = () => {
                if (input.value.trim() === statValue) {
                    alert("✅ Correct!");
                } else {
                    alert(`❌ Wrong. The correct answer is ${statValue}`);
                }
            };

            // Trigger on blur/change
            input.addEventListener("change", checkAnswer);

            // Trigger on Enter
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault(); // stop newline in textarea
                    checkAnswer();
                }
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById("question").textContent =
                "Error loading stat: " + err.message;
        });
});
