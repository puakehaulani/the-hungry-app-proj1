// 
// ----- Handles Use Inputs-------

// array to contain strings of ingredients provided by user
let ingredientsArr = [];

// this adds ingredients to the table
$("#ingredientAdd").on("click", function(){
    let ingredient = $("#ingredientInput").val();
    // checks if the input is not empty
    if(ingredient != ""){
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
document.getElementById("ingredientsTable").addEventListener("click", function(event){
    console.log(event.target)
    if(event.target.matches("a")){
        console.log("in here");
        event.target.parentElement.parentElement.remove();
    }
});

// -------------------------------
// 

// 
// ---------- Handles Transfering User Input to Results ---

$("#ingredientSearch").on("click", function(){
    localStorage.setItem("ingredients", ingredientsArr);
    location.href = "results.html";
});
