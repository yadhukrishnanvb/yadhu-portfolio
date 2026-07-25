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
