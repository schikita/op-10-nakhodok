// =======================================================================
// ===================== HEADER & NAVIGATION ==============================
// =======================================================================

function supportsIO() {
  return 'IntersectionObserver' in window;
}

gsap.registerPlugin(
  window.ScrollTrigger || undefined,
  window.TextPlugin || undefined,
  window.ScrollToPlugin || undefined
);

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollProgressBar = document.querySelector(".scroll-progress-bar");
  const backToTop = document.getElementById("backToTop");

  // ===== Scroll effects (header + нижний progress-bar) =====
  window.addEventListener("scroll", () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop || 0;

    // Сжатие/заливка хедера
    if (currentScroll > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // Полоска прогресса по низу хедера
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = height > 0 ? currentScroll / height : 0;

    if (scrollProgressBar) {
      gsap.to(scrollProgressBar, {
        scaleX: scrolled,
        duration: 0.15,
        ease: "none",
      });
    }

    // Показ / скрытие кнопки "Наверх"
    if (backToTop) {
      if (currentScroll > 600) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }
  });

  // ===== Hamburger =====
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.style.overflow = nav.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Закрытие меню по клику на пункт
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!hamburger || !nav) return;
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ===== Entrance animations (логотип, меню, соцсети) =====
  const logoEl = document.querySelector(".logo");
  if (logoEl) {
    gsap.from(logoEl, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }

  const navItems = document.querySelectorAll(".nav-item");
  if (navItems.length) {
    gsap.from(navItems, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5,
    });
  }

  const socialLinks = document.querySelectorAll(".social-link");
  if (socialLinks.length) {
    gsap.from(socialLinks, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 1,
    });
  }

  // ===== Magnetic nav links =====
  navLinks.forEach((link) => {
    link.addEventListener("mousemove", (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(link, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  // ===== Back to top button (Только НАТИВНЫЙ скролл) =====
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    const txt = backToTop.querySelector(".back-to-top-text");
    if (txt) {
      txt.textContent = "";
    }
  }
});

// =======================================================================
// ==================== PARTICLES — FIXED ================================
// =======================================================================

window.addEventListener("load", () => {
  gsap.set("body", { opacity: 1 });

  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#c084fc" },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#c084fc",
          opacity: 0.2,
          width: 1,
        },
        move: { enable: true, speed: 2 },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  if (document.getElementById("particles-js-2")) {
    particlesJS("particles-js-2", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 900 } },
        color: { value: "#c084fc" },
        opacity: { value: 0.3, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, color: "#7c3aed", distance: 120 },
        move: { enable: true, speed: 1 },
      },
      retina_detect: true,
    });
  }

  if (document.getElementById("particles-js-3")) {
    particlesJS("particles-js-3", {
      particles: {
        number: { value: 120 },
        color: { value: "#c084fc" },
        size: { value: 3, random: true },
        opacity: { value: 0.5, random: true },
        line_linked: { enable: true, distance: 180, opacity: 0.3 },
        move: { enable: true, speed: 2.5 },
      },
      retina_detect: true,
    });
  }

  // После загрузки частиц запускаем анимации GSAP
  initGsapAnimations();
});

// =======================================================================
// ========================== GSAP CORE ==================================
// =======================================================================

