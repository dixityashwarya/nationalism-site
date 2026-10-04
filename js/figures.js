// Small helper: makes an HTML element with an optional class and text.
function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// Photo frame: shows the photo if one is set, otherwise "Photo pending".
function makePhoto(figure) {
  const frame = makeEl("div", "photo-frame");
  if (figure.photo) {
    const img = document.createElement("img");
    img.src = figure.photo;
    img.alt = figure.name;
    frame.appendChild(img);
  } else {
    frame.appendChild(makeEl("span", "photo-pending", "Photo pending"));
  }
  return frame;
}

// ---------- FIGURES PAGE: one card per figure ----------
const grid = document.getElementById("figure-grid");
if (grid) {
  FIGURES.forEach((f) => {
    const card = makeEl("article", "figure-card reveal");
    card.appendChild(makePhoto(f));
    card.appendChild(makeEl("h3", null, f.name));
    card.appendChild(makeEl("p", "dates", f.dates || "Dates to be added"));
    card.appendChild(makeEl("p", "card-text", f.summary || "Description pending review."));
    const link = makeEl("a", "button button-small", "READ MORE");
    link.href = "figure.html?id=" + encodeURIComponent(f.id);
    card.appendChild(link);
    grid.appendChild(card);
  });
}

// ---------- PROFILE PAGE: one template for every figure ----------
const profile = document.getElementById("profile");
if (profile) {
  const id = new URLSearchParams(window.location.search).get("id");
  const index = FIGURES.findIndex((f) => f.id === id);

  if (index === -1) {
    const missing = makeEl("section", "profile-top");
    missing.appendChild(makeEl("p", "pending", "This figure could not be found."));
    const back = makeEl("a", "back-link", "← Back to Figures");
    back.href = "figures.html";
    missing.appendChild(back);
    profile.appendChild(missing);
  } else {
    const f = FIGURES[index];
    document.title = f.name + " | Nationalism";

    // Top of page: back link, name, dates, photo, short introduction
    const top = makeEl("section", "profile-top");
    const back = makeEl("a", "back-link", "← Back to Figures");
    back.href = "figures.html";
    top.appendChild(back);
    top.appendChild(makeEl("h1", null, f.name));
    top.appendChild(makeEl("p", "dates", f.dates || "Dates to be added"));
    if (!f.reviewed) {
      top.appendChild(makeEl("p", "review-flag", "Draft · not yet reviewed"));
    }
    const photoWrap = makeEl("div", "profile-photo");
    photoWrap.appendChild(makePhoto(f));
    top.appendChild(photoWrap);
    top.appendChild(makeEl("p", null, f.summary || "Short introduction pending."));
    profile.appendChild(top);

    // The remaining sections, in the same order for every figure
    const headings = [
      "Who was " + f.name + "?",
      "Historical Context",
      "Nationalism & " + f.name,
      "Key Ideas",
      "Important Works / Speeches",
      "Political Activity",
      "Legacy",
      "Sources & Further Reading"
    ];
    headings.forEach((title) => {
      const section = makeEl("section", "profile-section reveal");
      section.appendChild(makeEl("h2", null, title));
      section.appendChild(makeEl("p", "pending", "Content pending research and review."));
      profile.appendChild(section);
    });

    // Previous / All figures / Next
    const pager = makeEl("nav", "figure-pager");
    if (index > 0) {
      const prev = makeEl("a", null, "← " + FIGURES[index - 1].name);
      prev.href = "figure.html?id=" + encodeURIComponent(FIGURES[index - 1].id);
      pager.appendChild(prev);
    } else {
      pager.appendChild(makeEl("span"));
    }
    const all = makeEl("a", null, "All figures");
    all.href = "figures.html";
    pager.appendChild(all);
    if (index < FIGURES.length - 1) {
      const next = makeEl("a", null, FIGURES[index + 1].name + " →");
      next.href = "figure.html?id=" + encodeURIComponent(FIGURES[index + 1].id);
      pager.appendChild(next);
    } else {
      pager.appendChild(makeEl("span"));
    }
    profile.appendChild(pager);
  }
}

// ---------- Gentle fade-in for the elements created above ----------
const newItems = document.querySelectorAll(".reveal");
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
newItems.forEach((item) => fadeObserver.observe(item));