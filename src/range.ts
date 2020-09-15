function range(start = 0, end?: number) {
	let offset = 0;
	let length = start;

	if (end) {
		offset = start;
		length = end - start;
	}
	
	return [...Array(length).keys()].map(element => element + offset);
}

export default range;
