var gifs = ["ferrari 458", "lamborghini aventador", "mclaren p1"];
var limit = 10;
var offset = 0;
console.log(offset);
$(".rslt").click(function(){
    limit = $(this).val();
   
});

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gifs");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}


$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    if(gif == ''){
        alert("cannot enter blank");
    }
    else{
        gifs.push(gif);
        renderButtons();
        $("#gif-form")[0].reset();
    }

});

renderButtons();

$("body").on("click", ".gifs", function () {
    $("#gif-view").empty();
    offset = Math.floor(Math.random() * 50);
    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphy + "&api_key=dc6zaTOxFJmzC&limit="+limit+"&offset="+offset;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);


        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var p = $("<p>");
            var a = $("<a>");
            a.attr("href", results[i].images.fixed_height.url);
            a.attr("download","image");
            p.text("Rating: "+results[i].rating.toUpperCase());
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gif img-responsive");
            gifDiv.append(p);
            a.append(gifImage);
            gifDiv.append(a);
            gifDiv.addClass("col-xs-4");
            $("#gif-view").prepend(gifDiv);
        }

    });
});

$(document).on("ready", function(){
    $("body").on("mouseenter",".gif", function () {
        var newState = $(this).attr("data-animate");
        var state = $(this).attr("data-state");
        $(this).attr("src", newState);
        state = $(this).attr("data-state", "animate");
    });
    
    $("body").on("mouseleave",".gif", function () {
        newState = $(this).attr("data-still");
        state = $(this).attr("data-state", "still");
        $(this).attr("src", newState);
    });
});

$(function(){

    $(".dropdown-menu").on('click', 'li', function(){
      $(".btn:first-child").text($(this).text());
      $(".btn:first-child").val($(this).text());
   });

});

