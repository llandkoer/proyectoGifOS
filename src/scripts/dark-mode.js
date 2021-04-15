const btnSwitch = document.querySelector("#switch");
const logo = document.querySelector("#logo");
const camera = document.querySelector("#camera");
const movie = document.querySelector("#movie");

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark") === true) {
    btnSwitch.innerHTML = "Modo Diurno";

    logo.removeAttribute("src");
    logo.setAttribute("src", "../src/assets/logo-dark-mode.svg");

    camera.removeAttribute("src");
    camera.setAttribute("src", "../src/assets/illustration-camera-dark.svg");

    movie.removeAttribute("src");
    movie.setAttribute("src", "../src/assets/Illustration-movie-dark.svg");

    localStorage.setItem("dark-mode", "true");
  } else {
    btnSwitch.innerHTML = "Modo Nocturno";
    logo.removeAttribute("src");
    logo.setAttribute("src", "../src/assets/logo.svg");

    camera.removeAttribute("src");
    camera.setAttribute("src", "../src/assets/illustration-camera.svg");

    movie.removeAttribute("src");
    movie.setAttribute("src", "../src/assets/illustration-movie.svg");

    localStorage.setItem("dark-mode", "false");
  }
});

if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");

  btnSwitch.innerHTML = "Modo Diurno";

  logo.removeAttribute("src");
  logo.setAttribute("src", "../src/assets/logo-dark-mode.svg");

  camera.removeAttribute("src");
  camera.setAttribute("src", "../src/assets/illustration-camera-dark.svg");

  movie.removeAttribute("src");
  movie.setAttribute("src", "../src/assets/Illustration-movie-dark.svg");
} else {
  document.body.classList.remove("dark");
}
