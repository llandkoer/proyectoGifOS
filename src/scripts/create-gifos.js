let recorder;
const btnStartRecord = document.querySelector("#btnStartRecord");
const mainContainer = document.querySelector(".create-gifos__main");
const titleCreateGifos = document.querySelector(".create-gifos__main > h2");
const textCreateGifos = document.querySelector(".create-gifos__main > p");
const firstStepCreateGifos = document.querySelector(".create-gifos__steps");
const secondStepCreateGifos = document.querySelectorAll(".create-gifos__steps")[1];
const lastStepCreateGifos = document.querySelectorAll(".create-gifos__steps")[2];
const videoContainer = document.createElement("div");
const videoRecord = document.createElement("video");
const timer = document.createElement("div");
const textContainerVideo = document.createElement("div");
const textContentVideo = document.createElement("p");
const purpleBackground = document.createElement("div");
const loader = document.createElement("img");
let form = new FormData();
let gifID;
const watch = timer;
let milliseconds = 0;
let chronometer;

const allMyGifos = [];

const $header = document.querySelector(".header__container--flex");

const saveOnLocalStorage = () => {
  if (localStorage.getItem("myGifos")) {
    const alreadySavedItems = JSON.parse(localStorage.getItem("myGifos"));

    allMyGifos.push(...alreadySavedItems);
  }

  const personasMap = allMyGifos.map((item) => [item.id, item]);
  const personasMapArr = new Map(personasMap); // Pares de clave y valor

  const uniques = [...personasMapArr.values()]; // Conversión a un array

  localStorage.setItem("myGifos", JSON.stringify(uniques));
  // localStorage.setItem("myGifos", JSON.stringify(allMyGifos));
  // $header.removeEventListener("click", saveOnLocalStorage);
};

$header.addEventListener("click", saveOnLocalStorage);

function timeStart() {
  clearInterval(chronometer);
  chronometer = setInterval(() => {
    milliseconds += 10;

    const dateTimer = new Date(milliseconds);

    watch.innerHTML = `${`0${dateTimer.getUTCMinutes()}`.slice(-2)}:${`0${dateTimer.getUTCSeconds()}`.slice(
      -2
    )}:${`0${dateTimer.getUTCMilliseconds()}`.slice(-3, -1)}`;
  }, 10);
}

function timePaused() {
  clearInterval(chronometer);
}

const actionBtnStartRecord = () => {
  // eslint-disable-next-line no-use-before-define
  captureCamera((stream) => {
    // eslint-disable-next-line no-undef
    recorder = RecordRTC(stream, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted() {
        // eslint-disable-next-line no-console
        console.log("started");
      },
    });
  });
  btnStartRecord.style = "display: none;";
  titleCreateGifos.innerHTML = "¿Nos das acceso <br /> a tu cámara?";
  textCreateGifos.innerHTML = "El acceso a tu cámara será válido sólo <br /> por el tiempo en el que estés creando el GIFO.";
  firstStepCreateGifos.className = "create-gifos__steps--highlighted ";
};

