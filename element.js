import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  image: document.createElement("img"),
  lightbox: document.querySelector(".lightbox"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector(".lightbox__content"),
  lightbox__image: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay")
};


const galleryMarkup = createGalleryCard(images)
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCard(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
    .join('');
};
 refs.image.classList.add("gallery__image");


refs.gallery.addEventListener("click", onGalleryClick);
refs.btn.addEventListener("click", onClickBtnClose);
refs.overlay.addEventListener("click", onClickBtnClose);


function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
    refs.lightbox.classList.add("is-open");
    refs.lightbox__image.src = event.target.getAttribute("data-source");
    refs.lightbox__image.alt = event.target.alt;

  window.addEventListener('keydown', ESCclose);
};

function onClickBtnClose(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightbox__image.src = '';
  refs.lightbox__image.alt = '';
  window.removeEventListener('keydown', ESCclose);
};

 function ESCclose(event) {
   if (event.code  === "Escape") {
    onClickBtnClose();
   };
};
