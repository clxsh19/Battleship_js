import createBoard from './dom/dom.js';
import render_boat from './dom/put_boat.js'
import './style.css';

let game_over = false;

const content = document.getElementById('content');
let [board, human, comp] = createBoard();
content.appendChild(board);

render_boat(human);
render_boat(comp);
let p2_cell = document.querySelector('#p2').children;
for (let i=0; i<p2_cell.length; i++) {
	p2_cell[i].onclick = () => {
		if (!game_over) {
			let x = p2_cell[i].getAttribute('i');
			let y = p2_cell[i].getAttribute('j');
			attack_board(p2_cell[i], x, y, comp);
			game_over = check_gameover(comp.board.all_ships);

			if (!game_over) {
				let [x2,y2] = comp.gen_move(human.board.field);
				let num = ((x2*10)+1+y2);
				attack_board(document.querySelector(`#p1 > div:nth-child(${num})`),x2,y2,human);
				game_over = check_gameover(human.board.all_ships);
			}
		} else {
			console.log('game_over');
		}
	}
}

function check_gameover(all_ships) {
	for (let i=0; i<all_ships.length; i++) {
		let ship = all_ships[i];
		if (ship.is_sunk() == false) {
			return false;
		}
	}
	return true;
}

function attack_board(elm, x, y, player) {
	player.board.receive_attack(x,y);
	if (player.board.field[x][y] == 2) {
		elm.style.backgroundColor = 'brown';
		if (!(player.is_human)) {
			let ship_type = elm.classList[1];
			let ship_direction = elm.classList[2];
			elm.classList.replace(ship_type, ship_type.slice(1));
			elm.classList.replace(ship_direction, ship_direction.slice(1));
		}
	} else {
		elm.style.backgroundColor = 'blue';
	};
	player.board.field[x][y] = 4;
}






