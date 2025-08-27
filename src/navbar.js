fetch("src/components/navbar.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
    .then(res => res.text())
    .then(html => {
        document.getElementById("navbar").innerHTML = html;
    });

function searchText() {
    // Clear previous highlights
    let highlighted = document.querySelectorAll(".highlight");
    highlighted.forEach(el => {
    el.outerHTML = el.innerHTML;
    });

    let text = document.getElementById("searchBox").value;
    if (!text) return;

    // Use regex to highlight matches
    let bodyText = document.body.innerHTML;
    let regex = new RegExp(`(${text})`, "gi");
    document.body.innerHTML = bodyText.replace(regex, '<span class="highlight">$1</span>');

    // Scroll to the first match if exists
    let firstMatch = document.querySelector(".highlight");
    if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}