function initGsapAnimations() {
  // ===== HERO entrance (однократная, без ScrollTrigger) =====
  const heroBadge = document.querySelector(".hero-badge");
  const titleLines = document.querySelectorAll(".title-line");
  const heroDescription = document.querySelector(".hero-description");
  const heroStatsEl = document.querySelector(".hero-stats");
  const heroCta = document.querySelector(".hero-cta");

  const hasHero =
    heroBadge || titleLines.length || heroDescription || heroStatsEl || heroCta;

  if (hasHero) {
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroBadge) {
      heroTl.from(heroBadge, { y: -50, opacity: 0, duration: 1, delay: 0.3 });
    }

    if (titleLines.length) {
      heroTl.from(
        titleLines,
        { y: 100, opacity: 0, duration: 1, stagger: 0.2 },
        "-=0.6"
      );
    }

    if (heroDescription) {
      heroTl.from(
        heroDescription,
        { y: 50, opacity: 0, duration: 1 },
        "-=0.5"
      );
    }

    if (heroStatsEl) {
      heroTl.from(
        heroStatsEl,
        { y: 50, opacity: 0, scale: 0.9, duration: 1 },
        "-=0.5"
      );
    }

    if (heroCta) {
      heroTl.from(
        heroCta,
        { y: 30, opacity: 0, duration: 0.8 },
        "-=0.3"
      );
    }
  }

  // ===== Animated counters (hero + финал) =====
  document
    .querySelectorAll(
      ".stat-number[data-count], .summary-value[data-count], .counter-number[data-count]"
    )
    .forEach((el) => {
      gsap.to(el, {
        innerText: el.dataset.count,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power2.out",
        delay: 1.2,
        onUpdate: function () {
          el.innerText = Math.ceil(+el.innerText || 0);
        },
      });
    });

  // ===================================================================
  // ========== SCROLL REVEAL ДЛЯ СЕКЦИЙ (кроме HERO) ==================
  // ===================================================================

  gsap.utils.toArray(".section").forEach((section) => {
    const isHero = section.classList.contains("hero-section");

    const content = section.querySelector(".content");
    if (content && !isHero) {
      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    const bg = section.querySelector(".bg");
    if (bg) {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 30,
        ease: "none",
      });
    }

    const parallax = section.querySelector(".parallax-element");
    if (parallax) {
      gsap.to(parallax, {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        opacity: 0.3,
        yPercent: -20,
      });
    }
  });

  // ===================================================================
  // ===================== HERO SCROLL-ИНДИКАТОР =======================
  // ===================================================================

  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      y: 12,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }

  // ===================================================================
  // ===================== HERO MOUSE PARALLAX =========================
  // ===================================================================

  const heroSection = document.querySelector(".hero-section");
  const heroTitle = document.querySelector(".hero-title");
  const heroStats = document.querySelector(".hero-stats");

  if (heroSection && (heroTitle || heroStats)) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (heroTitle) {
        gsap.to(heroTitle, {
          x: relX * 30,
          y: relY * 20,
          duration: 0.4,
          ease: "power2.out",
          overwrite: false,
        });
      }

      if (heroStats) {
        gsap.to(heroStats, {
          x: relX * -20,
          y: relY * -15,
          duration: 0.4,
          ease: "power2.out",
          overwrite: false,
        });
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      const targets = [];
      if (heroTitle) targets.push(heroTitle);
      if (heroStats) targets.push(heroStats);

      if (targets.length) {
        gsap.to(targets, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
  }

  // ===================================================================
  // ========================= BUTTON EFFECTS ==========================
  // ===================================================================

  document.querySelectorAll(".btn, .hero-cta").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        background:rgba(255,255,255,0.6);border-radius:50%;
        left:${x}px;top:${y}px;transform:scale(0);pointer-events:none;
      `;

      if (getComputedStyle(btn).position === "static") {
        btn.style.position = "relative";
      }
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);

      gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    });
  });

  // ===================================================================
  // ===================== CAROUSEL (INTRO SECTION) ====================
  // ===================================================================

  let progress = 50;
  let startX = 0;
  let active = 0;
  let isDown = false;

  const speedWheel = 0.02;
  const speedDrag = -0.1;

  const getZindex = (array, index) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  const $items = document.querySelectorAll(".carousel-item");
  const $cursors = document.querySelectorAll(".cursor");

  const displayItems = (item, index, activeIndex) => {
    const zIndex = getZindex([...$items], activeIndex)[index];
    item.style.setProperty("--zIndex", zIndex);
    item.style.setProperty("--active", (index - activeIndex) / $items.length);
  };

  const animate = () => {
    if (!$items.length) return;

    progress = Math.max(0, Math.min(progress, 100));
    active = Math.floor((progress / 100) * ($items.length - 1));

    $items.forEach((item, index) => displayItems(item, index, active));
  };
  animate();

  $items.forEach((item, i) => {
    item.addEventListener("click", () => {
      progress = (i / $items.length) * 100 + 10;
      animate();
    });
  });

  const handleWheel = (e) => {
    const wheelProgress = e.deltaY * speedWheel;
    progress += wheelProgress;
    animate();
  };

  const handleMouseMove = (e) => {
    if (e.type === "mousemove") {
      $cursors.forEach(($cursor) => {
        $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress += mouseProgress;
    startX = x;
    animate();
  };

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  if ($items.length) {
    document.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
  }

  // ===================================================================
  // =============== CARS VERTICAL SLIDER (sec-3) ======================
  // ===================================================================

  const carsMenu = document.querySelector("#carsVertical");
  if (carsMenu) {
    const carsItems = Array.from(
      carsMenu.querySelectorAll(".cars-vertical__item")
    );

    if (carsItems.length) {
      let carMenuHeight = carsMenu.clientHeight;
      let carItemHeight = carsItems[0].clientHeight;
      let carWrapHeight = carsItems.length * carItemHeight;

      let carScrollY = 0;
      let carY = 0;
      let carOldScrollY = 0;
      let carScrollSpeed = 0;

      let carIsDragging = false;
      let carTouchStartY = 0;

      const carLerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

      const carDispose = (scroll) => {
        gsap.set(carsItems, {
          y: (i) => i * carItemHeight + scroll,
          modifiers: {
            y: (y) => {
              const wrapped = gsap.utils.wrap(
                -carItemHeight,
                carWrapHeight - carItemHeight,
                parseFloat(y)
              );
              return `${wrapped}px`;
            },
          },
        });
      };

      carDispose(0);

      const carHandleWheel = (e) => {
        e.preventDefault();
        carScrollY -= e.deltaY;
      };

      const carHandleDown = (e) => {
        carIsDragging = true;
        carsMenu.classList.add("cars-vertical--dragging");
        carTouchStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      };

      const carHandleMove = (e) => {
        if (!carIsDragging) return;
        const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        carScrollY += (currentY - carTouchStartY) * 2.5;
        carTouchStartY = currentY;
      };

      const carHandleUp = () => {
        carIsDragging = false;
        carsMenu.classList.remove("cars-vertical--dragging");
      };

      carsMenu.addEventListener("wheel", carHandleWheel, { passive: false });
      carsMenu.addEventListener("mousedown", carHandleDown);
      carsMenu.addEventListener("mousemove", carHandleMove);
      carsMenu.addEventListener("mouseleave", carHandleUp);
      carsMenu.addEventListener("mouseup", carHandleUp);

      carsMenu.addEventListener("touchstart", carHandleDown, { passive: true });
      carsMenu.addEventListener("touchmove", carHandleMove, { passive: true });
      carsMenu.addEventListener("touchend", carHandleUp);

      window.addEventListener("resize", () => {
        carMenuHeight = carsMenu.clientHeight;
        carItemHeight = carsItems[0].clientHeight;
        carWrapHeight = carsItems.length * carItemHeight;
        carDispose(carY);
      });

      const renderCars = () => {
        requestAnimationFrame(renderCars);
        carY = carLerp(carY, carScrollY, 0.1);
        carDispose(carY);

        carScrollSpeed = carY - carOldScrollY;
        carOldScrollY = carY;

        gsap.to(carsItems, {
          scale: 1 - Math.min(60, Math.abs(carScrollSpeed)) * 0.008,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      renderCars();
    }
  }

  // ===================================================================
  // ===================== JEWELS SLIDERS (SEC-4) ======================
  // ===================================================================

  initJewelSliders();

  // ===================================================================
  // ✅ МОДАЛЬНОЕ ОКНО ДРАГОЦЕННОСТЕЙ (SEC-4) ===========================
  // ===================================================================

  const jewelModal = document.getElementById("jewelModal");

  if (jewelModal) {
    const jewelImage = jewelModal.querySelector(".jewel-modal__image");
    const jewelCaption = jewelModal.querySelector(".jewel-modal__caption");
    const prevBtn = jewelModal.querySelector("[data-jewel-modal-prev]");
    const nextBtn = jewelModal.querySelector("[data-jewel-modal-next]");
    const closeBtn = jewelModal.querySelector("[data-jewel-modal-close]");
    const backdrop = jewelModal.querySelector(".jewel-modal__backdrop");

    let currentModalIndex = 0;
    let currentModalSlides = [];

    const showModalSlide = (index) => {
      if (!currentModalSlides.length || !jewelImage) return;
      const slide = currentModalSlides[index];
      jewelImage.src = slide.full;
      if (jewelCaption) {
        jewelCaption.textContent = slide.caption || "";
      }
    };

    const openJewelModal = (slides, startIndex = 0) => {
      currentModalSlides = slides;
      currentModalIndex = startIndex;
      showModalSlide(currentModalIndex);
      jewelModal.classList.add("is-open");
      jewelModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeJewelModal = () => {
      jewelModal.classList.remove("is-open");
      jewelModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    // Привязываем клики на карточки драгоценностей
    document.querySelectorAll(".jewel-slide").forEach((slide) => {
      slide.addEventListener("click", (e) => {
        e.stopPropagation();
        const slider = slide.closest(".jewel-slider");
        if (!slider) return;

        const allSlides = Array.from(slider.querySelectorAll(".jewel-slide"));
        const slideIndex = allSlides.indexOf(slide);

        const slidesData = allSlides.map((s) => ({
          full: s.dataset.jewelFull || s.querySelector("img")?.src || "",
          caption: s.dataset.jewelCaption || "",
        }));

        openJewelModal(slidesData, slideIndex);
      });
    });

    // Закрытие модального окна
    closeBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      closeJewelModal();
    });

    backdrop?.addEventListener("click", closeJewelModal);

    // Навигация в модальном окне (prev/next)
    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      currentModalIndex =
        (currentModalIndex - 1 + currentModalSlides.length) %
        currentModalSlides.length;
      showModalSlide(currentModalIndex);
    });

    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      currentModalIndex =
        (currentModalIndex + 1) % currentModalSlides.length;
      showModalSlide(currentModalIndex);
    });

    // Закрытие по Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && jewelModal.classList.contains("is-open")) {
        closeJewelModal();
      }
    });

    console.log("✅ Jewel modal initialized correctly");
  }

  console.log("✨ Panoramic Reportage — loaded successfully");
}

// =======================================================================
// ===================== JEWEL SLIDERS (CARDS) ==========================
// =======================================================================

function initJewelSliders() {
  const sliders = document.querySelectorAll("[data-jewel-slider]");
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const wrapper = slider.closest(".jewel-media--slider");
    if (!wrapper) return;

    const slides = Array.from(slider.querySelectorAll(".jewel-slide"));
    if (!slides.length) return;

    const prevBtn = wrapper.querySelector("[data-jewel-prev]");
    const nextBtn = wrapper.querySelector("[data-jewel-next]");
    const dotsContainer = wrapper.querySelector("[data-jewel-dots]");

    let current = slides.findIndex((s) => s.classList.contains("is-active"));
    if (current === -1) current = 0;

    // Создаём точки пагинации
    const dots = [];
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className =
          "jewel-slider-dot" + (index === current ? " is-active" : "");
        dot.setAttribute("aria-label", `Показать фото ${index + 1}`);
        dot.addEventListener("click", (evt) => {
          evt.stopPropagation();
          goTo(index);
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    function goTo(newIndex) {
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");

      const total = slides.length;
      current = (newIndex + total) % total;

      slides[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
    }

    // Обработчики стрелок
    if (prevBtn) {
      prevBtn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        goTo(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        goTo(current + 1);
      });
    }
  });
}

// =======================================================================
// ===================== RARITY BG SLIDER ================================
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-rarity-bg-slider]");

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".rarity-bg-slide"));
    if (!slides.length) return;

    const prevBtn = slider.querySelector(".rarity-bg-control--prev");
    const nextBtn = slider.querySelector(".rarity-bg-control--next");
    const dotsContainer = slider.querySelector("[data-rarity-bg-dots]");
    if (!dotsContainer) return;

    let current = 0;

    // Создаём точки
    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "rarity-bg-dot" + (index === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Показать фото ${index + 1}`);
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    function goToSlide(targetIndex) {
      if (targetIndex === current) return;

      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");

      current = (targetIndex + slides.length) % slides.length;

      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }

    function goNext() {
      goToSlide(current + 1);
    }

    function goPrev() {
      goToSlide(current - 1);
    }

    // Стрелки (не открывают модальных окон, только переключают)
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goNext();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goPrev();
      });
    }
  });
});

