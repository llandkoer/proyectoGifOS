const myGifosAsString = localStorage.getItem("myGifos");
const theGifos = JSON.parse(myGifosAsString);

const $myGifosContainer = document.querySelector(".MisGifos__father");

for (let i = 0; i < theGifos.length; i += 1) {
  const $myGifosItem = document.createElement("div");
  $myGifosItem.className = "MisGifos__item";
  $myGifosContainer.appendChild($myGifosItem);

  const $myGifosGif = document.createElement("img");
  $myGifosGif.className = "MisGifos__img";
  $myGifosGif.src = theGifos[i].images.original.url;
  $myGifosGif.alt = "Otro de mis GifOS";
  $myGifosItem.appendChild($myGifosGif);

  const $myGifosBg = document.createElement("div");
  $myGifosBg.className = "MisGifos__hover";
  $myGifosItem.appendChild($myGifosBg);

  const $myGifosIcons = document.createElement("div");
  $myGifosIcons.className = "MisGifos__icons";
  $myGifosItem.appendChild($myGifosIcons);

  const $myGifoFirstIconContainer = document.createElement("div");
  $myGifoFirstIconContainer.className = "MisGifos__icon-container";
  $myGifosIcons.appendChild($myGifoFirstIconContainer);
  const $myGifoFirstIcon = document.createElement("span");
  $myGifoFirstIcon.className = "MisGifos__icon--first";
  $myGifoFirstIconContainer.appendChild($myGifoFirstIcon);

  const $myGifoSecondIconContainer = document.createElement("div");
  $myGifoSecondIconContainer.className = "MisGifos__icon-container";
  $myGifosIcons.appendChild($myGifoSecondIconContainer);
  const $myGifoSecondIcon = document.createElement("span");
  $myGifoSecondIcon.className = "MisGifos__icon--second";
  $myGifoSecondIconContainer.appendChild($myGifoSecondIcon);

  const downloadGif = async () => {
    const myGif = await fetch(`https://media.giphy.com/media/${theGifos[i].id}/giphy.gif`);
    const file = await myGif.blob();
    const urlBlob = URL.createObjectURL(file);
    const $aTag = document.createElement("a");
    $aTag.download = "mi-gifo.gif";
    $aTag.href = urlBlob;
    $aTag.click();
  };

  $myGifoSecondIconContainer.addEventListener("click", () => {
    downloadGif();
  });

  const $myGifoLastIconContainer = document.createElement("div");
  $myGifoLastIconContainer.className = "MisGifos__icon-container";
  $myGifosIcons.appendChild($myGifoLastIconContainer);
  const $myGifoLastIcon = document.createElement("span");
  $myGifoLastIcon.className = "MisGifos__icon--last";
  $myGifoLastIconContainer.appendChild($myGifoLastIcon);

  const $myGifosText = document.createElement("div");
  $myGifosText.className = "MisGifos__text";
  $myGifosItem.appendChild($myGifosText);

  const $myGifosUser = document.createElement("p");
  $myGifosUser.className = "MisGifos__p";
  $myGifosUser.textContent = "Me";
  $myGifosText.appendChild($myGifosUser);

  const $myGifosTitle = document.createElement("p");
  $myGifosTitle.className = "MisGifos__title";
  $myGifosTitle.textContent = "Otro de mis GifOS";
  $myGifosText.appendChild($myGifosTitle);

  $myGifoFirstIconContainer.addEventListener("click", () => {
    $myGifosContainer.removeChild($myGifosItem);

    // eslint-disable-next-line max-len
    const itemToDelete = theGifos.find((item) => item.images.original.url === theGifos[i].images.original.url);

    const arrayIndex = theGifos.indexOf(itemToDelete);
    if (arrayIndex !== -1) {
      theGifos.splice(arrayIndex, 1);
    }

    localStorage.setItem("myGifos", JSON.stringify(theGifos));
  });

  // eslint-disable-next-line no-inner-declarations
  function openFullscreen() {
    if ($myGifosItem.requestFullscreen) {
      $myGifosItem.requestFullscreen();
    } else if ($myGifosItem.webkitRequestFullscreen) {
      $myGifosItem.webkitRequestFullscreen();
    } else if ($myGifosItem.msRequestFullscreen) {
      $myGifosItem.msRequestFullscreen();
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
    $myGifosItem.id = "mainDiv";
    $myGifosGif.id = "theGif--";
    $myGifosBg.id = "theHoverDiv--";
    $myGifosIcons.id = "sliderICons--";
    $myGifoFirstIconContainer.id = "iconsContainers1--";
    $myGifoSecondIconContainer.id = "iconsContainers2--";
    $myGifoLastIconContainer.id = "iconsContainers3--";
    $myGifoFirstIcon.id = "firstIcon--";
    $myGifoSecondIcon.id = "secondIcon--";
    $myGifoLastIcon.id = "lastIcon--";
    $myGifosText.id = "textContainer--";
    $myGifosUser.id = "textUser--";
    $myGifosTitle.id = "textTitle--";

    openFullscreen();

    $myGifoLastIconContainer.removeEventListener("click", makeAGifFullScreen);

    // eslint-disable-next-line no-use-before-define
    $myGifoLastIconContainer.addEventListener("click", whenCloseFullScreen);
  };

  const whenCloseFullScreen = () => {
    $myGifosItem.removeAttribute("id");
    $myGifosGif.removeAttribute("id");
    $myGifosBg.removeAttribute("id");
    $myGifosIcons.removeAttribute("id");
    $myGifoFirstIconContainer.removeAttribute("id");
    $myGifoSecondIconContainer.removeAttribute("id");
    $myGifoLastIconContainer.removeAttribute("id");
    $myGifoFirstIcon.removeAttribute("id"); // Ponerle el corazón full
    $myGifoSecondIcon.removeAttribute("id");
    $myGifoLastIcon.removeAttribute("id");
    $myGifosText.removeAttribute("id"); // right: 10%;
    $myGifosUser.removeAttribute("id"); // margin-right: 202px;
    $myGifosTitle.removeAttribute("id");

    closeFullscreen();

    $myGifoLastIconContainer.removeEventListener("click", whenCloseFullScreen);

    $myGifoLastIconContainer.addEventListener("click", makeAGifFullScreen);
  };

  $myGifoLastIconContainer.addEventListener("click", makeAGifFullScreen);
}
