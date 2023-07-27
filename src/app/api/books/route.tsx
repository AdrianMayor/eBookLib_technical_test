import { Book, BookResponse } from "@/models/book.model";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// If this function  is migrated to arrow function it breaks in first load empty cache
export async function GET(request?: Request) {
	//Find the absolute path of the json directory
	const jsonDirectory = path.join(process.cwd(), "json");

	//Read the json data file data.json
	const jsonData = await fs.readFile(jsonDirectory + "/data.json", "utf8");
	const { library }: BookResponse = JSON.parse(jsonData);

	// Now, library is an array of LibraryItem, each containing a book property
	const books: Book[] = library.map((item) => item.book);

	// Adding availability
	books.forEach((item) => (item.availability = true));

	//Return the content of the data file in json format
	return NextResponse.json(books);
}
