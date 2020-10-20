let $favoritesDisplay = $("#favoritesDisplay");
let retrievedFavorites = JSON.parse(localStorage.getItem("save"));
$favoritesDisplay.empty();
for (i = 0; i < retrievedFavorites.length; i++) {
    let li = $("<li>")
    let title = $("<a>");
    let favSymbol = $("<i>");

    favSymbol.addClass("fab fa-gratipay")
    li.prepend(favSymbol);
    title.text(retrievedFavorites[i].savetitle);
    title.attr("target", "_blank");
    title.attr("href", retrievedFavorites[i].saveurl);

    li.append(title);

    $favoritesDisplay.append(li);
}