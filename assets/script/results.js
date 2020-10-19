
$(document).ready(function () {
    let saveArr = [];
    let retrievedRecipe = JSON.parse(localStorage.getItem("recipe"));

    function buildResults() {
        let $display = $("#display");
        $display.empty();
        for (i = 0; i < retrievedRecipe.length; i++) {
            let li = $("<li>");
            let viewBtn = $("<a>");
            let saveBtn = $("<button>");

            li.text(retrievedRecipe[i].title);
            li.attr("data-title", retrievedRecipe[i].title)
            let btnDiv = $("<div>")

            viewBtn.text("View Recipe");
            viewBtn.attr("class", "button is-inverted is-outlined");
            viewBtn.attr("target", "_blank");
            viewBtn.attr("href", retrievedRecipe[i].recipeUrl);
            saveBtn.text("Save to Favorites");
            saveBtn.attr("class", "button is-inverted is-outlined saveBtn");

            btnDiv.append(viewBtn);
            btnDiv.append(saveBtn);
            li.append(btnDiv);

            $display.append(li);
        }
    }

    let test = document.querySelector("#test");
    let showjokesetup = document.querySelector("#showjokesetup");
    let setup = JSON.parse(localStorage.getItem("joke"));
    $("#setup").text(setup.first);
    showjokesetup.addEventListener("click", function () {
        test.classList.toggle("is-active");
    })

    buildResults();

    let punch = document.querySelector("#punch");
    let showpunchline = document.querySelectorAll(".saveBtn");
    showpunchline.forEach(element => {
        element.addEventListener("click", function () {
            punch.classList.toggle("is-active");
            $("#punchline").text(setup.second);

            let saveFave = {
                savetitle: $(this).parent().attr("data-title"),
                saveurl: $(this).siblings().attr("href")
            };
            saveArr.push(saveFave);
            localStorage.setItem("save", JSON.stringify(saveArr));
        });
    })

    let closepunchline = document.querySelector("#closepunchline");
    closepunchline.addEventListener("click", function () {
        punch.classList.toggle("is-active");
    })
});