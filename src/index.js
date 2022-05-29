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

const API = new GetImages();

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
	show();
}

async function loadMore() {
	checkEndHits(API.images);
	API.incrementPage();
	await API.getImages(API.query);
	drawTemplate(API.images);
	smoothScroll();
}
