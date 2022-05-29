import { Notify } from "notiflix/build/notiflix-notify-aio";

function checkQueryHitsLength(query) {
	if (query.length === 0) {
		MakeBadSearchQueryNotification();
		return;
	}
}

function checkEndHits(hits) {
	if (hits.length <= 20) {
		MakeEndHitsNotification();
	}
}

function MakeEndHitsNotification() {
	Notify.info("We're sorry, but you've reached the end of search results");
}

function MakeBadSearchQueryNotification() {
	Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

export { checkQueryHitsLength, MakeEndHitsNotification, MakeBadSearchQueryNotification, checkEndHits };
