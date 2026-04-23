const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-navigation");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

(() => {
  const normalizePath = (value) => {
    const url = new URL(value, window.location.href);
    let path = decodeURIComponent(url.pathname);
    if (!path.endsWith("/")) path += "/";
    return path;
  };
  const currentPath = normalizePath(window.location.href);
  const links = Array.from(document.querySelectorAll(".onepress-menu a, .footer-menu a"));

  links.forEach((link) => {
    const linkPath = normalizePath(link.href);
    if (linkPath === currentPath) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
      link.closest("li")?.classList.add("current-menu-item");
    }
  });

  let bestTopItem = null;
  let bestLength = -1;
  document.querySelectorAll(".onepress-menu > li > a").forEach((link) => {
    const linkPath = normalizePath(link.href);
    const isHome = linkPath === "/";
    const matches = isHome ? currentPath === "/" : currentPath.startsWith(linkPath);
    if (matches && linkPath.length > bestLength) {
      bestTopItem = link.closest("li");
      bestLength = linkPath.length;
    }
  });

  if (bestTopItem) {
    bestTopItem.classList.add("current-menu-ancestor");
    bestTopItem.querySelector(":scope > a")?.classList.add("is-active");
  }
})();
