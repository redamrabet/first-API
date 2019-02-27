
/* Legendary */

/**
handleSubmit = its basicly a FUNCTION that triggers if you click the button

searchForm = its the place where you have to type to get the information

searchForm-input = its the value that you get from the searchForm
                  via = document.querySelector('.searchForm-input').value;

searchQuery = Remove the whitespace in the url so that it can load correctly
              via trim()

endpoint = Wikipedia API URL +  ${searchQuery}`;

results =  its an array of objects nested inside the query object.
           in this example its accesible via data.query.search.

result =

displayResults

searchResults


**/




function handleSubmit(event) {
  event.preventDefault() // prevent page from reloading
  const input = document.querySelector('.searchForm-input').value; // get values of input
  const searchQuery = input.trim(); // remove whitespace
  fetchResults(searchQuery); // call "fetchResults" and pass it the "seachQuery"

}



// FETCH THE API FROM THE SOURCE
function fetchResults(searchQuery) {
const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

    fetch(endpoint)
   .then(response => response.json())
   .then(data => {
    const results = data.query.search;
    displayResults(results);
 });


 }



// DISPLAY THE RESULTS
 function displayResults(results) {
  console.log(results);
}


// TOGGLE
function toggle() {
  var iframe = document.getElementById("iframe");
  if (iframe.style.display === "none") {
    iframe.style.display = "block";
  } else {
    iframe.style.display = "none";
  }
}



//SHOW RESULTS ON THE PAGE
function displayResults(results) {
  const searchResults = document.querySelector('.searchResults'); // Store a reference to ".searchResults"
  searchResults.innerHTML = ''; // Remove all childs elements
  results.forEach(result => { // Loop over results array
  const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

  searchResults.insertAdjacentHTML('beforeend',

    `<div class="resultItem">

      <div onclick="toggle()" class="cadre">

       <h3 class="resultItem-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
       </h3>

       <span class="resultItem-snippet">${result.snippet}</span><br>

      </div>

      <iframe id="iframe" title="Inline Frame Example" width="760" height="500" src="${url}">
      </iframe>

    </div>`

  );
 });
}





const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);
