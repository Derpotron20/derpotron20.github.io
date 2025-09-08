// Load the footer HTML
fetch("src/components/footer.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("footer").innerHTML = html;

    // Footer now exists, so run the days-ago calculations
    showDaysAgo("statLastUpdated", "statLastUpdatedDaysAgo");
    showDaysAgo("defLastUpdated", "defLastUpdatedDaysAgo");
    showDaysAgo("lastUpdate", "latestUpdateDaysAgo");
  });

// Function to calculate days ago
function showDaysAgo(dateElementId, outputElementId) {
    const text = document.getElementById(dateElementId).textContent;
    const dateMatch = text.match(/(\d{2})\/(\d{2})\/(\d{4})/);

    if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const month = parseInt(dateMatch[2]) - 1; // JS months are 0-based
        const year = parseInt(dateMatch[3]);

        const updateDate = new Date(year, month, day);
        const today = new Date();

        const diffTime = today - updateDate; // in milliseconds
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        document.getElementById(outputElementId).textContent = `${diffDays} day(s) ago`;
    }
}