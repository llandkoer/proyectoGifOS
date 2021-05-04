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
}