import { refs } from ".././/refs";

export function show() {
	refs.loadMoreBtn.classList.remove("is-hidden");
}

export function hide() {
	refs.loadMoreBtn.classList.add("is-hidden");
}
