(function () {
  const site = window.SITE || {};
  const name = site.name || site.nameEn || "紙戲";
  const tag = site.taglineZh || "插画与立体书";

  document.querySelectorAll("[data-brand-name]").forEach(function (el) {
    el.textContent = name;
  });
  document.querySelectorAll("[data-brand-tag]").forEach(function (el) {
    el.textContent = tag;
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    const email = site.email || "hello@example.com";
    if (el.tagName === "A") {
      el.href = "mailto:" + email;
      if (!el.textContent.trim()) el.textContent = email;
    } else {
      el.textContent = email;
    }
  });

  const page = document.body.dataset.page;
  document.querySelectorAll(".nav a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (
      (page === "home" && href === "index.html") ||
      href === page + ".html"
    ) {
      link.setAttribute("aria-current", "page");
    }
  });

  const stage = document.querySelector("[data-stage]");
  if (stage) {
    const toggle = function () {
      const open = stage.classList.toggle("is-open");
      stage.innerHTML = open
        ? '<div class="peek-plane"></div><div class="peek-plane"></div><div class="peek-plane"></div>'
        : '<div class="peek-plane tone-cinnabar" style="min-height:min(72vh,680px)"></div>';
    };
    stage.addEventListener("click", toggle);
    stage.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  }

  const workMount = document.querySelector("[data-works]");
  if (workMount) {
    const items = site.works || [];
    workMount.innerHTML = items
      .map(function (work) {
        const media = work.src
          ? '<img src="' + escapeAttr(work.src) + '" alt="' + escapeAttr(work.title) + '">'
          : '<div class="swatch tone-' + escapeAttr(work.tone || "paper") + '"></div>';
        return (
          '<article class="card' +
          (work.src ? " has-image" : "") +
          '">' +
          media +
          '<div class="card-meta"><span>' +
          escapeHtml(work.title) +
          "</span><small>" +
          escapeHtml(work.type + " · " + work.year) +
          "</small></div></article>"
        );
      })
      .join("");
  }

  const bookMount = document.querySelector("[data-books]");
  if (bookMount) {
    const books = site.books || [];
    bookMount.innerHTML = books
      .map(function (book, index) {
        const cover = book.cover
          ? '<img src="' + escapeAttr(book.cover) + '" alt="' + escapeAttr(book.title) + '">'
          : "";
        return (
          '<article class="book"><div class="book-cover tone-' +
          ["mat", "cinnabar", "wash"][index % 3] +
          '">' +
          cover +
          '</div><div><p class="meta">' +
          escapeHtml(book.status + " · " + book.year) +
          "</p><h3>" +
          escapeHtml(book.title) +
          "</h3><p>" +
          escapeHtml(book.blurb) +
          '</p><div class="peek" data-peek tabindex="0" role="button" aria-label="Take a peek inside">' +
          '<div class="peek-plane"></div><div class="peek-plane"></div><div class="peek-plane"></div>' +
          '</div><p class="meta">Take a peek inside...</p></div></article>'
        );
      })
      .join("");

    bookMount.querySelectorAll("[data-peek]").forEach(function (peek) {
      const toggle = function () {
        peek.classList.toggle("is-open");
      };
      peek.addEventListener("click", toggle);
      peek.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const from = form.querySelector("[name=name]").value.trim();
      const address = form.querySelector("[name=reply]").value.trim();
      const message = form.querySelector("[name=message]").value.trim();
      const email = site.email || "hello@example.com";
      const subject = encodeURIComponent("站点来信 · " + from);
      const body = encodeURIComponent(message + "\n\n—— " + from + " / " + address);
      window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
  }
})();
