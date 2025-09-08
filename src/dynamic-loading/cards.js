document.querySelectorAll(".card-header").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.parentElement;
        const content = card.querySelector(".card-content");

        if (content.classList.contains("open")) {
            // Collapse
            content.style.maxHeight = null;
            content.classList.remove("open");
        } else {
            // Expand to fit text
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
        }
    });
});