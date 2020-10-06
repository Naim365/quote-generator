const quoteContainer = document.getElementById('quote-container');

const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newquoteBtn = document.getElementById('new-quote');

const loader =document.getElementById('loader');

// Show Loading

function showLoadingSpiner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function removeLoadingSpiner() {
    if (!loader.hidden) { 
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
}


// Get code from API

async function getQuote() {

   showLoadingSpiner();
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl +  apiUrl);
        const data = await response.json();

        // If author is blank, add 'Unknown'
        if (data.quoteAuthor ===''){
            authorText.innerText = 'Unknown';
        } else{
            authorText.innerText= data.quoteAuthor;
        }

      //Reduce font size for long code
      if (data.quoteText.length > 120){
          quoteText.classList.add('long-quote');
      } else {
          quoteText.classList.remove('long-quote');
      }
        quoteText.innerText=data.quoteText;

        //Stop Loader, Show Quote

        removeLoadingSpiner();

    } catch (error){
        getQuote();
        
    }

}
//Tweet Code

  function tweetQuote(){
      const quote = quoteText.innerText;
      const author = authorText.innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}- ${author}`;
      window.open(twitterUrl, '_blank');

  }

  // Event Listenners
  newquoteBtn.addEventListener('click',getQuote);
  twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuote();

