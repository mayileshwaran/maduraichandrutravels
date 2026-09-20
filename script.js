
/* ==========================================================================
   madurai chandru travels — SITE SCRIPT
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) WHATSAPP CONFIG
   Change ONLY this number to update every "Book Now" / WhatsApp button
   on the entire site. Use the country code with no "+", spaces or dashes.
   Example: India number +91 90871 37006  ->  "919087137006"
   -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = "919087137006"; // TODO: replace with the real business number

const DEFAULT_WHATSAPP_MESSAGE =
  "Hello madurai chandru travels, I would like to book a travel service.";

function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/* Wire up every element flagged as a WhatsApp trigger (buttons, links, the
   floating button, etc). Each element can carry its own data-msg. */
function initWhatsAppButtons() {
  document.querySelectorAll(".js-wa").forEach((el) => {
    const message = el.getAttribute("data-msg") || DEFAULT_WHATSAPP_MESSAGE;
    el.setAttribute("href", buildWhatsAppLink(message));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}


/* --------------------------------------------------------------------------
   1a) TOUR & DESTINATION SUB-PLACE POPUP
   Each destination can contain multiple attractions. Images are loaded from
   LoremFlickr so the static site does not need a separate image server.
   -------------------------------------------------------------------------- */
const DESTINATIONS = {
  ooty: {
    name: "Ooty",
    image: "./img/ooty.jpg",
    description: "A refreshing Nilgiri escape with tea gardens, viewpoints, lakes and cool mountain air.",
    booking: "Hello madurai chandru travels, I'd like to book the Ooty tour.",
    places: [
      ["Ooty Botanical Garden", "A beautiful garden filled with colourful flowers, ancient trees and peaceful walking paths.", "https://loremflickr.com/800/520/ooty,botanical,garden,india"],
      ["Ooty Lake", "Enjoy the scenic lake, boating and relaxed views surrounded by the Nilgiri hills.", "https://loremflickr.com/800/520/ooty,lake,india"],
      ["Doddabetta Peak", "The highest peak in the Nilgiris, offering panoramic mountain views.", "https://loremflickr.com/800/520/doddabetta,ooty,india"],
      ["Ooty Rose Garden", "A hillside rose garden with thousands of roses arranged across terraced slopes.", "https://loremflickr.com/800/520/ooty,rose,garden,india"],
      ["Coonoor", "A nearby hill town known for tea estates, viewpoints and the scenic Nilgiri landscape.", "https://loremflickr.com/800/520/coonoor,nilgiri,tea,india"]
    ]
  },
  munnar: {
    name: "Munnar",
    image: "./img/moonar.jpg",
    description: "Kerala's misty hill country, surrounded by tea estates, waterfalls, forests and high viewpoints.",
    booking: "Hello madurai chandru travels, I'd like to book the Munnar tour.",
    places: [
      ["Mattupetty Dam", "A scenic reservoir surrounded by green hills, ideal for relaxing and enjoying the mountain views.", "https://loremflickr.com/800/520/mattupetty,dam,munnar,india"],
      ["Echo Point", "A popular lakeside viewpoint where the surrounding hills create a natural echo.", "https://loremflickr.com/800/520/echo,point,munnar,india"],
      ["Top Station", "A high-altitude viewpoint with sweeping views of the Western Ghats.", "https://loremflickr.com/800/520/top,station,munnar,india"],
      ["Tea Museum", "Discover the history and processing of Munnar's famous tea plantations.", "https://loremflickr.com/800/520/tea,museum,munnar,india"],
      ["Eravikulam National Park", "A mountain landscape famous for Nilgiri tahr and seasonal Neelakurinji blooms.", "https://loremflickr.com/800/520/eravikulam,munnar,india"]
    ]
  },
  kodaikanal: {
    name: "Kodaikanal",
    image: "./img/kodaikanal.jpg",
    description: "A peaceful hill station with pine forests, misty viewpoints, gardens and the iconic star-shaped lake.",
    booking: "Hello madurai chandru travels, I'd like to book the Kodaikanal tour.",
    places: [
      ["Kodaikanal Lake", "The star-shaped lake is the centre of town, with boating and a scenic walking route.", "https://loremflickr.com/800/520/kodaikanal,lake,india"],
      ["Coaker's Walk", "A charming hilltop walkway with beautiful valley and mountain views.", "https://loremflickr.com/800/520/coakers,walk,kodaikanal,india"],
      ["Pillar Rocks", "Three giant rock pillars rising above the misty green valleys of Kodaikanal.", "https://loremflickr.com/800/520/pillar,rocks,kodaikanal,india"],
      ["Bryant Park", "A colourful botanical garden near the lake, popular for flowers and peaceful walks.", "https://loremflickr.com/800/520/bryant,park,kodaikanal,india"],
      ["Guna Caves", "A dramatic forested viewpoint area surrounded by tall cliffs and mist.", "https://loremflickr.com/800/520/guna,caves,kodaikanal,india"]
    ]
  },
  kanyakumari: {
    name: "Kanyakumari",
    image: "./img/kanyakumari.jpg",
    description: "India's southern coastal landmark, famous for sea views, temples, memorials and spectacular sunrises.",
    booking: "Hello madurai chandru travels, I'd like to book the Kanyakumari trip.",
    places: [
      ["Vivekananda Rock Memorial", "A famous offshore memorial reached by ferry, set against the meeting point of the seas.", "https://loremflickr.com/800/520/vivekananda,rock,kanyakumari,india"],
      ["Thiruvalluvar Statue", "The monumental statue standing beside Vivekananda Rock in the sea.", "https://loremflickr.com/800/520/thiruvalluvar,statue,kanyakumari,india"],
      ["Bhagavathi Amman Temple", "A historic temple dedicated to Goddess Bhagavathi at the southern tip.", "https://loremflickr.com/800/520/bhagavathi,amman,temple,kanyakumari,india"],
      ["Gandhi Mandapam", "A memorial built in honour of Mahatma Gandhi with distinctive architecture and sea views.", "https://loremflickr.com/800/520/gandhi,mandapam,kanyakumari,india"],
      ["Sunset Point", "A popular shoreline location for watching the changing colours of the evening sky.", "https://loremflickr.com/800/520/kanyakumari,sunset,sea,india"]
    ]
  },
  rameshwaram: {
    name: "Rameshwaram",
    image: "./img/rameshwaram.jpg",
    description: "A sacred island destination combining temple heritage, coastal scenery and memorable road-trip landmarks.",
    booking: "Hello madurai chandru travels, I'd like to book the Rameshwaram tour.",
    places: [
      ["Ramanathaswamy Temple", "One of India's major pilgrimage temples, renowned for its long corridors and sacred heritage.", "https://loremflickr.com/800/520/ramanathaswamy,temple,rameshwaram,india"],
      ["Pamban Bridge", "The iconic bridge connecting the island with mainland Tamil Nadu, surrounded by sea views.", "https://loremflickr.com/800/520/pamban,bridge,rameshwaram,india"],
      ["Dhanushkodi", "A windswept coastal landscape at the eastern end of the island, known for its ruins and sea views.", "https://loremflickr.com/800/520/dhanushkodi,rameshwaram,india"],
      ["APJ Abdul Kalam Memorial", "A memorial celebrating the life and legacy of India's former President and scientist.", "https://loremflickr.com/800/520/apj,abdul,kalam,memorial,rameshwaram,india"],
      ["Ariyaman Beach", "A quieter coastal stretch where travellers can enjoy the sea and a relaxed atmosphere.", "https://loremflickr.com/800/520/ariyaman,beach,rameshwaram,india"]
    ]
  },
  pondicherry: {
    name: "Pondicherry",
    image: "./img/pondicherry.jpg",
    description: "A colourful coastal getaway blending French-inspired streets, beaches, cafés and spiritual destinations.",
    booking: "Hello madurai chandru travels, I'd like to book the Pondicherry tour.",
    places: [
      ["Promenade Beach", "A popular seafront stretch perfect for a relaxed walk beside the Bay of Bengal.", "https://loremflickr.com/800/520/promenade,beach,pondicherry,india"],
      ["White Town", "Explore pastel streets, heritage buildings, cafés and French-inspired architecture.", "https://loremflickr.com/800/520/white,town,pondicherry,india"],
      ["Sri Aurobindo Ashram", "A renowned spiritual centre in the heart of the heritage quarter.", "https://loremflickr.com/800/520/aurobindo,ashram,pondicherry,india"],
      ["Paradise Beach", "A beautiful sandy beach reached by boat, known for its calm coastal setting.", "https://loremflickr.com/800/520/paradise,beach,pondicherry,india"],
      ["Auroville", "A unique international township known for its peaceful atmosphere and the Matrimandir.", "https://loremflickr.com/800/520/auroville,pondicherry,india"]
    ]
  },
  alleppey: {
    name: "Alleppey Backwaters",
    image: "./img/azapey.jpg",
    description: "A relaxing Kerala backwater experience with houseboats, lagoons, beaches and palm-lined waterways.",
    booking: "Hello madurai chandru travels, I'd like to book the Alleppey Backwaters tour.",
    places: [
      ["Alleppey Houseboat", "Cruise through Kerala's backwaters aboard a traditional-style houseboat.", "https://loremflickr.com/800/520/alleppey,houseboat,kerala,india"],
      ["Alappuzha Beach", "A long sandy shoreline with a historic pier and relaxing sea views.", "https://loremflickr.com/800/520/alappuzha,beach,kerala,india"],
      ["Vembanad Lake", "Kerala's large backwater lake, surrounded by villages, palms and waterways.", "https://loremflickr.com/800/520/vembanad,lake,kerala,india"],
      ["Pathiramanal Island", "A small scenic island in Vembanad Lake, reached by boat.", "https://loremflickr.com/800/520/pathiramanal,island,kerala,india"],
      ["Marari Beach", "A peaceful beach destination near Alleppey with a laid-back coastal atmosphere.", "https://loremflickr.com/800/520/marari,beach,kerala,india"]
    ]
  },
  varkala: {
    name: "Varkala",
    image: "./img/varkala.jpg",
    description: "A coastal Kerala escape known for dramatic red cliffs, beaches, temples and beautiful sunsets.",
    booking: "Hello madurai chandru travels, I'd like to book the Varkala tour.",
    places: [
      ["Varkala Cliff", "The famous laterite cliff overlooks the Arabian Sea and is lined with shops and cafés.", "https://loremflickr.com/800/520/varkala,cliff,kerala,india"],
      ["Papanasam Beach", "A scenic beach below the cliff, known for its wide shoreline and sunset views.", "https://loremflickr.com/800/520/papanasam,beach,varkala,india"],
      ["Janardhana Swamy Temple", "An ancient Vishnu temple near the cliff with a long local pilgrimage tradition.", "https://loremflickr.com/800/520/janardhana,swamy,temple,varkala,india"],
      ["Sivagiri Mutt", "A major pilgrimage and spiritual centre associated with Sree Narayana Guru.", "https://loremflickr.com/800/520/sivagiri,mutt,varkala,india"],
      ["Kappil Beach & Lake", "A scenic meeting of lake and sea north of Varkala, ideal for a quiet stop.", "https://loremflickr.com/800/520/kappil,beach,lake,varkala,india"]
    ]
  }
};

function initDestinationModal() {
  const modal = document.getElementById("destinationModal");
  const backdrop = document.getElementById("destinationModalBackdrop");
  const closeBtn = document.getElementById("destinationModalClose");
  const backBtn = document.getElementById("destinationModalBack");
  const title = document.getElementById("destinationModalTitle");
  const description = document.getElementById("destinationModalDescription");
  const hero = document.getElementById("destinationModalHero");
  const grid = document.getElementById("subplaceGrid");
  const count = document.getElementById("destinationModalCount");
  const bookBtn = document.getElementById("destinationModalBook");
  if (!modal || !grid) return;

  let currentKey = null;

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const open = (key) => {
    const destination = DESTINATIONS[key];
    if (!destination) return;

    currentKey = key;
    title.textContent = destination.name;
    description.textContent = destination.description;
    hero.src = destination.image;
    hero.alt = `${destination.name} destination`;
    count.textContent = `${destination.places.length} places`;

    grid.innerHTML = destination.places.map((place, index) => `
      <article class="subplace-card">
        <div class="subplace-card__image">
          <img src="${place[2]}" alt="${place[0]}" loading="${index < 2 ? "eager" : "lazy"}" width="800" height="520">
          <span class="subplace-card__number">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="subplace-card__body">
          <h4>${place[0]}</h4>
          <p>${place[1]}</p>
        </div>
      </article>
    `).join("");

    // If an external image service is unavailable, keep the card attractive
    // by falling back to the destination's local image.
    grid.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = "true";
        img.src = destination.image;
      }, { once: true });
    });

    bookBtn.href = "#";
    bookBtn.setAttribute("data-msg", destination.booking);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  document.querySelectorAll(".js-destination").forEach((button) => {
    button.addEventListener("click", () => open(button.dataset.destination));
  });

  const closeAll = () => close();
  closeBtn?.addEventListener("click", closeAll);
  backdrop?.addEventListener("click", closeAll);
  backBtn?.addEventListener("click", closeAll);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeAll();
  });

  bookBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    const destination = DESTINATIONS[currentKey];
    if (!destination) return;
    close();
    const bookingTrigger = document.querySelector(`.js-book[data-msg="${CSS.escape(destination.booking)}"]`);
    if (bookingTrigger) {
      bookingTrigger.click();
    }
  });
}

