import grid from './grid.js';
import range from './range.js';
import {COLORS} from './colors.js';
import randomInt from './random.js';


const WEB_COLORS = Object.keys(COLORS);

const WINDOW_SHORTEST_DIMENSION =
	window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

const CELL_SIZE = 6;
const GRID_SIZE = Math.floor(WINDOW_SHORTEST_DIMENSION * 0.6 / CELL_SIZE);

function main() {
	const gameOfLife = grid(GRID_SIZE);

	const cells = range(GRID_SIZE)
		.map(() => range(GRID_SIZE))
		.map(row => row.map(() => document.createElement('div')));

	const root = document.getElementById('root');
	root.append(...cells.flat());

	root.style.setProperty('--grid-size', `${GRID_SIZE}`);
	root.style.setProperty('--cell-size', `${CELL_SIZE}px`);

	function advance() {
		const generation = gameOfLife.next();

		for (let i = 0; i < GRID_SIZE; i++) {
			for (let j = 0; j < GRID_SIZE; j++) {
				cells[i][j].style.backgroundColor = generation.value[i][j] ? `${
					WEB_COLORS[randomInt(WEB_COLORS.length)]
				}` : 'transparent';
			}
		}
	}

	setInterval(() => requestAnimationFrame(advance), 50);
}

main();