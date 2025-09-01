fetch("src/components/defs/intro.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("intro").innerHTML = html;
  });
fetch("src/components/defs/cons_busi.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("cons_busi").innerHTML = html;
  });
fetch("src/components/defs/markets.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("markets").innerHTML = html;
  });