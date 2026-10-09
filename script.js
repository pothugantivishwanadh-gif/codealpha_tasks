const photos = [

  // NATURE
  {
    title: "Misty Forest",
    category: "nature",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Golden Mountains",
    category: "nature",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Calm Lake",
    category: "nature",
    src: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=900&q=85"
  },


  // ARCHITECTURE
  {
    title: "Modern Lines",
    category: "architecture",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Concrete Design",
    category: "architecture",
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "City Architecture",
    category: "architecture",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85"
  },


  // TRAVEL
  {
    title: "Tropical Escape",
    category: "travel",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Desert Road",
    category: "travel",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Hidden Village",
    category: "travel",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85"
  },


  // LIFESTYLE
  {
    title: "Morning Routine",
    category: "lifestyle",
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Creative Workspace",
    category: "lifestyle",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Relaxed Evening",
    category: "lifestyle",
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85"
  },


  // TECHNOLOGY
  {
    title: "Artificial Intelligence",
    category: "technology",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Future Technology",
    category: "technology",
    src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=900&q=85"
  },

  {
    title: "Digital Innovation",
    category: "technology",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85"
  }

];


const galleryGrid =
  document.getElementById("galleryGrid");

const filters =
  document.getElementById("filters");

const imageCount =
  document.getElementById("imageCount");


const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxTitle =
  document.getElementById("lightboxTitle");

const lightboxCategory =
  document.getElementById("lightboxCategory");

const imageCounter =
  document.getElementById("imageCounter");


const closeBtn =
  document.getElementById("closeBtn");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");


let currentCategory = "all";

let visiblePhotos = [...photos];

let currentIndex = 0;

let lastFocusedElement = null;


/* =========================
   RENDER GALLERY
========================= */

function renderGallery() {

  visiblePhotos =
    currentCategory === "all"
      ? [...photos]
      : photos.filter(
          photo =>
            photo.category === currentCategory
        );


  galleryGrid.innerHTML = "";


  visiblePhotos.forEach(
    (photo, index) => {

      const card =
        document.createElement("article");

      card.className = "photo-card";

      card.style.animationDelay =
        `${index * 45}ms`;

      card.tabIndex = 0;

      card.setAttribute(
        "role",
        "button"
      );

      card.setAttribute(
        "aria-label",
        `View ${photo.title}`
      );


      const imageWrap =
        document.createElement("div");

      imageWrap.className =
        "photo-wrap";


      const img =
        document.createElement("img");

      img.src = photo.src;

      img.alt = photo.title;

      img.loading = "lazy";


      img.onerror = () => {

        img.onerror = null;

        img.src =
          "https://placehold.co/800x600/e8e4da/77766f?text=Image+Unavailable";

      };


      const overlay =
        document.createElement("div");

      overlay.className =
        "photo-overlay";


      const viewIcon =
        document.createElement("span");

      viewIcon.className =
        "view-icon";

      viewIcon.textContent = "↗";


      overlay.appendChild(viewIcon);

      imageWrap.append(
        img,
        overlay
      );


      const details =
        document.createElement("div");

      details.className =
        "photo-details";


      const category =
        document.createElement("p");

      category.className =
        "photo-category";

      category.textContent =
        photo.category;


      const title =
        document.createElement("h3");

      title.textContent =
        photo.title;


      details.append(
        category,
        title
      );


      card.append(
        imageWrap,
        details
      );


      card.addEventListener(
        "click",
        () => openLightbox(index)
      );


      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            openLightbox(index);

          }

        }
      );


      galleryGrid.appendChild(card);

    }
  );


  imageCount.textContent =
    `${visiblePhotos.length} photographs`;
}


/* =========================
   CATEGORY FILTER
========================= */

filters.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".filter-btn"
      );

    if (!button) return;


    currentCategory =
      button.dataset.category;


    filters
      .querySelectorAll(".filter-btn")
      .forEach(btn => {

        const selected =
          btn === button;

        btn.classList.toggle(
          "active",
          selected
        );

        btn.setAttribute(
          "aria-pressed",
          String(selected)
        );

      });


    renderGallery();

  }
);


/* =========================
   OPEN LIGHTBOX
========================= */

function openLightbox(index) {

  if (!visiblePhotos.length)
    return;


  lastFocusedElement =
    document.activeElement;


  currentIndex = index;

  updateLightbox();


  lightbox.classList.add("open");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "no-scroll"
  );


  closeBtn.focus();
}


/* =========================
   UPDATE LIGHTBOX
========================= */

function updateLightbox() {

  const photo =
    visiblePhotos[currentIndex];


  lightboxImage.src =
    photo.src;

  lightboxImage.alt =
    photo.title;

  lightboxTitle.textContent =
    photo.title;

  lightboxCategory.textContent =
    photo.category;


  imageCounter.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(visiblePhotos.length).padStart(2, "0")}`;
}


/* =========================
   NEXT IMAGE
========================= */

function nextImage() {

  currentIndex =
    (currentIndex + 1) %
    visiblePhotos.length;

  updateLightbox();
}


/* =========================
   PREVIOUS IMAGE
========================= */

function previousImage() {

  currentIndex =
    (
      currentIndex -
      1 +
      visiblePhotos.length
    ) %
    visiblePhotos.length;

  updateLightbox();
}


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

  lightbox.classList.remove(
    "open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );


  lightboxImage.removeAttribute(
    "src"
  );


  if (
    lastFocusedElement &&
    lastFocusedElement.isConnected
  ) {

    lastFocusedElement.focus();

  }
}


/* =========================
   BUTTON EVENTS
========================= */

nextBtn.addEventListener(
  "click",
  nextImage
);


prevBtn.addEventListener(
  "click",
  previousImage
);


closeBtn.addEventListener(
  "click",
  closeLightbox
);


/* =========================
   CLICK OUTSIDE
========================= */

lightbox.addEventListener(
  "click",
  event => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      !lightbox.classList.contains(
        "open"
      )
    ) return;


    if (
      event.key === "ArrowRight"
    ) {

      nextImage();

    }

    else if (
      event.key === "ArrowLeft"
    ) {

      previousImage();

    }

    else if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }

  }
);


/* =========================
   START GALLERY
========================= */

renderGallery();