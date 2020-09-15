import range from './range.js';


export function array2D(rows = 0, cols?: number) {
	return range(rows).map(() => range(cols || rows)); 
}

export function copy2DArray<T>(array: T[][]) {
	return array.map(row => row.map(col => col));
}

export default array2D;
