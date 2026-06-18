// ── ACTIVE NAV LINK ON SCROLL ──
// Tracks which section is visible in the right panel and highlights the nav link

const rightPanel = document.querySelector(".right-panel");
const sections = document.querySelectorAll(".r-section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if ((rightPanel ? rightPanel.scrollTop : window.scrollY) >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

if (rightPanel) {
  rightPanel.addEventListener("scroll", setActiveLink);
} else {
  window.addEventListener("scroll", setActiveLink);
}

setActiveLink();

// ── NAV CLICK — scroll inside right panel ──
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;

    if (rightPanel) {
      e.preventDefault();
      rightPanel.scrollTo({ top: target.offsetTop - 24, behavior: "smooth" });
    }
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  ".r-section, .exp-card, .skill-row, .coming-card",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, root: rightPanel || null },
);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
    revealObserver.observe(el);
  });
}
