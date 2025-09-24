fetch("src/components/stats/consumer.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("consumer").innerHTML = html;
  });

fetch("src/components/stats/prev_consumer.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("prev_consumer").innerHTML = html;
  });

fetch("src/components/stats/cash-rate.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("cash-rate").innerHTML = html;
  });

fetch("src/components/stats/gdp-quarter.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("gdp-quarter").innerHTML = html;
  });

fetch("src/components/stats/gdp-annual.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("gdp-annual").innerHTML = html;
  });

fetch("src/components/stats/gdp-total.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("gdp-total").innerHTML = html;
  });

fetch("src/components/stats/budget.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("budget").innerHTML = html;
  });
fetch("src/components/stats/budget-winners-losers.html") // No cacheing until navbar is complete to avoid lack of update.
  .then(res => res.text())
  .then(html => {
    document.getElementById("winners-losers").innerHTML = html;
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