// =======================================================================
// ===================== RARITY SLIDER (CARDS) ==========================
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-rarity-slider]");

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".rarity-slider__slide"));
    const dots = Array.from(slider.querySelectorAll(".rarity-slider__dot"));
    const prevBtn = slider.querySelector(".rarity-slider__control--prev");
    const nextBtn = slider.querySelector(".rarity-slider__control--next");

    if (!slides.length) return;

    let current = 0;

    const goTo = (index) => {
      const total = slides.length;
      const newIndex = (index + total) % total;

      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === newIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === newIndex);
      });

      current = newIndex;
    };

    prevBtn?.addEventListener("click", () => goTo(current - 1));
    nextBtn?.addEventListener("click", () => goTo(current + 1));

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.slide || 0);
        goTo(idx);
      });
    });

    // стартовое состояние
    goTo(0);
  });
});

// =======================================================================
// ===================== RARITY NAV (SLIDER NAVIGATION) =================
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Находим все кнопки навигации раритетов
  const navItems = document.querySelectorAll(".rarity-nav-item");
  const slides = document.querySelectorAll(".rarity-slide");

  if (!navItems.length || !slides.length) return;

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);

      // Обновляем активный класс на кнопке навигации
      navItems.forEach((item) => item.classList.remove("is-active"));
      btn.classList.add("is-active");

      // Обновляем активный слайд
      slides.forEach((slide) => slide.classList.remove("rarity-slide--active"));
      const activeSlide = document.querySelector(
        `.rarity-slide[data-index="${index}"]`
      );
      if (activeSlide) {
        activeSlide.classList.add("rarity-slide--active");
      }
    });
  });

  // Установить начальное состояние
  if (navItems[0]) navItems[0].classList.add("is-active");
  if (slides[0]) slides[0].classList.add("rarity-slide--active");
});

