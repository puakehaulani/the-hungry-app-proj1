let ingredientsArr = [];

$("#ingredientAdd").on("click", function () {
    let ingredient = $("#ingredientInput").val();
    if (ingredient != "") {
        ingredientsArr.push(ingredient);
        $("#ingredientsTable").append(
            $("<tr>").append(
                $("<td>").text(ingredient)
            ).append(
                $("<td>").append(
                    $("<a>").attr("class", "delete is-hidden")
                )
            )
        );
        $("#ingredientInput").val('');
        $("#afterSearchContainer").removeClass("is-hidden")
    }
});

$("#ingredientsSearch").removeClass("is-loading");

// will delete items from the user made ingredient list
document.getElementById("ingredientsTable").addEventListener("click", function (event) {
    if (event.target.matches("a")) {
        event.target.parentElement.parentElement.remove();
    }

    if (document.getElementById("ingredientsTable").rows.length == 1) {
        $("#afterSearchContainer").addClass("is-hidden")
    }
});


document.getElementById("ingredientsTable").addEventListener("mouseover", (event) =>{
    $("a").removeClass("is-hidden");
})

document.getElementById("ingredientsTable").addEventListener("mouseleave", (event) =>{
    $("td a").addClass("is-hidden");
})

function buildIngredientsURL() {
    let ingredientsAPIURL = "https://api.spoonacular.com/recipes/findByIngredients?"
    let ingredientsString = localStorage.getItem("ingredients")
    let ingredientsParams = {
        apiKey: "65b67db8cfc84a6983b23e942fda13da",
        ingredients: ingredientsString,
    };
    return ingredientsAPIURL + $.param(ingredientsParams);
}

$("#ingredientSearch").on("click", function () {
    $("#ingredientSearch").addClass("is-loading")
    localStorage.setItem("ingredients", ingredientsArr);
    let queryURL = "https://official-joke-api.appspot.com/random_joke";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        let joke = { first: response.setup, second: response.punchline };
        localStorage.setItem("joke", JSON.stringify(joke));
        var recipeData = [];
        let ingredientAPI = buildIngredientsURL();
        $.ajax({
            url: ingredientAPI,
            method: "GET",
        }).then(function (response) {
            for (i = 0; i < 10; i++) {
                let recipeId = response[i].id;
                let recipeAPI =
                    "https://api.spoonacular.com/recipes/" +
                    recipeId +
                    "/information?apiKey=d8a8af4a51354138b0a630daef052bf8&includeNutrition=false";
                $.ajax({
                    url: recipeAPI,
                    method: "GET",
                }).then(function (response) {
                    let recipe = {
                        recipeid: recipeId,
                        title: response.title,
                        recipeUrl: response.sourceUrl,
                    };
                    recipeData.push(recipe);
                    localStorage.setItem("recipe", JSON.stringify(recipeData));
                    if (recipeData.length >= 10) {
                        location.href = "results.html";
                    }
                });
            }
        });
    });
});
