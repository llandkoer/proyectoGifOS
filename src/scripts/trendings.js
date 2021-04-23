const $sliderContainer = document.querySelector(".slider__container");

const API_KEY = "hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD";
const MAXIMUM_GIFS = 10;
const TRENDINGS_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${MAXIMUM_GIFS}`;

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
  });
}

getTrendings(TRENDINGS_ENDPOINT);