// =======================================================================
// ====================== PAINTINGS SLIDER (ПРОСТОЙ) ====================
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-paintings-slider]");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".paintings-slider-slide"));
  const dots = Array.from(slider.querySelectorAll(".paintings-dot"));
  const prevBtn = slider.querySelector("[data-paintings-prev]");
  const nextBtn = slider.querySelector("[data-paintings-next]");

  if (!slides.length) return;

  let current = 0;

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  };

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  // Стрелки клавиатуры
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  // Свайп на мобильных
  let touchStart = 0;
  slider.addEventListener("touchstart", (e) => {
    touchStart = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) goTo(current + 1);
    if (touchEnd - touchStart > 50) goTo(current - 1);
  });

  console.log("✅ Paintings slider initialized");
});

// ============================
// КАРУСЕЛЬ ПРОЕКТОВ
// ============================

(function setupProjectsCarousel() {
  const viewport = document.querySelector("#projects .projects-viewport");
  if (!viewport) return;

  const stage = viewport.querySelector(".projects-stage");
  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll(".project-card"));
  if (!cards.length) return;

  const dotsWrap = viewport.querySelector(".pr-dots");
  const prevBtn = viewport.querySelector(".prev");
  const nextBtn = viewport.querySelector(".next");

  if (!dotsWrap) return;

  let i = 0;
  let timer = null;
  const interval = +(viewport.dataset.interval || 5000);
  const autoplay = viewport.dataset.autoplay !== "false";
  const reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  dotsWrap.innerHTML = cards.map(() => "<i></i>").join("");
  const dots = Array.from(dotsWrap.children);

  const show = (idx) => {
    i = (idx + cards.length) % cards.length;
    cards.forEach((c, k) => c.classList.toggle("is-active", k === i));
    dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
  };

  const next = () => show(i + 1);
  const prev = () => show(i - 1);

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const play = () => {
    if (reduce || !autoplay) return;
    stop();
    timer = setInterval(next, interval);
  };

  show(0);
  play();

  nextBtn &&
    nextBtn.addEventListener("click", () => {
      next();
      play();
    });
  prevBtn &&
    prevBtn.addEventListener("click", () => {
      prev();
      play();
    });

  dotsWrap.addEventListener("click", (e) => {
    const idx = dots.indexOf(e.target);
    if (idx > -1) {
      show(idx);
      play();
    }
  });

  viewport.addEventListener("mouseenter", stop);
  viewport.addEventListener("mouseleave", play);
  viewport.addEventListener("focusin", stop);
  viewport.addEventListener("focusout", play);

  if (supportsIO()) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== viewport) return;
          if (entry.isIntersecting) {
            play();
          } else {
            stop();
          }
        });
      },
      { threshold: 0.2 }
    );
    sectionObserver.observe(viewport);
  }
})();

