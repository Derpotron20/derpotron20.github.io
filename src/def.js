fetch("src/components/defs/current.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("current").innerHTML = html;
  });

  
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


fetch("src/components/defs/labour.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("labour").innerHTML = html;
  });


fetch("src/components/defs/finance.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("finance").innerHTML = html;
  });


fetch("src/components/defs/gov.html", { cache: "no-store" }) // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("gov").innerHTML = html;
  });