import {
  html,
  render
} from "lit-html";

let searchBar = document.getElementById("search")
searchBar.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    // Execute search function with search term
    console.log("passed search query=", searchBar.value)
    doSearch();
  }
});
function doSearch() {
  console.log("executing search!")
  let searchStr = searchBar.value;
  let baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
  let newURL = baseURL.concat(searchStr)
  console.log(newURL)

  // Fetch data from jsonplaceholder's "users" endpoint
  fetch(newURL)
    // Then convert the response to JSON
    .then((response) => response.json())

    // Then do something with the JSON data
    .then((data) => {
      let drinks = data;
      console.log(drinks)

      // Use .map to create an array of html templates to render to the DOM
      let drinkList = drinks.drinks.map(function(drink) {
        console.log("test 1:", drink)
        return html`<div @click=${()=>renderRecipe(drink)} class="user-entry">
        <h2>${drink.strDrink}</h2>
      </div>`;
      });

      // Render the userList array to the user-list div
      render(drinkList, document.getElementById("user-list"));
    });
}

function renderRecipe(drink) {
  console.log("test 2:", drink)
  render(drink.strGlass, document.getElementById("recipe"));
} 