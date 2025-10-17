fetch("src/components/defs/current.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("current").innerHTML = html;
  });

  
fetch("src/components/defs/intro.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("intro").innerHTML = html;
  });


fetch("src/components/defs/cons_busi.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("cons_busi").innerHTML = html;
  });


fetch("src/components/defs/markets.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("markets").innerHTML = html;
  });

fetch("src/components/defs/pure-comp.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("pure-comp").innerHTML = html;
  });

fetch("src/components/defs/labour.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("labour").innerHTML = html;
  });


fetch("src/components/defs/finance.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("finance").innerHTML = html;
  });


fetch("src/components/defs/gov.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("gov").innerHTML = html;
  });

fetch("src/components/defs/issues.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("issues").innerHTML = html;
  });

fetch("src/components/defs/australia.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("australia").innerHTML = html;
  });

fetch("src/components/defs/policies.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("policies").innerHTML = html;
  });

fetch("src/components/defs/global.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("global").innerHTML = html;
  });