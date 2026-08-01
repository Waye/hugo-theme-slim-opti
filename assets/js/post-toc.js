(function () {
  var bar = document.createElement("div");
  bar.className = "reading-progress";

  var fill = document.createElement("div");
  fill.className = "reading-progress-bar";

  bar.appendChild(fill);
  document.body.appendChild(bar);

  var article =
    document.querySelector(".post article") ||
    document.querySelector("article");

  function progress() {
    if (!article) return;

    var top =
      article.getBoundingClientRect().top +
      window.scrollY;

    var total =
      article.offsetHeight -
      window.innerHeight;

    var scrolled =
      window.scrollY -
      top;

    var value =
      total > 0
        ? scrolled / total
        : (scrolled >= 0 ? 1 : 0);

    value = Math.min(Math.max(value, 0), 1);
    fill.style.width = (value * 100) + "%";
  }

  var tocRoots = Array.prototype.slice.call(
    document.querySelectorAll(
      "#TableOfContents, #TableOfContentsSidebar"
    )
  );

  var links = [];

  tocRoots.forEach(function (toc) {
    links = links.concat(
      Array.prototype.slice.call(
        toc.querySelectorAll("a")
      )
    );
  });

  function targetId(link) {
    var value =
      (link.getAttribute("href") || "")
        .replace(/^#/, "");

    if (!value) return "";

    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  }

  var seen = {};
  var targets = [];

  links.forEach(function (link) {
    var id = targetId(link);
    var target =
      id
        ? document.getElementById(id)
        : null;

    if (target && !seen[id]) {
      seen[id] = true;

      targets.push({
        id: id,
        element: target
      });
    }
  });

  var activeId = "";

  function updateCurrentLabel() {
    var title = "";

    for (var i = 0; i < links.length; i++) {
      if (targetId(links[i]) === activeId) {
        title =
          (links[i].textContent || "")
            .replace(/\s+/g, " ")
            .trim();

        break;
      }
    }

    var labels =
      Array.prototype.slice.call(
        document.querySelectorAll(".toc-current")
      );

    labels.forEach(function (label) {
      label.textContent = title;

      if (title) {
        label.setAttribute("title", title);
      } else {
        label.removeAttribute("title");
      }
    });
  }

  function keepSidebarLinkVisible() {
    var sidebar =
      document.querySelector(
        ".post-toc-sidebar-inner"
      );

    var active =
      sidebar
        ? sidebar.querySelector("a.active")
        : null;

    if (!sidebar || !active) return;

    var sidebarRect =
      sidebar.getBoundingClientRect();

    var activeRect =
      active.getBoundingClientRect();

    if (activeRect.top < sidebarRect.top) {
      sidebar.scrollTop -=
        sidebarRect.top -
        activeRect.top;
    } else if (
      activeRect.bottom >
      sidebarRect.bottom
    ) {
      sidebar.scrollTop +=
        activeRect.bottom -
        sidebarRect.bottom;
    }
  }

  function setActive(nextId) {
    if (nextId === activeId) return;

    activeId = nextId;

    links.forEach(function (link) {
      var isActive =
        targetId(link) === activeId;

      link.classList.toggle(
        "active",
        isActive
      );

      if (isActive) {
        link.setAttribute(
          "aria-current",
          "location"
        );
      } else {
        link.removeAttribute(
          "aria-current"
        );
      }
    });

    updateCurrentLabel();
    keepSidebarLinkVisible();
  }

  function spy() {
    if (!targets.length) return;

    var offset = 90;
    var nextId = "";

    for (
      var i = 0;
      i < targets.length;
      i++
    ) {
      if (
        targets[i]
          .element
          .getBoundingClientRect()
          .top -
          offset <=
        0
      ) {
        nextId = targets[i].id;
      }
    }

    setActive(nextId);
  }

  links.forEach(function (link) {
    link.addEventListener(
      "click",
      function (event) {
        var id = targetId(link);

        var target =
          id
            ? document.getElementById(id)
            : null;

        if (!target) return;

        event.preventDefault();

        var reducedMotion =
          window.matchMedia &&
          window
            .matchMedia(
              "(prefers-reduced-motion: reduce)"
            )
            .matches;

        target.scrollIntoView({
          behavior:
            reducedMotion
              ? "auto"
              : "smooth",
          block: "start"
        });

        if (history.replaceState) {
          history.replaceState(
            null,
            "",
            "#" + id
          );
        }
      }
    );
  });

  var ticking = false;

  function onScroll() {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(
      function () {
        progress();
        spy();
        ticking = false;
      }
    );
  }

  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    onScroll
  );

  window.addEventListener(
    "load",
    onScroll
  );

  progress();
  spy();
})();
