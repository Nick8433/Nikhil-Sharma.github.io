(function () {
  var root = document.documentElement;
  var icon = document.getElementById("themeIcon");

  // Theme: dark by default, remember choice
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    icon.textContent = t === "dark" ? "☀" : "☾";
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  setTheme(saved === "light" ? "light" : "dark");
  document.getElementById("themeToggle").addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  // Mobile menu
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Nav border on scroll
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("show"); });
  }

  // Active nav link
  var links = document.querySelectorAll(".menu a");
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { so.observe(s); });
  }

  // Typing effect
  var roles = ["Full-Stack Web Developer", "WordPress & WooCommerce Developer", "E-commerce Developer", "AI Integration Developer"];
  var el = document.getElementById("typed");
  var r = 0, c = 0, del = false;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { el.textContent = roles[0]; }
  else {
    (function tick() {
      var word = roles[r];
      el.textContent = word.substring(0, c);
      if (!del && c < word.length) { c++; setTimeout(tick, 70); }
      else if (!del) { del = true; setTimeout(tick, 1500); }
      else if (c > 0) { c--; setTimeout(tick, 35); }
      else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
    })();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
