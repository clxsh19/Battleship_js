import gameboard from '../factory/gameboard'

const player = (is_human) => {
	const board = gameboard();

	if (!is_human) {
		function gen_move(human_board) {
			while (true) {
				let x = Math.floor(Math.random()*10);
			    let y = Math.floor(Math.random()*10);
			    if (human_board[x][y] != 4) {return [x,y]}
		    }
		}
		return {is_human, board, gen_move}
	}
	return {is_human, board}
};

export default player;
