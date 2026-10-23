(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const storedTheme = (() => { try { return localStorage.getItem("vinay-theme"); } catch { return null; } })();
  if (storedTheme === "light") root.dataset.theme = "light";
  const updateThemeLabel = () => {
    const light = root.dataset.theme === "light";
    themeButton.textContent = light ? "☾" : "☼";
    themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  };
  updateThemeLabel();
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("vinay-theme", root.dataset.theme); } catch {}
    updateThemeLabel();
  });

  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
  });
  links.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
      const filter = button.dataset.filter;
      document.querySelectorAll(".project-card").forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  document.getElementById("copy-email").addEventListener("click", async event => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText("msaivinay306@gmail.com");
      button.textContent = "COPIED";
      setTimeout(() => button.textContent = "COPY", 1500);
    } catch {
      window.location.href = "mailto:msaivinay306@gmail.com";
    }
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();