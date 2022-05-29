import { refs } from "./refs";
import GetImages from "./api";
import { checkQueryHitsLength, MakeBadSearchQueryNotification, checkEndHits } from "./helpers/notifications";
import { show, hide } from "./components/loadMoreBtn";
import { clearGallery, drawTemplate } from ".//helpers/draw";

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
	checkQueryHitsLength(API.query);
	drawTemplate(API.images);
	show();
}

async function loadMore() {
	checkEndHits(API.images);
	API.incrementPage();
	await API.getImages(API.query);
	drawTemplate(API.images);
}
//
