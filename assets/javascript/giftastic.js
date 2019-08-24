

/**
 * TAGS
 */
let tags = ["mario","luigi","super mario bros","bowser","hyrule","zelda","nintendo","mushroom kingdom","yoshi",];


// create a button with a click listener that performs a search
let tagContainer = $('#tag-container');
tags.forEach(tag => {
  let tagNode = $.parseHTML(buildTagHTml(tag))[0];
  tagContainer.append(tagNode);
  $(tagNode).on('click', () => {
    $('#search-input').val(tag);
    queryGiphy(tag);
  });
})

function buildTagHTml(tag) {
  return `<button class="tag" type="button">${tag}</button>`;
}

/**
 * SEARCH
 */

// attach submit event to search input
$('#search-form').on('submit', (e) => {
  e.preventDefault();
  var searchInputValue = $('#search-input').val().trim();
  if (searchInputValue && searchInputValue.length > 0) {
    queryGiphy(searchInputValue);
  }
  return false;
});

function queryGiphy(keyword) {
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    encodeURIComponent(keyword) + "&api_key=C5fReoeqnbRaSLjHaayklBvUdcqmm5mB&limit=10";
  $.ajax({
    url: queryURL,
    type: 'GET',
    success: function (res) {
      handleSearchComplete(res);
    },
    error: function (request, error) {
      alert("Request: " + JSON.stringify(request));
    }
  });
}


// handle the response from giphy api
function handleSearchComplete(res) {
  const gifHtml = res.data.map(buildGifHTml);
  $('#gif-container').html(gifHtml);
}


// build html for a single item returned from giphy 
function buildGifHTml(gifData) {
  return `
    <div class="gif">
      <h2>Rating: ${gifData.rating}</h2>
      <img src="${gifData.images.fixed_width.url}" />
    </div>
  `;
}

