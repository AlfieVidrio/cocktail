import {
  html,
  render
} from "lit-html";

let searchBar = document.getElementById("search")
searchBar.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    // Execute search function with search term
    doSearch();
  }
});
function doSearch() {
  // fix empty string query
  let searchStr = searchBar.value;
  if (searchStr == "") {
    searchStr = "Shot"
  }

  // concatenate url
  let baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  let newURL = baseURL.concat(searchStr)

  // Fetch data from jsonplaceholder's "users" endpoint
  fetch(newURL)
    // Then convert the response to JSON
    .then((response) => response.json())

    // Then do something with the JSON data
    .then((data) => {
      let drinks = data;

      // Use .map to create an array of html templates to render to the DOM
      let drinkList = drinks.drinks.map(function(drink) {
        return html`<div class="drink-entry">
        <h2>${drink.strDrink}</h2>
        </div>`;
      });

      // Render the userList array to the user-list div
      render(drinkList, document.getElementById("drink-list"));
    });
}