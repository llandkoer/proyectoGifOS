/* eslint-disable no-undef */
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

    const downloadGif = async () => {
      const myGif = await fetch(`https://media.giphy.com/media/${element.id}/giphy.gif`);
      const file = await myGif.blob();
      const urlBlob = URL.createObjectURL(file);
      const $aTag = document.createElement("a");
      $aTag.download = `${element.title}.gif`;
      $aTag.href = urlBlob;
      $aTag.click();
    };

    $secondIconContainer.addEventListener("click", () => {
      downloadGif();
    });

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

    function openFullscreen() {
      if ($sliderItem.requestFullscreen) {
        $sliderItem.requestFullscreen();
      } else if ($sliderItem.webkitRequestFullscreen) {
        $sliderItem.webkitRequestFullscreen();
      } else if ($sliderItem.msRequestFullscreen) {
        $sliderItem.msRequestFullscreen();
      }
    }

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
      $sliderItem.id = "mainDiv";
      $gif.id = "theGif--";
      $sliderHover.id = "theHoverDiv--";
      $sliderIcons.id = "sliderICons--";
      $firstIconContainer.id = "iconsContainers1--";
      $secondIconContainer.id = "iconsContainers2--";
      $lastIconContainer.id = "iconsContainers3--";
      $firstIcon.id = "firstIcon--";
      $secondIcon.id = "secondIcon--";
      $lastIcon.id = "lastIcon--";
      $sliderText.id = "textContainer--";
      $sliderParagraph.id = "textUser--";
      $sliderTitle.id = "textTitle--";

      openFullscreen();

      $lastIconContainer.removeEventListener("click", makeAGifFullScreen);

      $lastIconContainer.addEventListener("click", whenCloseFullScreen);
    };

    const whenCloseFullScreen = () => {
      $sliderItem.removeAttribute("id");
      $gif.removeAttribute("id");
      $sliderHover.removeAttribute("id");
      $sliderIcons.removeAttribute("id");
      $firstIconContainer.removeAttribute("id");
      $secondIconContainer.removeAttribute("id");
      $lastIconContainer.removeAttribute("id");
      $firstIcon.removeAttribute("id");
      $secondIcon.removeAttribute("id");
      $lastIcon.removeAttribute("id");
      $sliderText.removeAttribute("id");
      $sliderParagraph.removeAttribute("id");
      $sliderTitle.removeAttribute("id");

      closeFullscreen();

      $lastIconContainer.removeEventListener("click", whenCloseFullScreen);

      $lastIconContainer.addEventListener("click", makeAGifFullScreen);
    };

    $lastIconContainer.addEventListener("click", makeAGifFullScreen);

    const addToFavorites = () => {
      $firstIcon.style = `background-image: url("https://raw.githubusercontent.com/llandkoer/proyectoGifOS/13964bfe2de43b5efc79bb3e6e83bb3ff3b0f619/src/assets/icon-heart-full.svg");`;

      favoritesArray.push(element);

      $firstIconContainer.removeEventListener("click", addToFavorites);
      $firstIconContainer.addEventListener("click", removeFromFavorites);
    };

    const removeFromFavorites = () => {
      $firstIcon.style = `background-image: url("https://raw.githubusercontent.com/llandkoer/proyectoGifOS/13964bfe2de43b5efc79bb3e6e83bb3ff3b0f619/src/assets/icon-heart.svg");`;

      if (favoritesArray.includes(element)) {
        favoritesArray.pop(element);
      }

      $firstIconContainer.removeEventListener("click", removeFromFavorites);
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
