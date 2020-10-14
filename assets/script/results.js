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


// show results function
function showResults(responseli) {
    // -----build recipe url-----
    let $display = $("#display");
    $display.empty();
    for (i = 0; i < 10; i++) {
        let li = $("<li>");
        li.text(responseli[i].title);
        $display.append(li);

        let recipeId = responseli[i].id;
        console.log(recipeId);
        let recipeAPI = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=eb7473b82620444ab521e6fa290c08a3&includeNutrition=false";
        // ajax call to get url for recipe, commented out to preserve quota
        // $.ajax({
        url: recipeAPI,
            method: "GET",
        }).then(function (response) {
                console.log(response);
                let responseLink = response.sourceUrl;
                console.log(responseLink);
                li.attr("data-link", responseLink);
            })
}
}

// -----CALLS-----
let ingredientAPI = buildIngredientsURL();
//ajax call working, commented out to preserve quota
// $.ajax({
url: ingredientAPI,
    method: "GET",
}).then(function (response) {
        console.log(response);
        showResults(response);
    })

