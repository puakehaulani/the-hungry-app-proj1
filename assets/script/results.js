// -----GLOBAL VAR-----
// string of user input ingredients from local storage
let ingredientsString = localStorage.getItem("ingredients")
console.log(ingredientsString);

// -----build functions-----

// ---build ingredient endpoint function---
function buildIngredientsURL() {
    let ingredientsAPIURL = "https://api.spoonacular.com/recipes/findByIngredients?"
    let ingredientsParams = {
        //route to user input id for ingredients
        apiKey: "eb7473b82620444ab521e6fa290c08a3",
        //route to user input id for recipe type (query)
        ingredients: ingredientsString,
        // //route to user input id for number of results
        // number: "",
    };
    console.log(ingredientsAPIURL + $.param(ingredientsParams));
    return ingredientsAPIURL + $.param(ingredientsParams);
}
// ---build recipe endpoint function---
function buildRecipeURL(recipeId) {
    let recipeAPIURL = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=eb7473b82620444ab521e6fa290c08a3&includeNutrition=false"
    console.log(recipeId + " gets URL " + recipeAPIURL);
}



// show results function
function showResults(responseli) {
    // -----build recipe url-----
    let $display = $("#display");
    $display.empty();
    for (i = 0; i < 10; i++) {
        let li = $("<li>");
        let a = $("<a>");
        let bk = $("<br>")

        li.text(responseli[i].title);
        $display.append(li);

        let recipeID = responseli[i].id;
        console.log(recipeID);
        buildRecipeURL(recipeID);
        //ajax call to get url for recipe, issue on testing so commented out
        // $.ajax({
        //     url: recipeAPI,
        //     method: "GET",
        // }).then(function (response) {
        //     console.log(response);
        //     let responseLink = response.spoonacularSourceUrl;
        //     a.attr("src", responseLink);
        //     li.append(a);
        //     li.append(bk);
        // })
    }
}

// -----CALLS-----
let ingredientAPI = buildIngredientsURL();
$.ajax({
    url: ingredientAPI,
    method: "GET",
}).then(function (response) {
    console.log(response);
    showResults(response);
})

