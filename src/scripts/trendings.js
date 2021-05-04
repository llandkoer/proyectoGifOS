const $sliderContainer = document.querySelector(".slider__container");

const API_KEY = "hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD";
const MAXIMUM_GIFS = 20;
const TRENDINGS_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${MAXIMUM_GIFS}`;

const favoritesArray = [];

const addToTheFavoritesSection = () => {
  if (localStorage.getItem("someFavorites")) {
    const alreadySavedItems = JSON.parse(localStorage.getItem("someFavorites"));
    favoritesArray.push(...alreadySavedItems);
  }
  const itemsMap2 = favoritesArray.map((item) => [item.id, item]);
  const itemsMapArr2 = new Map(itemsMap2);

  const uniques = [...itemsMapArr2.values()];
  localStorage.setItem("someFavorites", JSON.stringify(uniques));
};

const $header = document.querySelector("#header");
$header.addEventListener("click", addToTheFavoritesSection);

async function getTrendings(url) {
  const resp = await fetch(url);
  const json = await resp.json();

  json.data.forEach((element) => {
    const $sliderItem = document.createElement("div");
    $sliderItem.className = "slider__item";
    $sliderContainer.appendChild($sliderItem);

    const $gif = document.createElement("img");
    $gif.className = "slider__img";
    $gif.src = element.images.original.url;
    $gif.alt = element.title;
    $sliderItem.appendChild($gif);

    const $sliderHover = document.createElement("div");
    $sliderHover.className = "slider__hover";
    $sliderItem.appendChild($sliderHover);

    const $sliderIcons = document.createElement("div");
    $sliderIcons.className = "slider__icons";
    $sliderItem.appendChild($sliderIcons);

    const $firstIconContainer = document.createElement("div");
    $firstIconContainer.className = "slider__icon-container";
    $sliderIcons.appendChild($firstIconContainer);
    const $firstIcon = document.createElement("span");
    $firstIcon.className = "slider__icon--first";
    $firstIconContainer.appendChild($firstIcon);

    const $secondIconContainer = document.createElement("div");
    $secondIconContainer.className = "slider__icon-container";
    $sliderIcons.appendChild($secondIconContainer);
    const $secondIcon = document.createElement("span");
    $secondIcon.className = "slider__icon--second";
    $secondIconContainer.appendChild($secondIcon);

    const $lastIconContainer = document.createElement("div");
    $lastIconContainer.className = "slider__icon-container";
    $sliderIcons.appendChild($lastIconContainer);
    const $lastIcon = document.createElement("span");
    $lastIcon.className = "slider__icon--last";
    $lastIconContainer.appendChild($lastIcon);

    const $sliderText = document.createElement("div");
    $sliderText.className = "slider__text";
    $sliderItem.appendChild($sliderText);

    const $sliderParagraph = document.createElement("p");
    $sliderParagraph.className = "slider__p";
    if (element.username === "") {
      $sliderParagraph.textContent = "Desconocido";
    } else {
      $sliderParagraph.textContent = element.username;
    }
    $sliderText.appendChild($sliderParagraph);

    const $sliderTitle = document.createElement("p");
    $sliderTitle.className = "slider__title";
    $sliderTitle.textContent = element.title;
    $sliderText.appendChild($sliderTitle);

    const addToFavorites = () => {
      $firstIcon.style = `background-image: url("https://raw.githubusercontent.com/llandkoer/proyectoGifOS/13964bfe2de43b5efc79bb3e6e83bb3ff3b0f619/src/assets/icon-heart-full.svg");`;

      favoritesArray.push(element);

      // eslint-disable-next-line no-unused-vars
      $firstIconContainer.removeEventListener("click", addToFavorites);
      // eslint-disable-next-line no-use-before-define
      $firstIconContainer.addEventListener("click", removeFromFavorites);
    };

    const removeFromFavorites = () => {
      $firstIcon.style = `background-image: url("https://raw.githubusercontent.com/llandkoer/proyectoGifOS/13964bfe2de43b5efc79bb3e6e83bb3ff3b0f619/src/assets/icon-heart.svg");`;

      if (favoritesArray.includes(element)) {
        favoritesArray.pop(element);
      }

      // eslint-disable-next-line no-undef
      $firstIconContainer.removeEventListener("click", removeFromFavorites);
      // eslint-disable-next-line no-undef
      $firstIconContainer.addEventListener("click", addToFavorites);
    };

    $firstIconContainer.addEventListener("click", addToFavorites);
  });
}

getTrendings(TRENDINGS_ENDPOINT);

// Slider

const $leftArrow = document.querySelector(".slider__arrow");
const $rightArrow = document.querySelectorAll(".slider__arrow")[1];

$leftArrow.addEventListener("click", () => {
  $sliderContainer.scrollLeft -= 400;
});

$rightArrow.addEventListener("click", () => {
  $sliderContainer.scrollLeft += 400;
});
