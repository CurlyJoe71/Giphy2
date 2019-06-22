var keywordArray = ['homer', 'bart', 'springfield', 'lisa', 'marge'];

var currentKeyWord = keywordArray[0];

var apiKey = 'RYGjMzNMMGImpoTIbVIOUEWcR5bYpYjm'

var queryURL = 'https://api.giphy.com/v1/gifs/search?q=';

var giphyDisplay = $('#giphy-display');

var state = $(this).attr('data-state');

function animate() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
};

function displayGiphy() {
    giphyDisplay.empty();
    console.log(currentKeyWord);
    currentKeyWord = $(this).text();
    console.log(currentKeyWord);
    $.ajax({
        url: queryURL + currentKeyWord + '&api_key=' + apiKey + '&limit=10&rating=g',
        method: 'GET'
    }).then(function (response) {
        console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {

            var animateURL = response.data[i].images.fixed_height.url;
            var stillURL = response.data[i].images.fixed_height_still.url;
            var rating = response.data[i].rating;
            var giphyState = 'still';
            var newDiv = $('<div class="col">');
            var newImageDiv = $('<div>');
            var img = $('<img>');
            img.attr({ 'src': stillURL, 'max-height': '40px', 'data-still': stillURL, 'data-animate': animateURL, 'data-state': giphyState, 'class': 'currentGiphy shadow rounded border border-warning', 'data-rating': rating });

            newDiv.text('Rating: ' + rating);
            newImageDiv.append(img);
            newDiv.append(newImageDiv);
            giphyDisplay.append(newDiv);

        }
    })
};

// Function for displaying keyword buttons
function renderButtons() {
    $('#button-display').empty();
    for (i = 0; i < keywordArray.length; i++) {
        $('#button-display').append('<button class="btn btn-primary keyword-button" type="button">' + keywordArray[i] + '</button>');
    }
};

// This function handles events where one button is clicked
function addKeyword() {
    console.log("Search button clicked!");
    event.preventDefault();
    $("#search-button").empty();
    var newKeyword = $("#keyword-input").val();
    if (newKeyword === '') {
        return;
    }
    $('#add-keyword').empty();
    keywordArray.push(newKeyword);
    $('#keyword-input').val('');
    renderButtons();
    renderSearchButton();
};

// $("#add-keyword").on("click", function () {
//     console.log("Search button clicked!");
//     event.preventDefault();
//     var newKeyword = $("#keyword-input").val();
//     if (newKeyword === '') {
//         return;
//     }
//     $('#add-keyword').empty();
//     keywordArray.push(newKeyword);
//     renderButtons();
// });

function renderSearchButton() {
    $('#search-button').append('<button class="btn btn-light btn-sm" id="add-keyword">Add</button>');
};

$(document).on("click", ".keyword-button", displayGiphy);
$(document).on("click", "#add-keyword", addKeyword);
renderButtons();
$(document).on('click', '.currentGiphy', animate);
renderSearchButton();