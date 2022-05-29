import imagesTpl from "../templates/images.hbs";
import { refs } from "../refs";

export function clearGallery() {
	refs.gallery.innerHTML = "";
}

export function drawTemplate(images) {
	refs.gallery.insertAdjacentHTML("beforeend", imagesTpl(images));
}
