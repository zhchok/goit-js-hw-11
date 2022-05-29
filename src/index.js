import { refs } from "./refs";
import GetImages from "./api";
import {
	checkQueryHitsLength,
	MakeBadSearchQueryNotification,
	checkEndHits,
	totalHitsNotification,
} from "./helpers/notifications";
import { show, hide } from "./components/loadMoreBtn";
import { clearGallery, drawTemplate } from ".//helpers/draw";
import { smoothScroll } from ".//components/smoothScroll";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API = new GetImages();
const lightbox = new SimpleLightbox(".gallery a");

refs.form.addEventListener("submit", onInputSearch);
refs.loadMoreBtn.addEventListener("click", loadMore);

async function onInputSearch(e) {
	e.preventDefault();
	API.query = e.target.elements.searchQuery.value;
	if (API.query === "") {
		MakeBadSearchQueryNotification();
		clearGallery();
		hide();
		return;
	}
	API.resetPage();
	clearGallery();
	await API.getImages(API.query);
	await API.getTotalHits(API.query);
	totalHitsNotification(API.totalHits);
	checkQueryHitsLength(API.query);
	drawTemplate(API.images);
	lightbox.refresh();
	show();
}

async function loadMore() {
	checkEndHits(API.images);
	API.incrementPage();
	await API.getImages(API.query);
	drawTemplate(API.images);
	lightbox.refresh();
	smoothScroll();
}
