fetch("src/components/stats/consumer.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("consumer").innerHTML = html;
  });

fetch("src/components/stats/cashrate.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("cashrate").innerHTML = html;
  });

fetch("src/components/stats/gdp.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("gdp").innerHTML = html;
  });

fetch("src/components/stats/budget.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("budget").innerHTML = html;
  });

fetch("src/components/stats/rba.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("rba").innerHTML = html;
  });

fetch("src/components/stats/abs.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("abs").innerHTML = html;
  });