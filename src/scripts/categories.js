const $buttonParent2 = document.querySelector(".found-gifs");
const $showMore2 = document.createElement("button");
$showMore2.textContent = "Ver más";
$showMore2.className = "found-gifs__show-more";
$buttonParent2.appendChild($showMore2);
const $searchContainer2 = document.querySelector(".found-gifs__grid");
const $keywordText2 = document.querySelector(".found-gifs__keyword");
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

const THE_API_KEY = "hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD";

document.querySelector("#favorites").onclick = () => {
  if (localStorage.getItem("favorites")) {
    const alreadySavedItems = JSON.parse(localStorage.getItem("favorites"));
    // eslint-disable-next-line no-undef
    allFavorites.push(...alreadySavedItems);
  }
  // eslint-disable-next-line no-undef
  localStorage.setItem("favorites", JSON.stringify(allFavorites));
};

const itemsPerLoadCategories = 12;
let firstIndexCategories = 0;
let lastIndexCategories = 0;
let gifsCategories;

function displayCategories() {
  for (let j = firstIndexCategories; j < lastIndexCategories; j += 1) {
    const $gifContainer = document.createElement("div");
    $gifContainer.className = "found-gifs__gif-container";
    $searchContainer2.appendChild($gifContainer);

    const $myGif = document.createElement("img");
    $myGif.className = "found-gifs__gif";

    $myGif.src = gifsCategories[j].gif.images.original.url;
    $myGif.alt = gifsCategories[j].gif.title;
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

    // eslint-disable-next-line no-loop-func
    const downloadGif = async () => {
      const myGif = await fetch(`https://media.giphy.com/media/${gifsCategories[j].gif.id}/giphy.gif`);
      const file = await myGif.blob();
      const urlBlob = URL.createObjectURL(file);
      const $aTag = document.createElement("a");
      $aTag.download = `${gifsCategories[j].gif.title}.gif`;
      $aTag.href = urlBlob;
      $aTag.click();
    };

    $secondSearchIconContainer.addEventListener("click", () => {
      downloadGif();
    });

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
    if (gifsCategories[j].gif.username === "") {
      $searchUser.textContent = "Desconocido";
    } else {
      $searchUser.textContent = gifsCategories[j].gif.username;
    }
    $searchText.appendChild($searchUser);

    const $searchTitle = document.createElement("p");
    $searchTitle.className = "found-gifs__title";
    if (gifsCategories[j].gif.title === "") {
      $searchTitle.textContent = "Un GIF sin título";
    } else {
      $searchTitle.textContent = gifsCategories[j].gif.title;
    }
    $searchText.appendChild($searchTitle);

    if (lastIndexCategories >= gifsCategories.length) {
      $showMore2.style = "display: none";
    }

    // eslint-disable-next-line no-inner-declarations
    function openFullscreen() {
      if ($gifContainer.requestFullscreen) {
        $gifContainer.requestFullscreen();
      } else if ($gifContainer.webkitRequestFullscreen) {
        $gifContainer.webkitRequestFullscreen();
      } else if ($gifContainer.msRequestFullscreen) {
        $gifContainer.msRequestFullscreen();
      }
    }

    // eslint-disable-next-line no-inner-declarations
    function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    const makeAGifFullScreen = () => {
      $gifContainer.id = "mainDiv";
      $myGif.id = "theGif--";
      $purpleBg.id = "theHoverDiv--";
      $searchIcons.id = "sliderICons--";
      $firstSearchIconContainer.id = "iconsContainers1--";
      $secondSearchIconContainer.id = "iconsContainers2--";
      $lastSearchIconContainer.id = "iconsContainers3--";
      $firstSearchIcon.id = "firstIcon--";
      $secondSearchIcon.id = "secondIcon--";
      $lastSearchIcon.id = "lastIcon--";
      $searchText.id = "textContainer--";
      $searchUser.id = "textUser--";
      $searchTitle.id = "textTitle--";

      openFullscreen();

      $lastSearchIconContainer.removeEventListener("click", makeAGifFullScreen);

      // eslint-disable-next-line no-use-before-define
      $lastSearchIconContainer.addEventListener("click", whenCloseFullScreen);
    };

    const whenCloseFullScreen = () => {
      $gifContainer.removeAttribute("id");
      $myGif.removeAttribute("id");
      $purpleBg.removeAttribute("id");
      $searchIcons.removeAttribute("id");
      $firstSearchIconContainer.removeAttribute("id");
      $secondSearchIconContainer.removeAttribute("id");
      $lastSearchIconContainer.removeAttribute("id");
      $firstSearchIcon.removeAttribute("id");
      $secondSearchIcon.removeAttribute("id");
      $lastSearchIcon.removeAttribute("id");
      $searchText.removeAttribute("id");
      $searchUser.removeAttribute("id");
      $searchTitle.removeAttribute("id");

      closeFullscreen();

      $lastSearchIconContainer.removeEventListener("click", whenCloseFullScreen);

      $lastSearchIconContainer.addEventListener("click", makeAGifFullScreen);
    };

    $lastSearchIconContainer.addEventListener("click", makeAGifFullScreen);

    // eslint-disable-next-line no-loop-func
    const putItemInFavorites = () => {
      $firstSearchIcon.style = `background-image: url("https://raw.githubusercontent.com/llandkoer/proyectoGifOS/13964bfe2de43b5efc79bb3e6e83bb3ff3b0f619/src/assets/icon-heart-full.svg");`;

      // eslint-disable-next-line no-undef
      allFavorites.push(gifsCategories[j].gif);
      // localStorage.setItem(`favorite${i}`, JSON.stringify(gifs[i]));

      $firstSearchIconContainer.removeEventListener("click", putItemInFavorites);
      // eslint-disable-next-line no-use-before-define
      $firstSearchIconContainer.addEventListener("click", removeItemFromFavorites);
    };

    // eslint-disable-next-line no-loop-func
    const removeItemFromFavorites = () => {
      $firstSearchIcon.style = `background-image: url("https://raw.githubusercontent.com/llandkoer/proyectoGifOS/13964bfe2de43b5efc79bb3e6e83bb3ff3b0f619/src/assets/icon-heart.svg");`;

      // eslint-disable-next-line no-undef
      if (allFavorites.includes(gifsCategories[j].gif)) {
        // eslint-disable-next-line no-undef
        allFavorites.pop(gifsCategories[j].gif);
      }

      // eslint-disable-next-line no-undef
      $firstSearchIconContainer.removeEventListener("click", removeItemFromFavorites);
      // eslint-disable-next-line no-undef
      $firstSearchIconContainer.addEventListener("click", putItemInFavorites);
    };

    $firstSearchIconContainer.addEventListener("click", putItemInFavorites);
  }
  firstIndexCategories += itemsPerLoadCategories;
  lastIndexCategories = firstIndexCategories + itemsPerLoadCategories;
}

