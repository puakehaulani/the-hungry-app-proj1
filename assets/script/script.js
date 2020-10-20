// 
// ----- Handles User Inputs-------
// array to contain strings of ingredients provided by user
let ingredientsArr = [];
let mobileScreen = window.matchMedia("(max-width: 1024px)");
// this adds ingredients to the table
$("#ingredientAdd").on("click", function () {
    let ingredient = $("#ingredientInput").val();
    // checks if the input is not empty
    if (ingredient != "") {
        // pushes ingredient into the array of ingredients
        ingredientsArr.push(ingredient);
        let deleteBtn = $("<a>").addClass("delete");
        if(!(mobileScreen.matches)){
            deleteBtn.addClass("is-hidden")
        }
        // creates and appends several elements to make the ingredients list elements
        $("#ingredientsTable").append(
            $("<tr>").append(
                $("<td>").text(ingredient)
            ).append(
                $("<td>").append(deleteBtn)
            )
        );
        // clears the ingredients search bar
        $("#ingredientInput").val('');
        // makes the ingredients table and search button appear
        $("#afterSearchContainer").removeClass("is-hidden")
    }
});

$("#ingredientsSearch").removeClass("is-loading");

// will delete items from the user made ingredient list
document.getElementById("ingredientsTable").addEventListener("click", function (event) {
    if (event.target.matches("a")) {
        event.target.parentElement.parentElement.remove();
    }

    // this removes the ingredients table and search bar after all ingredients have been removed
    if (document.getElementById("ingredientsTable").rows.length == 1) {
        $("#afterSearchContainer").addClass("is-hidden")
    }
});

//Magic appearing delete buttons
document.getElementById("ingredientsTable").addEventListener("mouseover", () =>{
    if(!(mobileScreen.matches)){
        $("td a").removeClass("is-hidden");
    };
});

document.getElementById("ingredientsTable").addEventListener("mouseleave", () =>{
    if(!(mobileScreen.matches)){
        $("td a").addClass("is-hidden");
    };
});

function mobileTableButtons(){
    if(mobileScreen.matches){
        $("td a").removeClass("is-hidden");
    }else{
        $("td a").addClass("is-hidden");
    };
};

mobileTableButtons(mobileScreen);

// -------------------------------
function buildIngredientsURL() {
    let ingredientsAPIURL = "https://api.spoonacular.com/recipes/findByIngredients?"
    let ingredientsString = localStorage.getItem("ingredients")
    let ingredientsParams = {
        apiKey: "65b67db8cfc84a6983b23e942fda13da",
        ingredients: ingredientsString,
    };
    return ingredientsAPIURL + $.param(ingredientsParams);
}
// ---------- Handles Transfering User Input to Results ---
$("#ingredientSearch").on("click", function () {
    $("#ingredientSearch").addClass("is-loading")
    localStorage.setItem("ingredients", ingredientsArr);
    let queryURL = "https://official-joke-api.appspot.com/random_joke";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        let joke = { first: response.setup, second: response.punchline };
        console.log(joke);
        localStorage.setItem("joke", JSON.stringify(joke));
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
                let recipeAPI =
                    "https://api.spoonacular.com/recipes/" +
                    recipeId +
                    "/information?apiKey=d8a8af4a51354138b0a630daef052bf8&includeNutrition=false";
                $.ajax({
                    url: recipeAPI,
                    method: "GET",
                }).then(function (response) {
                    console.log(response);
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
