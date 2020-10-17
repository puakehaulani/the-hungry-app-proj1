// 
// ----- Handles Use Inputs-------

// array to contain strings of ingredients provided by user
let ingredientsArr = [];

// this adds ingredients to the table
$("#ingredientAdd").on("click", function () {
    let ingredient = $("#ingredientInput").val();
    // checks if the input is not empty
    if (ingredient != "") {
        // pushes ingredient into the array of ingredients
        ingredientsArr.push(ingredient);
        // creates and appends several elements to make the ingredients list elements
        $("#ingredientsTable").append(
            $("<tr>").append(
                $("<td>").text(ingredient)
            ).append(
                $("<td>").append(
                    $("<a>").addClass("delete")
                )
            )
        );
        // clears the ingredients search bar
        $("#ingredientInput").val('');
        // makes the ingredients table and search button appear
        $("#afterSearchContainer").removeClass("is-hidden")


    }
});

// will delete items from the user made ingredient list
document.getElementById("ingredientsTable").addEventListener("click", function (event) {
    console.log(event.target)
    if (event.target.matches("a")) {
        console.log("in here");
        event.target.parentElement.parentElement.remove();
    }
});

// -------------------------------
// 

function buildIngredientsURL() {
    let ingredientsAPIURL = "https://api.spoonacular.com/recipes/findByIngredients?"
    let ingredientsString = localStorage.getItem("ingredients")
    let ingredientsParams = {
        apiKey: "d8a8af4a51354138b0a630daef052bf8",
        ingredients: ingredientsString,
    };
    return ingredientsAPIURL + $.param(ingredientsParams);

}

// ---------- Handles Transfering User Input to Results ---

$("#ingredientSearch").on("click", function () {
    localStorage.setItem("ingredients", ingredientsArr);
    location.href = "results.html";

    let queryURL = "https://official-joke-api.appspot.com/random_joke";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let joke = { first: response.setup, second: response.punchline };
        console.log(joke);
        localStorage.setItem("joke", JSON.stringify(joke));
    });

    var recipeData = [];
    let ingredientAPI = buildIngredientsURL();
    console.log(ingredientAPI);
    $.ajax({
        url: ingredientAPI,
        method: "GET",
    }).then(function (response) {
        console.log("hello");
        for (i = 0; i < 10; i++) {
            let recipeId = response[i].id;
            let recipeAPI = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=d8a8af4a51354138b0a630daef052bf8&includeNutrition=false";
            $.ajax({
                url: recipeAPI,
                method: "GET",
            }).then(function (response) {
                let recipe = { recipeid: recipeId, title: response.title, recipeUrl: response.sourceUrl };
                recipeData.push(recipe);
                localStorage.setItem("recipe", JSON.stringify(recipeData));

            })
        }
        
    })

});
