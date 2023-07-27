"use client";

import { Book } from "@/models/book.model";
import useManageRedux from "./useManageRedux";
import useLocalStorage from "./useLocalStorage";
import { useState } from "react";

interface useHandleCardsProps {
	book: Book;
}
const useHandleCards = ({ book }: useHandleCardsProps) => {
	const { reduxListState, setListReduxState, updateAvailableGenres } = useManageRedux();
	const [_, setLocalStorage] = useLocalStorage<Book[]>("readingList");
	const [isAvailable, setIsAvailable] = useState<boolean>(book.availability);

	// Handle add / remove events
	const handleAdd = () => {
		const newBooksInList = [...reduxListState, book];
		setListReduxState(newBooksInList);
		setLocalStorage(newBooksInList);
		updateAvailableGenres({ genre: book.genre, type: "decrement" });
		setIsAvailable(false);
	};

	const handleRemove = () => {
		const newBooksInList = reduxListState.filter((item) => item.ISBN !== book.ISBN);
		setListReduxState(newBooksInList);
		setLocalStorage(newBooksInList);
		updateAvailableGenres({ genre: book.genre, type: "increment" });
		setIsAvailable(true);
	};

	return { handleAdd, handleRemove, isAvailable, setIsAvailable };
};

export default useHandleCards;