/* --------------------------------------------------------------------------
   1b) BOOKING MODAL
   Every "Book Now" style button (class="js-book") opens this form instead of
   jumping straight to WhatsApp. Whatever the visitor fills in — name, phone,
   trip start/end dates, notes — plus the context of which button they clicked
   (e.g. "Ooty tour", "Corporate Travel") is assembled into one message and
   THAT is what gets pushed to WhatsApp on submit.
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  const backdrop = document.getElementById("bookingModalBackdrop");
  const closeBtn = document.getElementById("bookingModalClose");
  const contextText = document.getElementById("bookingModalContextText");
  const form = document.getElementById("bookingForm");
  if (!modal || !form) return;

  const nameEl = document.getElementById("bookName");
  const phoneEl = document.getElementById("bookPhone");
  const startEl = document.getElementById("bookStartDate");
  const endEl = document.getElementById("bookEndDate");
  const pickupEl = document.getElementById("bookPickup");
  const membersEl = document.getElementById("bookMembers");
  const notesEl = document.getElementById("bookNotes");

  let currentContext = DEFAULT_WHATSAPP_MESSAGE;

  const todayISO = () => new Date().toISOString().split("T")[0];

  const open = (contextMessage) => {
    currentContext = contextMessage || DEFAULT_WHATSAPP_MESSAGE;
    contextText.textContent = currentContext;

    const min = todayISO();
    startEl.min = min;
    endEl.min = min;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => nameEl?.focus(), 200);
  };

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Wire up every "Book Now" trigger on the page
  document.querySelectorAll(".js-book").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      open(el.getAttribute("data-msg"));
    });
  });

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });

  // Keep end-date always >= start-date
  startEl.addEventListener("change", () => {
    endEl.min = startEl.value || todayISO();
    if (endEl.value && endEl.value < endEl.min) endEl.value = endEl.min;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const startDate = startEl.value;
    const endDate = endEl.value;
    const pickup = pickupEl.value.trim();
    const members = membersEl.value.trim();
    const notes = notesEl.value.trim();

    if (!name || !phone || !startDate || !endDate || !pickup || !members) {
      form.reportValidity();
      return;
    }
    if (endDate < startDate) {
      endEl.setCustomValidity("Trip end date can't be before the start date.");
      form.reportValidity();
      endEl.setCustomValidity("");
      return;
    }

    const formatDate = (iso) =>
      new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      });

    // Build the full WhatsApp message from everything the visitor entered
    const lines = [
      currentContext,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Trip Dates: ${formatDate(startDate)} to ${formatDate(endDate)}`,
      `Pickup Point: ${pickup}`,
      `No. of Members: ${members}`,
    ];
    if (notes) lines.push(`Notes: ${notes}`);

    const finalMessage = lines.join("\n");

    window.open(buildWhatsAppLink(finalMessage), "_blank", "noopener,noreferrer");

    close();
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   2) NAVBAR: solid background after scroll + active link highlight
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initActiveNavLink() {
  const links = document.querySelectorAll(".nav-link[href^='#']");
  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* --------------------------------------------------------------------------
   3) MOBILE OFFCANVAS MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("offcanvasClose");
  const backdrop = document.getElementById("offcanvasBackdrop");
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    menu.classList.contains("open") ? close() : open();
  });
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  menu.querySelectorAll(".offcanvas__link, .js-wa").forEach((link) =>
    link.addEventListener("click", close)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* --------------------------------------------------------------------------
   4) SCROLL-REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   5) DEPARTURE-BOARD STAT COUNTERS
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const stats = document.querySelectorAll(".stat[data-count]");
  if (stats.length === 0) return;

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const numEl = el.querySelector(".stat__num");
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      numEl.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    stats.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  stats.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6) GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initLightbox() {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  if (items.length === 0 || !lightbox) return;

  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    imgEl.src = item.getAttribute("data-full") || item.querySelector("img").src;
    imgEl.alt = item.querySelector("img").alt || "";
  };

  const open = (i) => {
    show(i);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  items.forEach((item, i) =>
    item.addEventListener("click", () => open(i))
  );
  closeBtn?.addEventListener("click", close);
  prevBtn?.addEventListener("click", () => show(index - 1));
  nextBtn?.addEventListener("click", () => show(index + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}

/* --------------------------------------------------------------------------
   7) MISC: footer year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppButtons();
  initDestinationModal();
  initBookingModal();
  initNavbarScroll();
  initActiveNavLink();
  initMobileMenu();
  initScrollReveal();
  initStatCounters();
  initLightbox();
  initFooterYear();
});

