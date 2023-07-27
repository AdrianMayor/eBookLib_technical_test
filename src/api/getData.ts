async function getData() {
	const res = await import("../app/api/books/route");
	console.log(res);
	return await (await res.GET()).json();
}

export default getData;
