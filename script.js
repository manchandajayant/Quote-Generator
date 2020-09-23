const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quote from API
async function getQuote() {
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
