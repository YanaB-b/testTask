const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-button");
const modal = document.getElementById("modal");
const modalText = document.querySelector(".modal-text");

const prizes = [
  "330% up to €4000",
  "400 FS on first 4 deposits",
  "300% up to €3000 + 300 FS",
];

const sectors = {
  75: prizes[0],
  180: prizes[1],
  270: prizes[2],
};
function getRandomSector() {
  const angles = Object.keys(sectors);
  const randomIndex = Math.floor(Math.random() * angles.length);
  return parseInt(angles[randomIndex], 10);
}
function showModal(result) {
  document.body.classList.add("no-scroll");
  modalText.innerHTML = `
    <h2>Congratulations!</h2>
    <h3>You Won:</h3>
    <p>Bonus Pack ${result}</p>
    <button id="take-bonus" class="modal-button"> <div class="button left"></div>
    <span>Take Bonus</span>
    <div class="button right"></div></button>
  `;
  modal.classList.add("visible");

  const takeBonusButton = document.getElementById("take-bonus");
  takeBonusButton.addEventListener("click", closeModal);
}

function closeModal() {
  modal.classList.add("fadeOut");
  document.body.classList.remove("no-scroll");
  setTimeout(() => {
    modal.classList.remove("visible", "fadeOut");
  }, 800);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("visible")) {
    closeModal();
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
spinButton.addEventListener("click", () => {
  spinButton.disabled = true;
  const targetAngle = getRandomSector();

  const fullRotation = 360 * 8;
  const finalAngle = fullRotation + targetAngle;

  wheel.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
  wheel.style.transform = `translate(-50%, -50%) rotate(${finalAngle}deg)`;
  // wheel.style.transform = `rotate(${finalAngle}deg)`;

  setTimeout(() => {
    const result = sectors[targetAngle];
    showModal(result);
    wheel.style.transition = "none";
    // wheel.style.transform = `rotate(${targetAngle}deg)`;
    wheel.style.transform = `translate(-50%, -50%) rotate(${targetAngle}deg)`;
    spinButton.disabled = false;
  }, 4000);
});
