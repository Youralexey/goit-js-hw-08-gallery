import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  image: document.createElement("img"),
  lightbox: document.querySelector(".lightbox"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector(".lightbox__content"),
  lightbox__image: document.querySelector(".lightbox__image"),
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
refs.modal.addEventListener("click", onBackdropEvent);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  if (event.target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightbox__image.src = event.target.getAttribute("data-source");
    refs.lightbox__image.alt = event.target.alt;
  };
  window.addEventListener('keydown', ESCclose);
//   window.addEventListener('scroll', (e) => { // отключение скрола при окрытой модалке
//   window.scrollTo(0,0);
// });
};

function onClickBtnClose(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightbox__image.src = '';
  refs.lightbox__image.alt = '';
  window.removeEventListener('keydown', ESCclose);
};

function onBackdropEvent(event) { // НЕ РАБОТАЕТ закрытие модалки по клику на бэкдроп
  if (event.currentTarget === event.target) {
    onClickHandlerClose()
  };
  
};

 function ESCclose(event) {
   if (event.code  === "Escape") {
    onClickBtnClose();
   };
};
