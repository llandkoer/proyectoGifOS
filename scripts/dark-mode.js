const btnSwitch = document.querySelector("#switch");
const logo = document.querySelector("#logo");
const camera = document.querySelector("#camera");
const movie = document.querySelector("#movie");

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark") === true) {
    localStorage.setItem("dark-mode", "true");

    btnSwitch.textContent = "Modo Diurno";

    logo.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/logo-dark-mode.svg";

    if (camera) {
      camera.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/illustration-camera-dark.svg";

      movie.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/Illustration-movie-dark.svg";
    }
  } else {
    localStorage.setItem("dark-mode", "false");

    btnSwitch.textContent = "Modo Nocturno";

    if (camera) {
      camera.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/illustration-camera.svg";

      movie.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/illustration-movie.svg";
    }

    logo.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/logo-dark-mode.svg";
  }
});

if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");

  btnSwitch.innerHTML = "Modo Diurno";

  logo.src = "https://raw.githubusercontent.com/llandkoer/proyectoGifOS/3f5c9538f2f319958c4345a01c7d5ab1ad4638ae/src/assets/logo-dark-mode.svg";

  if (camera) {
    camera.src = "../src/assets/illustration-camera-dark.svg";

    movie.src = "../src/assets/Illustration-movie-dark.svg";
  }
} else {
  document.body.classList.remove("dark");
}
