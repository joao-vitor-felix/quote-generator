// Variables
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("content");
const author = document.getElementById("author");
const twitter = document.getElementById("twitter");
const newQuote = document.getElementById("newQuote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// Show Laoding
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Twitter Integration
function twitterButton() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

function quotes() {
  loading();
  // Check if Author field is blank and replace it
  if (!apiQuotes.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = apiQuotes.author;
  }

  // Check Quote length to style
  if (apiQuotes.content.length > 120) {
    quote.classList.add("long-quote");
    author.classList.add("long-quote-author");
  } else {
    quote.classList.remove("long-quote");
    author.classList.remove("long-quote-author");
  }
  quote.textContent = apiQuotes.content;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://api.quotable.io/random";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    quotes();
    return apiQuotes;
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
newQuote.addEventListener("click", getQuotes);
twitter.addEventListener("click", twitterButton);

// On load
getQuotes();
