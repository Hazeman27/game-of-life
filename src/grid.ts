import { array2D, copy2DArray } from './array2d.js';
import randomInt from './random.js';


function *grid(size = 10) {
	let state = array2D(size)
		.map(row => row.map(() => Math.random() < 0.334));

	function *neighbors(grid: boolean[][], row: number, col: number) {
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				yield grid[(row + i + size) % size][(col + j + size) % size];
			}
		}
	} 

	function countAliveNeighbors(grid: boolean[][], row: number, col: number) {
		let count = 0;
		
		for (const neighbor of neighbors(grid, row, col))
			if (neighbor) count++;

		return count;
	}

	while (true) {
		const currentState = copy2DArray(state);

		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				const aliveNeighborsCount = countAliveNeighbors(currentState, row, col);

				if (!state[row][col] && aliveNeighborsCount === 3)
					state[row][col] = true;
				
				else if (state[row][col] && (aliveNeighborsCount < 2 || aliveNeighborsCount > 3))
					state[row][col] = false;

				if (Math.random() < 0.008) {
					const timeout = randomInt(1000, 1);

					setTimeout(() => {
						const randomRow = (row + Math.floor(Math.random() * size)) % size;
						const randomCol = (col + Math.floor(Math.random() * size)) % size;

						state[randomRow][randomCol] = true;
					}, timeout);
				}
			}
		}

		yield state;
	}
}

export default grid;
