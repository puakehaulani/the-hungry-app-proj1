
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
                    $("<a>").addClass("delete")
                )
            )
        );
       
        $("#ingredientInput").val('');
       
        $("#afterSearchContainer").removeClass("is-hidden")
    }
});


document.getElementById("ingredientsTable").addEventListener("click", function (event) {
    console.log(event.target)
    if (event.target.matches("a")) {
        event.target.parentElement.parentElement.remove();
    }

    
    if(document.getElementById("ingredientsTable").rows.length == 1){
        $("#afterSearchContainer").addClass("is-hidden")
    }
});

function buildIngredientsURL() {
    let ingredientsAPIURL = "https://api.spoonacular.com/recipes/findByIngredients?"
    let ingredientsString = localStorage.getItem("ingredients")
    let ingredientsParams = {
        apiKey: "902b0ba573384b2d954de9933fd4c7ef",
        ingredients: ingredientsString,
    };
    return ingredientsAPIURL + $.param(ingredientsParams);
}

$("#ingredientSearch").on("click", function () {
    localStorage.setItem("ingredients", ingredientsArr);
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
    $.ajax({
        url: ingredientAPI,
        method: "GET",
    }).then(function (response) {
        for (i = 0; i < 10; i++) {
            let recipeId = response[i].id;
            let recipeAPI = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=902b0ba573384b2d954de9933fd4c7ef";
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
// BELOW NEEDS TO GO SOMEWHERE TO LINK TO NEXT PAGE BUT EVERYWHERE IVE TRIED BREAKS THE AJAX CALLS
// location.href = "results.html";
