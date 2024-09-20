document.addEventListener("DOMContentLoaded", function () {
  const sectionsWrapper = document.getElementById("sectionsWrapper");
  const sections = document.querySelectorAll("section");
  let currentSection = 0;
  let isScrolling = false;
  let lastScrollTime = 0;
  const scrollCooldown = 1000; // ms

  function scrollToSection(index) {
    if (isScrolling) return;
    isScrolling = true;
    const targetPosition = index * window.innerHeight;

    const startPosition = sectionsWrapper.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 1000; // ms
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      sectionsWrapper.scrollTop = run;
      if (timeElapsed < duration) requestAnimationFrame(animation);
      else isScrolling = false;
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedScroll = debounce((direction) => {
    currentSection = Math.min(
      Math.max(currentSection + direction, 0),
      sections.length - 1
    );
    scrollToSection(currentSection);
  }, 50); // 50ms debounce time

  function wheelHandler(e) {
    e.preventDefault();
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) return;
    lastScrollTime = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    debouncedScroll(direction);
  }

  sectionsWrapper.addEventListener("wheel", wheelHandler, { passive: false });

  // Optional: Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;
      lastScrollTime = now;

      const direction = e.key === "ArrowDown" ? 1 : -1;
      debouncedScroll(direction);
    }
  });
});
