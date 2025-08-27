fetch("src/components/navbar.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
    .then(res => res.text())
    .then(html => {
        document.getElementById("navbar").innerHTML = html;
    });