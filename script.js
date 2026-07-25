function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const animatedElements = document.querySelectorAll(
  "section > .section__text__p1, section > .title, .details-container, .text-container, .contact-info-upper-container"
);

animatedElements.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedElements.forEach((element) => revealObserver.observe(element));

const experienceCards = document.querySelectorAll("#experience .details-container");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

experienceCards.forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");

  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion.matches || event.pointerType === "touch") return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--tilt-x", `${(0.5 - y) * 10}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
    card.style.setProperty("--shine-x", `${x * 100}%`);
    card.style.setProperty("--shine-y", `${y * 100}%`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
  });

  const selectCard = () => {
    experienceCards.forEach((otherCard) => {
      const isSelected = otherCard === card;
      otherCard.classList.toggle("is-selected", isSelected);
      otherCard.setAttribute("aria-pressed", String(isSelected));
    });

    if (!prefersReducedMotion.matches) {
      card.classList.remove("is-rotating");
      void card.offsetWidth;
      card.classList.add("is-rotating");
    }
  };

  card.addEventListener("click", selectCard);
  card.addEventListener("animationend", () => {
    card.classList.remove("is-rotating");
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCard();
    }
  });
});