// =======================================================================
// ====================== LAZY MEDIA LOADER ==============================
// =======================================================================

// Загружает изображения / видео / iframe, только когда они попадают в фокус экрана
// Используются атрибуты:
//   data-lazy-src     — основной src
//   data-lazy-srcset  — srcset для <img>
//   data-lazy-bg      — background-image для блоков

function initLazyMedia() {
  const lazyNodes = document.querySelectorAll(
    "[data-lazy-src], [data-lazy-bg], [data-lazy-srcset]"
  );
  if (!lazyNodes.length) return;

  if (!supportsIO()) {
    // Фолбэк: без IO сразу расставим src
    lazyNodes.forEach(loadLazyNode);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        loadLazyNode(el);
        obs.unobserve(el);
      });
    },
    {
      root: null,
      // немного заранее, чтобы не было моргания при прокрутке
      rootMargin: "0px 0px 200px 0px",
      threshold: 0.2,
    }
  );

  lazyNodes.forEach((el) => observer.observe(el));
}

// =======================================================================
// ==================== NEGOTIATIONS VIDEO PLAYER ========================
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Список всех секций, которые нужно обслуживать
  const sections = document.querySelectorAll(".negotiations-section, .negotiations-section-1");
  if (!sections.length) return;

  sections.forEach(initVideoSection);

  // -----------------------------
  // Инициализация одной секции
  // -----------------------------
  function initVideoSection(section) {
    const videoWrapper = section.querySelector(".negotiations-video");
    const video = videoWrapper?.querySelector("video");

    if (!video) return;

    const source = video.querySelector("source[data-lazy-src]");
    let srcLoaded = !source || Boolean(source.getAttribute("src"));

    // Анимация появления блока
    if (typeof gsap !== "undefined" && videoWrapper) {
      gsap.from(videoWrapper, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Если IntersectionObserver недоступен
    if (!supportsIO()) {
      if (source && !srcLoaded) {
        source.src = source.dataset.lazySrc || "";
        source.removeAttribute("data-lazy-src");
        video.load();
      }
      return;
    }

    // Обсервер для секции
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== section) return;

          if (entry.isIntersecting) {
            // В фокусе
            if (source && !srcLoaded) {
              const realSrc = source.dataset.lazySrc;
              if (realSrc) {
                source.src = realSrc;
                source.removeAttribute("data-lazy-src");
                video.load();
                srcLoaded = true;
              }
            }

            video.muted = true;
            video.play().catch(() => {});
          } else {
            // Вне экрана
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(section);
  }
});


function loadLazyNode(el) {
  const dataSrc = el.getAttribute("data-lazy-src");
  const dataSrcset = el.getAttribute("data-lazy-srcset");
  const dataBg = el.getAttribute("data-lazy-bg");

  if (dataSrc) {
    if (
      el.tagName === "IMG" ||
      el.tagName === "IFRAME" ||
      el.tagName === "VIDEO"
    ) {
      el.src = dataSrc;
    } else {
      el.style.backgroundImage = `url("${dataSrc}")`;
    }
    el.removeAttribute("data-lazy-src");
  }

  if (dataSrcset && "srcset" in el) {
    el.srcset = dataSrcset;
    el.removeAttribute("data-lazy-srcset");
  }

  if (dataBg) {
    el.style.backgroundImage = `url("${dataBg}")`;
    el.removeAttribute("data-lazy-bg");
  }

  el.classList.add("is-lazy-loaded");
}

document.addEventListener("DOMContentLoaded", initLazyMedia);
