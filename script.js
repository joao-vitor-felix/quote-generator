const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("content");
const author = document.getElementById("author");
const twitter = document.getElementById("twitter");
const newQuote = document.getElementById("newQuote");
const loader = document.getElementById("loader");
let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}


function twitterButton() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

function quotes() {
  loading();
  if (!apiQuotes.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = apiQuotes.author;
  }

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
  console.log(error)
  }
}

newQuote.addEventListener("click", getQuotes);
twitter.addEventListener("click", twitterButton);

getQuotes();
