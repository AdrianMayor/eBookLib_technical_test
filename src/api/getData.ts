import { headers } from "next/dist/client/components/headers";
import { Book } from "@/models/book.model";

const getData = async () => {
	// This 2 lines of code is needed to be able to fetch api in SSR components
	const response = await fetch(`${process.env.HOST}/api/books`);
	const books: Book[] = await response.json();
	return books;
};

export default getData;