async function getCategories(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    gifsCategories = json.data;
    displayCategories();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const executeFetchCategoriesReactions = () => {
  firstIndexCategories = 0;
  lastIndexCategories = itemsPerLoadCategories;
  $searchContainer2.textContent = "";
  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/reactions?api_key=${THE_API_KEY}`;
  $keywordText2.textContent = $reactions.textContent;
  $showMore2.style = "display: block;";
  getCategories(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesEntertainment = () => {
  firstIndexCategories = 0;
  lastIndexCategories = itemsPerLoadCategories;
  $searchContainer2.innerHTML = "";
  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/entertainment?api_key=${THE_API_KEY}`;
  $keywordText2.textContent = $entertainment.textContent;
  $showMore2.style = "display: block;";
  getCategories(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesSports = () => {
  firstIndexCategories = 0;
  lastIndexCategories = itemsPerLoadCategories;
  $searchContainer2.innerHTML = "";
  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/sports?api_key=${THE_API_KEY}`;
  $keywordText2.textContent = $sports.textContent;
  $showMore2.style = "display: block;";
  getCategories(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesStickers = () => {
  firstIndexCategories = 0;
  lastIndexCategories = itemsPerLoadCategories;
  $searchContainer2.innerHTML = "";
  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/stickers?api_key=${THE_API_KEY}`;
  $keywordText2.textContent = $stickers.textContent;
  $showMore2.style = "display: block;";
  getCategories(CATEGORIES_ENDPOINT);
};

const executeFetchCategoriesArtists = () => {
  firstIndexCategories = 0;
  lastIndexCategories = itemsPerLoadCategories;
  $searchContainer2.innerHTML = "";
  const CATEGORIES_ENDPOINT = `https://api.giphy.com/v1/gifs/categories/artists?api_key=${THE_API_KEY}`;
  $keywordText2.textContent = $artists.textContent;
  $showMore2.style = "display: block;";
  getCategories(CATEGORIES_ENDPOINT);
};

$reactions.addEventListener("click", executeFetchCategoriesReactions);
$entertainment.addEventListener("click", executeFetchCategoriesEntertainment);
$sports.addEventListener("click", executeFetchCategoriesSports);
$stickers.addEventListener("click", executeFetchCategoriesStickers);
$artists.addEventListener("click", executeFetchCategoriesArtists);

$showMore2.addEventListener("click", displayCategories);
