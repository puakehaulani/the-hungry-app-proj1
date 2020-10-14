let ingredientsArr = [];
// This is what lexi needs (a string of ingredients seperated by commas)
let ingredientArrSpliced = ingredientsArr.splice;

// will delete items from the user made ingredient list
document.getElementById("ingredientsTable").addEventListener("click", function(event){
    console.log(event.target)
    if(event.target.matches("a")){
        console.log("in here");
        
        event.target.parentElement.parentElement.remove();
    }
});

// this adds ingredients to the table
$("#ingredientSearch").on("click", function(){
    // pushes ingredient into the array of ingredients
    ingredientsArr.push($("#ingredientInput").val());
    // creates and appends several elements to make the ingredients list elements
    $("#ingredientsTable").append(
        $("<tr>").append(
            $("<td>").text($("#ingredientInput").val())
        ).append(
            $("<td>").append(
                $("<a>").addClass("delete")
            )
        )
    );
    // clears the ingredients search bar
    $("#ingredientInput").val('');
});
