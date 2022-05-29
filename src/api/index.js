import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const API_KEY = "16805125-ec7c862cec45ded83974169e0";
const BASE_URL = "https://pixabay.com/api/";

export default class GetImages {
	constructor() {
		this.searchQuery = "";
		this.page = 1;
		this.images = [];
	}

	async getImages() {
		const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation =horizontal&safesearch =true&page=${this.page}&per_page=40`;
		try {
			const { data } = await axios(url);
			console.log("Дані запита", data.hits);
			return (this.images = data.hits);
		} catch (error) {
			console.log(error);
		}
	}

	incrementPage() {
		this.page += 1;
	}

	resetPage() {
		this.page = 1;
	}

	get query() {
		return this.searchQuery;
	}

	set query(newQuery) {
		this.searchQuery = newQuery;
	}
}
