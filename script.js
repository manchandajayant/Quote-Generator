const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function hideLoading() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  loading();
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://api.quotable.io/random";

  try {
    const result = await fetch(apiUrl);
    const data = await result.json();
    console.log(data);
    data.author === ""
      ? (authorText.innerText = "unknown")
      : (authorText.innerText = data.author);
    data.length > 40
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerText = data.content;
    hideLoading();
  } catch (error) {
    getQuote();
    console.log("no Quote", error);
  }
}

//On Load
getQuote();

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
