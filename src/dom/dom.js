import gameboard from '../factory/gameboard.js';
import player from '../factory/player.js';

function createGrid(player) {
	let grid = document.createElement('div');
	grid.classList.add("grid");

	let grid_len = player.board.field.length;
	for (let i=0; i<grid_len; i++) {
		for(let j=0; j<grid_len; j++) {
			let cell = document.createElement('div');
			cell.setAttribute('i', i);
			cell.setAttribute('j', j);
			cell.classList.add('grid-cell');
		    grid.appendChild(cell);
		}
	}
	return grid;
}

function createBoard() {
	const human = player(true);
	const comp = player(false);
	human.board.random_board();
	comp.board.random_board();

	let game_contaier = document.createElement('div');
	game_contaier.id = 'game-container';

	let grid1 = createGrid(human);
	grid1.id = 'p1';
	let grid2 = createGrid(comp);
	grid2.id = 'p2';
	game_contaier.appendChild(grid1);
	game_contaier.appendChild(grid2);

	return [game_contaier, human, comp];
}

export default createBoard;

