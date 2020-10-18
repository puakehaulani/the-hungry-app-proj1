
$(document).ready(function () {
    let retrievedRecipe = JSON.parse(localStorage.getItem("recipe"));
    // show results function
    function buildResults() {
        // -----build recipe url-----
        let $display = $("#display");
        $display.empty();
        for (i = 0; i < 10; i++) {
            let li = $("<li>");
            let viewBtn = $("<a>");
            let saveBtn = $("<button>");
            li.text(retrievedRecipe[i].title);
            viewBtn.text("View Recipe");
            viewBtn.attr("class", "button is-inverted is-outlined");
            viewBtn.attr("target", "_blank");
            viewBtn.attr("href", retrievedRecipe[i].recipeUrl);
            saveBtn.text("Save to Favorites");
            saveBtn.attr("class", "button is-inverted is-outlined saveBtn");
            li.append(viewBtn);
            li.append(saveBtn);
            $display.append(li);
        }
    }

    // event listener and handling for a user that doesn't want to see joke
    $("#nojoke").on("click", function () {
        console.log("no")
    });
    let test = document.querySelector("#test");
    let showjokesetup = document.querySelector("#showjokesetup");
    let setup = JSON.parse(localStorage.getItem("joke"));
    $("#setup").text(setup.first);
    showjokesetup.addEventListener("click", function () {
        test.classList.toggle("is-active");
    })

    buildResults();

    // click function for save btn, same format as for modal earlier //
    let punch = document.querySelector("#punch");
    let showpunchline = document.querySelector(".saveBtn");
    showpunchline.addEventListener("click", function () {
        punch.classList.toggle("is-active");

        $("#punchline").text(setup.second);
        //these local storages needs work, this will currently just store one
        let saveFave = { savetitle: $(this).parent().text, savelink: $(this).sibling().attr("href") };
        console.log(saveFave);
        // localStorage.setItem("save", JSON.stringify(saveFave));
    })
    // click function to close modal
    // let closepunchline = document.querySelectorAll("#closepunchline");
    // closepunchline.addEventListener("click", function () {
    //     punch.classList.toggle("is-active");
    // })
});