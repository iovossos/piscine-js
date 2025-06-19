import { places } from "./where-do-we-go.data.js";

let scroll = window.scrollY;
const location = document.createElement("a");
location.classList.add("location");
document.body.appendChild(location);

document.addEventListener("DOMContentLoaded", () => {
  selectPlace();
});

document.addEventListener("scroll", () => {
  selectPlace();
  const dir = scroll > window.scrollY ? "N" : "S";
  document.querySelector(".direction").textContent = dir;
  scroll = window.scrollY;
});

function explore() {
  // sort places from north to south
  places.sort(compareCoordinates);
  console.log(places);

  // create each section
  places.forEach(createSection);

  // create compass
  const compass = document.createElement("div");
  compass.classList.add("direction");
  document.body.appendChild(compass);
}

function createSection(place) {
  const section = document.createElement("section");
  const imgName = place.name.toLowerCase().replace(/ /g, "-").split(",")[0];
  section.style.background = `url('./where-do-we-go_images/${imgName}.jpg')`;
  section.style.backgroundSize = "cover";
  section.style.backgroundPosition = "center";
  section.style.backgroundRepeat = "no-repeat";
  section.style.width = "100%";
  section.style.height = "100vh";
  document.body.appendChild(section);
}

function selectPlace() {
  const sectionHeight = window.innerHeight;
  const midScroll = window.scrollY + sectionHeight / 2;
  const index = Math.floor(midScroll / sectionHeight);
  const place = places[index];

  location.textContent = `${place.name}\n${place.coordinates}`;
  location.href = `https://www.google.com/maps/place/${encodeCoordinates(
    place.coordinates
  )}/`;
  location.target = "_blank";
  location.style.color = place.color;

  console.log(decodeURIComponent(location.href));
}

function encodeCoordinates(coord) {
  return coord
    .replaceAll(" ", "%20")
    .replaceAll("°", "%C2%B0")
    .replaceAll('"', "%22");
}

function parseLat(coord) {
  const [latPart] = coord.split(" ");
  const [deg, rest] = latPart.split("°");
  const [min, secWithDir] = rest.split("'");
  const sec = secWithDir.split('"')[0];
  const dir = secWithDir.split('"')[1];

  let decimal = parseInt(deg) * 3600 + parseInt(min) * 60 + parseInt(sec);
  if (dir === "S") decimal *= -1;
  return decimal;
}

function compareCoordinates(a, b) {
  const aLat = parseLat(a.coordinates);
  const bLat = parseLat(b.coordinates);

  // sort descending (north to south)
  return bLat - aLat;
}

export { explore };
