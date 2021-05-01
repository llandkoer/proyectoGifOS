/* eslint-disable no-console */
// const $inputContainer = document.querySelector(".container-search-gifos");
const $inputSearcher = document.querySelector(".search-bar");
const $iconSearch = document.querySelector("#button-search");
const $showMore = document.querySelector(".found-gifs__show-more");
$showMore.style = "display: none;";
const $searchContainer = document.querySelector(".found-gifs__grid");
const $keywordText = document.querySelector(".found-gifs__keyword");
const $reactions = document.querySelector("#reactions");
const $entertainment = document.querySelector("#entertainment");
const $sports = document.querySelector("#sports");
const $stickers = document.querySelector("#stickers");
const $artists = document.querySelector("#artists");
$reactions.style = "cursor: pointer;";
$entertainment.style = "cursor: pointer;";
$sports.style = "cursor: pointer;";
$stickers.style = "cursor: pointer;";
$artists.style = "cursor: pointer;";

const MY_API_KEY = "hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD";

let MAXIMUM_GIFS2;
// let MAXIMUM_GIFS2 = -12;

// const showMore = () => {
//   MAXIMUM_GIFS2 -= 12;
//   console.log(MAXIMUM_GIFS2);
// };

// $showMore.addEventListener("click", showMore);

async function getSearch(url) {
  const response = await fetch(url);
  const json = await response.json();
  const query = json.data;

  query.slice(MAXIMUM_GIFS2).forEach((element) => {
    const $gifContainer = document.createElement("div");
    $gifContainer.className = "found-gifs__gif-container";
    $searchContainer.appendChild($gifContainer);

    const $myGif = document.createElement("img");
    $myGif.className = "found-gifs__gif";
    $myGif.src = element.images.original.url;
    $myGif.alt = element.title;
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
    if (element.username === "") {
      $searchUser.textContent = "Desconocido";
    } else {
      $searchUser.textContent = element.username;
    }
    $searchText.appendChild($searchUser);

    const $searchTitle = document.createElement("p");
    $searchTitle.className = "found-gifs__title";
    if (element.title === "") {
      $searchTitle.textContent = "Un GIF sin título";
    } else {
      $searchTitle.textContent = element.title;
    }
    $searchText.appendChild($searchTitle);
  });
}

const executeFetchSearch = () => {
  $searchContainer.innerHTML = "";
  MAXIMUM_GIFS2 = -12;
  if ($inputSearcher.value) {
    const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${$inputSearcher.value}`;
    $keywordText.textContent = $inputSearcher.value;
    $showMore.style = "";
    // $searchContainer.innerHTML = ;
    getSearch(SEARCH_ENDPOINT);
  } else {
    $keywordText.textContent = "";
    $showMore.style = "display: none;";
  }
};

$iconSearch.addEventListener("click", executeFetchSearch);
// $inputSearcher.addEventListener("keyup", executeFetchSearch);

// Categories

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();
  const query = json.data;

  query.slice(MAXIMUM_GIFS2).forEach((element) => {
    const $gifContainer = document.createElement("div");
    $gifContainer.className = "found-gifs__gif-container";
    $searchContainer.appendChild($gifContainer);

    const $myGif = document.createElement("img");
    $myGif.className = "found-gifs__gif";
    $myGif.src = element.gif.images.original.url;
    $myGif.alt = element.title;
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
    if (element.gif.username === "") {
      $searchUser.textContent = "Desconocido";
    } else {
      $searchUser.textContent = element.gif.username;
    }
    $searchText.appendChild($searchUser);

    const $searchTitle = document.createElement("p");
    $searchTitle.className = "found-gifs__title";
    if (element.gif.title === "") {
      $searchTitle.textContent = "Un GIF sin título";
    } else {
      $searchTitle.textContent = element.gif.title;
    }
    $searchText.appendChild($searchTitle);
  });
}

const executeFetchCategoriesReactions = () => {
  $searchContainer.innerHTML = "";
  MAXIMUM_GIFS2 = -12;

  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/reactions?api_key=${MY_API_KEY}`;
  $keywordText.textContent = $reactions.textContent;
  $showMore.style = "";
  getData(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesEntertainment = () => {
  $searchContainer.innerHTML = "";
  MAXIMUM_GIFS2 = -12;

  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/entertainment?api_key=${MY_API_KEY}`;
  $keywordText.textContent = $entertainment.textContent;
  $showMore.style = "";
  getData(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesSports = () => {
  $searchContainer.innerHTML = "";
  MAXIMUM_GIFS2 = -12;

  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/sports?api_key=${MY_API_KEY}`;
  $keywordText.textContent = $sports.textContent;
  $showMore.style = "";
  getData(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesStickers = () => {
  $searchContainer.innerHTML = "";
  MAXIMUM_GIFS2 = -12;

  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/stickers?api_key=${MY_API_KEY}`;
  $keywordText.textContent = $stickers.textContent;
  $showMore.style = "";
  getData(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesArtists = () => {
  $searchContainer.innerHTML = "";
  MAXIMUM_GIFS2 = -12;

  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/artists?api_key=${MY_API_KEY}`;
  $keywordText.textContent = $artists.textContent;
  $showMore.style = "";
  getData(CATEGORIES_ENDPOINT);
};

$reactions.addEventListener("click", executeFetchCategoriesReactions);
$entertainment.addEventListener("click", executeFetchCategoriesEntertainment);
$sports.addEventListener("click", executeFetchCategoriesSports);
$stickers.addEventListener("click", executeFetchCategoriesStickers);
$artists.addEventListener("click", executeFetchCategoriesArtists);
