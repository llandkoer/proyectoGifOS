/* eslint-disable no-console */
// const $inputContainer = document.querySelector(".container-search-gifos");
const $inputSearcher = document.querySelector(".search-bar");
const $iconSearch = document.querySelector("#button-search");
// const $showMore = document.querySelector(".found-gifs__show-more");
const $searchContainer = document.querySelector(".found-gifs__grid");
const $keywordText = document.querySelector(".found-gifs__keyword");

const MY_API_KEY = "hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD";
const MAXIMUM_GIFS2 = 12;

async function getSearch(url) {
  const response = await fetch(url);
  const json = await response.json();

  json.data.forEach((element) => {
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
    $searchTitle.textContent = element.title;
    $searchText.appendChild($searchTitle);
  });
}

const executeFetchSearch = () => {
  if ($inputSearcher.value) {
    const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&limit=${MAXIMUM_GIFS2}&q=${$inputSearcher.value}`;
    $keywordText.textContent = $inputSearcher.value;
    getSearch(SEARCH_ENDPOINT);
  }
  $iconSearch.removeEventListener("click", executeFetchSearch);
};

$iconSearch.addEventListener("click", executeFetchSearch);

// $showMore.addEventListener("click", () => {
//   MAXIMUM_GIFS2 += 12;
//   console.log(MAXIMUM_GIFS2);
// });
