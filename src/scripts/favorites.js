const favoritesAsString = localStorage.getItem("favorites");
const otherFavoritesAsString = localStorage.getItem("someFavorites");

const firstArrayParsed = JSON.parse(favoritesAsString);
const secondArrayParsed = JSON.parse(otherFavoritesAsString);

const theFavorites = [...firstArrayParsed, ...secondArrayParsed];

const $favoritesContainer = document.querySelector(".favorites__father");

for (let i = 0; i < theFavorites.length; i += 1) {
  const $favoritesItem = document.createElement("div");
  $favoritesItem.className = "favorites__item";
  $favoritesContainer.appendChild($favoritesItem);

  const $favoritesGif = document.createElement("img");
  $favoritesGif.className = "favorites__img";
  $favoritesGif.src = theFavorites[i].images.original.url;
  $favoritesGif.alt = theFavorites[i].title;
  $favoritesItem.appendChild($favoritesGif);

  const $favoritesBg = document.createElement("div");
  $favoritesBg.className = "favorites__hover";
  $favoritesItem.appendChild($favoritesBg);

  const $favoritesIcons = document.createElement("div");
  $favoritesIcons.className = "favorites__icons";
  $favoritesItem.appendChild($favoritesIcons);

  const $favoritesFirstIconContainer = document.createElement("div");
  $favoritesFirstIconContainer.className = "favorites__icon-container";
  $favoritesIcons.appendChild($favoritesFirstIconContainer);
  const $favoritesFirstIcon = document.createElement("span");
  $favoritesFirstIcon.className = "favorites__icon--first";
  $favoritesFirstIconContainer.appendChild($favoritesFirstIcon);

  const $favoritesSecondIconContainer = document.createElement("div");
  $favoritesSecondIconContainer.className = "favorites__icon-container";
  $favoritesIcons.appendChild($favoritesSecondIconContainer);
  const $favoritesSecondIcon = document.createElement("span");
  $favoritesSecondIcon.className = "favorites__icon--second";
  $favoritesSecondIconContainer.appendChild($favoritesSecondIcon);

  const downloadGif = async () => {
    const myGif = await fetch(`https://media.giphy.com/media/${theFavorites[i].id}/giphy.gif`);
    const file = await myGif.blob();
    const urlBlob = URL.createObjectURL(file);
    const $aTag = document.createElement("a");
    $aTag.download = `${theFavorites[i].title}.gif`;
    $aTag.href = urlBlob;
    $aTag.click();
  };

  $favoritesSecondIconContainer.addEventListener("click", () => {
    downloadGif();
  });

  const $favoritesLastIconContainer = document.createElement("div");
  $favoritesLastIconContainer.className = "favorites__icon-container";
  $favoritesIcons.appendChild($favoritesLastIconContainer);
  const $favoritesLastIcon = document.createElement("span");
  $favoritesLastIcon.className = "favorites__icon--last";
  $favoritesLastIconContainer.appendChild($favoritesLastIcon);

  const $favoritesText = document.createElement("div");
  $favoritesText.className = "favorites__text";
  $favoritesItem.appendChild($favoritesText);

  const $favoritesUser = document.createElement("p");
  $favoritesUser.className = "favorites__p";
  if (theFavorites[i].username === "") {
    $favoritesUser.textContent = "Desconocido";
  } else {
    $favoritesUser.textContent = theFavorites[i].username;
  }
  $favoritesText.appendChild($favoritesUser);

  const $favoritesTitle = document.createElement("p");
  $favoritesTitle.className = "favorites__title";
  if (theFavorites[i].title === "") {
    $favoritesTitle.textContent = "Un GIF sin título";
  } else {
    $favoritesTitle.textContent = theFavorites[i].title;
  }
  $favoritesText.appendChild($favoritesTitle);

  $favoritesFirstIconContainer.addEventListener("click", () => {
    $favoritesContainer.removeChild($favoritesItem);

    const itemToDelete = theFavorites.find((item) => item.title === theFavorites[i].title);

    const arrayIndex = theFavorites.indexOf(itemToDelete);
    if (arrayIndex !== -1) {
      theFavorites.splice(arrayIndex, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(theFavorites));
  });

  // eslint-disable-next-line no-inner-declarations
  function openFullscreen() {
    if ($favoritesItem.requestFullscreen) {
      $favoritesItem.requestFullscreen();
    } else if ($favoritesItem.webkitRequestFullscreen) {
      $favoritesItem.webkitRequestFullscreen();
    } else if ($favoritesItem.msRequestFullscreen) {
      $favoritesItem.msRequestFullscreen();
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
    $favoritesItem.id = "mainDiv";
    $favoritesGif.id = "theGif--";
    $favoritesBg.id = "theHoverDiv--";
    $favoritesIcons.id = "sliderICons--";
    $favoritesFirstIconContainer.id = "iconsContainers1--";
    $favoritesSecondIconContainer.id = "iconsContainers2--";
    $favoritesLastIconContainer.id = "iconsContainers3--";
    $favoritesFirstIcon.id = "firstIcon--";
    $favoritesSecondIcon.id = "secondIcon--";
    $favoritesLastIcon.id = "lastIcon--";
    $favoritesText.id = "textContainer--";
    $favoritesUser.id = "textUser--";
    $favoritesTitle.id = "textTitle--";

    openFullscreen();

    $favoritesLastIconContainer.removeEventListener("click", makeAGifFullScreen);

    // eslint-disable-next-line no-use-before-define
    $favoritesLastIconContainer.addEventListener("click", whenCloseFullScreen);
  };

  const whenCloseFullScreen = () => {
    $favoritesItem.removeAttribute("id");
    $favoritesGif.removeAttribute("id");
    $favoritesBg.removeAttribute("id");
    $favoritesIcons.removeAttribute("id");
    $favoritesFirstIconContainer.removeAttribute("id");
    $favoritesSecondIconContainer.removeAttribute("id");
    $favoritesLastIconContainer.removeAttribute("id");
    $favoritesFirstIcon.removeAttribute("id"); // Ponerle el corazón full
    $favoritesSecondIcon.removeAttribute("id");
    $favoritesLastIcon.removeAttribute("id");
    $favoritesText.removeAttribute("id"); // right: 10%;
    $favoritesUser.removeAttribute("id"); // margin-right: 202px;
    $favoritesTitle.removeAttribute("id");

    closeFullscreen();

    $favoritesLastIconContainer.removeEventListener("click", whenCloseFullScreen);

    $favoritesLastIconContainer.addEventListener("click", makeAGifFullScreen);
  };

  $favoritesLastIconContainer.addEventListener("click", makeAGifFullScreen);
}
