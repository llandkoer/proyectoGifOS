const $inputSearcher = document.querySelector(".search-bar");
const $iconSearch = document.querySelector("#button-search");
const $buttonParent = document.querySelector(".found-gifs");
const $showMore = document.createElement("button");
$showMore.textContent = "Ver más";
$showMore.className = "found-gifs__show-more";
$buttonParent.appendChild($showMore);
const $searchContainer = document.querySelector(".found-gifs__grid");
const $keywordText = document.querySelector(".found-gifs__keyword");

const MY_API_KEY = "hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD";

const itemsPerLoad = 12;
let firstIndex = 0;
let lastIndex = 0;
let gifs;

function displaySearch() {
  for (let i = firstIndex; i < lastIndex; i += 1) {
    const $gifContainer = document.createElement("div");
    $gifContainer.className = "found-gifs__gif-container";
    $searchContainer.appendChild($gifContainer);

    const $myGif = document.createElement("img");
    $myGif.className = "found-gifs__gif";
    $myGif.src = gifs[i].images.original.url;
    $myGif.alt = gifs[i].title;
    $gifContainer.appendChild($myGif);

    const $purpleBg = document.createElement("div");
    $purpleBg.className = "found-gifs__hover";
    $gifContainer.appendChild($purpleBg);

    const $searchIcons = document.createElement("div");
    $searchIcons.className = "found-gifs__icons";
    $gifContainer.appendChild($searchIcons);

    const $firstSearchIconContainer = document.createElement("div");
    $firstSearchIconContainer.className = "found-gifs__icon-container";
    $searchIcons.appendChild($firstSearchIconContainer);
    const $firstSearchIcon = document.createElement("span");
    $firstSearchIcon.className = "found-gifs__first-icon";
    $firstSearchIconContainer.appendChild($firstSearchIcon);

    const $secondSearchIconContainer = document.createElement("div");
    $secondSearchIconContainer.className = "found-gifs__icon-container";
    $searchIcons.appendChild($secondSearchIconContainer);
    const $secondSearchIcon = document.createElement("span");
    $secondSearchIcon.className = "found-gifs__second-icon";
    $secondSearchIconContainer.appendChild($secondSearchIcon);

    const $lastSearchIconContainer = document.createElement("div");
    $lastSearchIconContainer.className = "found-gifs__icon-container";
    $searchIcons.appendChild($lastSearchIconContainer);
    const $lastSearchIcon = document.createElement("span");
    $lastSearchIcon.className = "found-gifs__last-icon";
    $lastSearchIconContainer.appendChild($lastSearchIcon);

    const $searchText = document.createElement("div");
    $searchText.className = "found-gifs__text";
    $gifContainer.appendChild($searchText);

    const $searchUser = document.createElement("p");
    $searchUser.className = "found-gifs__user";
    if (gifs[i].username === "") {
      $searchUser.textContent = "Desconocido";
    } else {
      $searchUser.textContent = gifs[i].username;
    }
    $searchText.appendChild($searchUser);

    const $searchTitle = document.createElement("p");
    $searchTitle.className = "found-gifs__title";
    if (gifs[i].title === "") {
      $searchTitle.textContent = "Un GIF sin título";
    } else {
      $searchTitle.textContent = gifs[i].title;
    }
    $searchText.appendChild($searchTitle);
    if (lastIndex >= 48) {
      $showMore.style = "display: none";
    }
  }
  firstIndex += itemsPerLoad;
  lastIndex = firstIndex + itemsPerLoad;
}

async function getSearch(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    gifs = json.data;
    displaySearch();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

const executeFetchSearch = () => {
  firstIndex = 0;
  lastIndex = itemsPerLoad;
  $searchContainer.innerHTML = "";

  if ($inputSearcher.value) {
    const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${$inputSearcher.value}`;
    $keywordText.textContent = $inputSearcher.value;
    $showMore.style = "display: block;";
    getSearch(SEARCH_ENDPOINT);
  } else {
    $keywordText.textContent = "";
    $showMore.style = "display: none;";
  }
};

const executeFetchSearch2 = (event) => {
  if (event.keyCode === 13) {
    firstIndex = 0;
    lastIndex = itemsPerLoad;
    $searchContainer.innerHTML = "";
    if ($inputSearcher.value) {
      const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${$inputSearcher.value}`;
      $keywordText.textContent = $inputSearcher.value;
      $showMore.style = "display: block;";
      getSearch(SEARCH_ENDPOINT);
    } else {
      $keywordText.textContent = "";
      $showMore.style = "display: none;";
    }
  }
};

$iconSearch.addEventListener("click", executeFetchSearch);
$inputSearcher.addEventListener("keyup", executeFetchSearch2);
$showMore.addEventListener("click", displaySearch);

// Suggestions

const $breaker = document.querySelector(".hero__breaker");
const $list = document.querySelector(".hero__list");
let suggestions;

async function getSuggestions(url) {
  try {
    const respon = await fetch(url);
    const theJson = await respon.json();
    suggestions = theJson.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

async function createListItems() {
  try {
    const SUGGESTIONS_ENDPOINT = `https://api.giphy.com/v1/gifs/search/tags?api_key=${MY_API_KEY}&limit=4&q=${$inputSearcher.value}`;
    await getSuggestions(SUGGESTIONS_ENDPOINT);
    $breaker.style = "display: block;";
    $list.style = "display: flex;";
    suggestions.forEach((item) => {
      const $listItem = document.createElement("li");
      $listItem.className = "hero__list-item";
      $list.appendChild($listItem);
      $listItem.addEventListener("click", () => {
        $inputSearcher.value = item.name;
        $searchContainer.innerHTML = "";
        firstIndex = 0;
        lastIndex = itemsPerLoad;

        if ($inputSearcher.value) {
          const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${$inputSearcher.value}`;
          $keywordText.textContent = $inputSearcher.value;
          $showMore.style = "display: block;";
          getSearch(SEARCH_ENDPOINT);
        } else {
          $keywordText.textContent = "";
          $showMore.style = "display: none;";
        }
      });

      const $suggestionIcon = document.createElement("i");
      $suggestionIcon.className = "fas fa-search";
      $listItem.appendChild($suggestionIcon);

      const $suggestion = document.createElement("span");
      $suggestion.className = "hero__suggestion";
      $suggestion.textContent = item.name;
      $listItem.appendChild($suggestion);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

$inputSearcher.addEventListener("keyup", () => {
  if ($inputSearcher.value !== "") {
    $list.innerHTML = "";
    createListItems();
  } else {
    $breaker.style = "display: none;";
    $list.style = "display: none;";
  }
});
