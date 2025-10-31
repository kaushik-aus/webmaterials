// Mobile nav
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Sticky header shadow
const header = document.querySelector("[data-header]");
const onScroll = () => {
  if (!header) return;
  if (window.scrollY > 6) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);
revealEls.forEach((el) => io.observe(el));

// Testimonials slider (kept simple)
(function initTestimonialSlider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;
  const slides = root.querySelector("[data-slides]");
  const prev = root.querySelector("[data-prev]");
  const next = root.querySelector("[data-next]");
  if (!slides) return;
  const total = slides.children.length;
  let index = 0;

  const update = () => {
    slides.style.transform = `translateX(${-index * 100}%)`;
  };
  prev?.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    update();
  });
  next?.addEventListener("click", () => {
    index = (index + 1) % total;
    update();
  });

  let timer = setInterval(() => {
    index = (index + 1) % total;
    update();
  }, 6000);
  root.addEventListener("mouseenter", () => clearInterval(timer));
  root.addEventListener("mouseleave", () => {
    timer = setInterval(() => {
      index = (index + 1) % total;
      update();
    }, 6000);
  });
  update();
})();

// -----------------------------
// Carousels (Flipkart-style)
// -----------------------------
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function initHeroCarousel(root) {
  const track = root.querySelector("[data-carousel-track]");
  const slides = Array.from(track?.children || []);
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");
  if (!track || slides.length === 0) return;

  let index = 0;
  const total = slides.length;

  // Dots
  const makeDot = (i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => {
      index = i;
      update();
      resetAuto();
    });
    return b;
  };
  const dots = [];
  if (dotsWrap) {
    for (let i = 0; i < total; i++) {
      const d = makeDot(i);
      dotsWrap.appendChild(d);
      dots.push(d);
    }
  }

  const update = () => {
    track.style.transform = `translateX(${-index * 100}%)`;
    slides.forEach((s, i) =>
      s.setAttribute("aria-label", `${i + 1} of ${total}`)
    );
    dots.forEach((d, i) =>
      d.setAttribute("aria-current", i === index ? "true" : "false")
    );
  };

  prev?.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    update();
    resetAuto();
  });
  next?.addEventListener("click", () => {
    index = (index + 1) % total;
    update();
    resetAuto();
  });

  // Swipe support
  let startX = 0,
    dx = 0,
    dragging = false;
  const onDown = (e) => {
    dragging = true;
    startX = e.touches?.[0]?.clientX ?? e.clientX;
    dx = 0;
  };
  const onMove = (e) => {
    if (!dragging) return;
    const x = e.touches?.[0]?.clientX ?? e.clientX;
    dx = x - startX;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dx) > 40) {
      if (dx < 0) index = (index + 1) % total;
      else index = (index - 1 + total) % total;
      update();
      resetAuto();
    }
    dx = 0;
  };
  root.addEventListener("pointerdown", onDown, { passive: true });
  root.addEventListener("pointermove", onMove, { passive: true });
  root.addEventListener("pointerup", onUp);
  root.addEventListener("pointercancel", onUp);
  root.addEventListener("touchstart", onDown, { passive: true });
  root.addEventListener("touchmove", onMove, { passive: true });
  root.addEventListener("touchend", onUp);

  // Auto-advance
  const interval = parseInt(root.getAttribute("data-autoplay") || "0", 10);
  let timer = null;
  const startAuto = () => {
    if (!interval || prefersReduced) return;
    stopAuto();
    timer = setInterval(() => {
      index = (index + 1) % total;
      update();
    }, interval);
  };
  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };
  const resetAuto = () => {
    stopAuto();
    startAuto();
  };

  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);

  // Keyboard
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next?.click();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev?.click();
    }
  });

  // Init
  update();
  startAuto();
}

function initRowCarousel(root) {
  const track = root.querySelector("[data-carousel-track]");
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  if (!track) return;

  const updateButtons = () => {
    // at start?
    prev.disabled = track.scrollLeft <= 4;
    // at end?
    const maxScroll = track.scrollWidth - track.clientWidth - 4;
    next.disabled = track.scrollLeft >= maxScroll;
  };

  const scrollByAmount = () =>
    Math.max(240, Math.floor(track.clientWidth * 0.9));

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  });
  next?.addEventListener("click", () => {
    track.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  });

  // On scroll, update button disabled state
  track.addEventListener("scroll", () => updateButtons(), { passive: true });

  // Keyboard accessibility on focus
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next?.click();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev?.click();
    }
  });

  // Resize observer to recalc states
  const ro = new ResizeObserver(() => updateButtons());
  ro.observe(track);

  // Init
  updateButtons();
}

// Init all carousels found
document.querySelectorAll('[data-carousel="hero"]').forEach(initHeroCarousel);
document.querySelectorAll('[data-carousel="row"]').forEach(initRowCarousel);

// Newsletter form (front-end only)
const form = document.querySelector("[data-newsletter]");
const statusEl = document.querySelector("[data-newsletter-status]");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const email = (data.get("email") || "").toString().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.textContent = "Please enter a valid email.";
    statusEl.style.color = "#b00020";
    return;
  }
  statusEl.textContent = "Thanks for subscribing! Check your inbox.";
  statusEl.style.color = "inherit";
  form.reset();
});

// Footer year
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
