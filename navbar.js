fetch("navbar.html", { cache: "no-store" })
    .then(res => res.text())
    .then(html => {
        document.getElementById("navbar").innerHTML = html;
    });