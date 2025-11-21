// Navigation scroll effect
(function () {
  const nav = document.getElementById("navigation");
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check initial state
})();

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Handle navigation link clicks for hash links
(function () {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        if (isHomePage) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  });
})();

// Set current year in footer
(function () {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

// Image modal functionality for project pages
(function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementById("modal-close");

  if (!modal || !modalImage || !modalClose || galleryItems.length === 0) return;

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const src = this.getAttribute("data-src");
      const type = this.getAttribute("data-type");
      const img = this.querySelector("img, video");
      const alt = img ? img.alt : "Project preview";

      if (src) {
        if (type === "video") {
          modalImage.innerHTML = `<video src="${src}" controls autoplay class="modal-image"></video>`;
        } else {
          modalImage.innerHTML = `<img src="${src}" alt="${alt}" class="modal-image">`;
        }
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    modalImage.innerHTML = "";
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();
