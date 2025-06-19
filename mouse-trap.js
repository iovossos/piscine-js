let lastCircle = null;
let trappedCircles = new Set();
let boxElement = null;

export function setBox() {
  // create the box and center it in the page
  boxElement = document.createElement("div");
  boxElement.classList.add("box");
  document.body.appendChild(boxElement);

  // calculate center position
  const boxWidth = boxElement.offsetWidth;
  const boxHeight = boxElement.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  boxElement.style.position = "absolute";
  boxElement.style.left = `${(windowWidth - boxWidth) / 2}px`;
  boxElement.style.top = `${(windowHeight - boxHeight) / 2}px`;
}

export function createCircle() {
  // create a circle every time you click
  window.addEventListener("click", (e) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.background = "white";
    circle.style.left = `${e.clientX - 25}px`; // center the circle on click
    circle.style.top = `${e.clientY - 25}px`;

    document.body.appendChild(circle);
    lastCircle = circle;
  });
}

export function moveCircle() {
  // move the last circle with the mouse
  window.addEventListener("mousemove", (e) => {
    if (!lastCircle || trappedCircles.has(lastCircle)) return;

    const newLeft = e.clientX - 25;
    const newTop = e.clientY - 25;
    const boxRect = boxElement.getBoundingClientRect();

    const buffer = 1; // box border thickness
    const circleDiameter = 50;

    // check if the circle is totally inside the box
    const insideHorizontally =
      newLeft >= boxRect.left + buffer &&
      newLeft + circleDiameter <= boxRect.right - buffer;

    const insideVertically =
      newTop >= boxRect.top + buffer &&
      newTop + circleDiameter <= boxRect.bottom - buffer;

    if (insideHorizontally && insideVertically) {
      // trap it and make it purple
      lastCircle.style.background = "var(--purple)";
      trappedCircles.add(lastCircle);
    } else {
      // move the circle if it’s not trapped
      lastCircle.style.left = `${newLeft}px`;
      lastCircle.style.top = `${newTop}px`;
    }
  });
}