async function postData() {
  try {
    const res = await fetch("https://upload.giphy.com/v1/gifs?api_key=hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD", {
      method: "post",
      body: form,
      redirect: "follow",
    });
    const json = await res.json();
    gifID = json.data.id;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function getMyGif() {
  try {
    const resp = await fetch(`https://api.giphy.com/v1/gifs/${gifID}?api_key=hHX3bZ1xLpCNgZZtcHmUuvAlBCvDuBtD`);
    const myJson = await resp.json();
    const myGifoData = myJson.data;

    allMyGifos.push(myGifoData);

    loader.src = "https://svgur.com/i/WG0.svg";
    textContentVideo.textContent = "GIFO subido con éxito";

    const iconsContainer = document.createElement("div");
    iconsContainer.className = "iconsContainer";

    const downloadContainer = document.createElement("div");
    downloadContainer.className = "downloadContainer";

    const linkContainer = document.createElement("div");
    linkContainer.className = "linkContainer";

    textContainerVideo.appendChild(iconsContainer);
    iconsContainer.append(linkContainer, downloadContainer);

    const downloadIcon = document.createElement("img");
    downloadIcon.src = "https://svgur.com/i/WEz.svg";
    downloadContainer.appendChild(downloadIcon);

    const linkIcon = document.createElement("img");
    linkIcon.src = "https://svgur.com/i/WGB.svg";
    linkContainer.appendChild(linkIcon);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const actionBtnStartRecord4 = async () => {
  lastStepCreateGifos.className = "create-gifos__steps--highlighted";
  secondStepCreateGifos.className = "create-gifos__steps";
  videoContainer.appendChild(textContainerVideo);
  videoContainer.appendChild(purpleBackground);
  purpleBackground.style = "opacity: 0.6;background: rgb(87, 46, 229);position: absolute;z-index: 99999;width: 428px;top: 0;left: 26px;height: 100%;";
  loader.style = "width: 22px; height: 22px; z-index: 999999; position: absolute; left: calc(50% - 15px); bottom: 50%;";
  loader.src = "https://svgur.com/i/WFL.svg";
  textContainerVideo.appendChild(loader);

  btnStartRecord.style = "display: none;";
  timer.style = "display: none;";

  textContentVideo.style = "font-size: 15px; color: #FFFFFF; z-index: 999999; position: absolute; left: calc(50% - 85px); bottom: calc(50% - 40px);";
  textContentVideo.textContent = "Estamos subiendo tu GIFO";
  textContainerVideo.appendChild(textContentVideo);

  titleCreateGifos.style = "opacity: 0;";
  textCreateGifos.style = "opacity: 0;";
  btnStartRecord.removeEventListener("click", actionBtnStartRecord4);
  await postData();
  getMyGif();
};

const actionBtnStartRecord3 = () => {
  btnStartRecord.textContent = "Subir Gifo";
  timer.textContent = "Repetir captura";
  timer.style = "border-bottom: 4px solid #50E3C2; font-size: 1.3rem; cursor:pointer;";
  timePaused();
  // eslint-disable-next-line no-use-before-define
  btnStartRecord.removeEventListener("click", actionBtnStartRecord3);
  btnStartRecord.addEventListener("click", actionBtnStartRecord4);
  recorder.stopRecording(() => {
    form.append("file", recorder.getBlob(), "myGif.gif");
    // eslint-disable-next-line no-console
    console.log(form.get("file"));
  });

  const repeatGif = () => {
    timer.textContent = "00:00:00";
    timer.style = "";
    timePaused();
    milliseconds = 0;
    chronometer = 0;
    btnStartRecord.removeEventListener("click", actionBtnStartRecord4);
    timer.removeEventListener("click", repeatGif);
    form = new FormData();
    actionBtnStartRecord();
  };
  timer.addEventListener("click", repeatGif);
};

const actionBtnStartRecord2 = () => {
  mainContainer.appendChild(timer);
  timer.textContent = "00:00:00";
  timer.className = "create-gifos__timer";
  timeStart();
  btnStartRecord.textContent = "Finalizar";
  recorder.startRecording();
  btnStartRecord.removeEventListener("click", actionBtnStartRecord2);
  btnStartRecord.addEventListener("click", actionBtnStartRecord3);
};

const captureCamera = (callback) => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      callback(stream);
      mainContainer.appendChild(videoContainer);
      videoContainer.appendChild(videoRecord);
      videoContainer.className = "create-gifos__video-container";
      videoRecord.srcObject = stream;
      videoRecord.autoplay = "true";
      videoRecord.className = "create-gifos__video";
      firstStepCreateGifos.className = "create-gifos__steps";
      secondStepCreateGifos.className = "create-gifos__steps--highlighted";
      btnStartRecord.removeEventListener("click", actionBtnStartRecord);
      btnStartRecord.style = "display: block;";
      btnStartRecord.textContent = "Grabar";
      btnStartRecord.addEventListener("click", actionBtnStartRecord2);
    })
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert(
        "Necesitamos acceso para poder funcionar. Si cambias de opinión, puedes darnos acceso a tu cámara en el ícono ubicado al inicio de la barra de navegación"
      );
    });
};

btnStartRecord.addEventListener("click", actionBtnStartRecord);
