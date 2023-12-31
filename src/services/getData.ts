import { Book, BookBase } from "@/models/book.model";
import json from "../../json/data.json";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

async function getData() {
	// Map the data from data.json to the format of Book[]
	const books: BookBase[] = json.library.map((item) => item.book);

	const booksProcessed: Book[] = books.map((item) => ({
		...item,
		availability: true,
	}));

	return booksProcessed;
}

export default getData;


