fetch("src/components/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
  });

let matches = [];
let currentIndex = -1;

function removeHighlights() {
  document.querySelectorAll(".highlight").forEach(span => {
    span.replaceWith(span.textContent); // unwrap
  });
  matches = [];
  currentIndex = -1;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatches(node, regex) {
  if (node.nodeType === 3) { // text node
    let text = node.nodeValue;
    let match;
    while ((match = regex.exec(text)) !== null) {
      let highlight = document.createElement("span");
      highlight.className = "highlight";
      highlight.textContent = match[0];

      // split the text node at the match
      let after = node.splitText(match.index);
      after.nodeValue = after.nodeValue.substring(match[0].length);
      node.parentNode.insertBefore(highlight, after);

      node = after; // continue scanning remainder
      text = node.nodeValue;
      regex.lastIndex = 0; // reset for new node
    }
  } else if (
    node.nodeType === 1 &&
    node.childNodes &&
    !["SCRIPT", "STYLE", "INPUT"].includes(node.tagName)
  ) {
    if (node.classList.contains("highlight")) return;
    [...node.childNodes].forEach(child => highlightMatches(child, regex));
  }
}

function searchText() {
  removeHighlights();

  let text = document.getElementById("searchBox").value.trim();
  if (!text) return;

  // Build regex for the *entire search string*, escaped
  let regex = new RegExp(escapeRegex(text), "gi");

  highlightMatches(document.body, regex);

  matches = Array.from(document.querySelectorAll(".highlight"));
  if (matches.length > 0) {
    currentIndex = 0;
    updateCurrent();
  }
}

function updateCurrent() {
  matches.forEach(m => m.classList.remove("current"));
  if (currentIndex >= 0 && matches[currentIndex]) {
    matches[currentIndex].classList.add("current");
    matches[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function nextMatch() {
  if (matches.length === 0) return;
  currentIndex = (currentIndex + 1) % matches.length;
  updateCurrent();
}

function prevMatch() {
  if (matches.length === 0) return;
  currentIndex = (currentIndex - 1 + matches.length) % matches.length;
  updateCurrent();
}