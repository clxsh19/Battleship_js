function render_boat(player) {
	let ships = player.board.all_ships;
	ships.forEach(ship => {
		let cords = ship.cords;
		let i=1;
		cords.forEach(cord => {
			let num = ((cord[0]*10)+1+cord[1]);
			if (player.is_human) {
				let cell = document.querySelector(`#p1 > div:nth-child(${num})`);
				cell.classList.add(`ship${ship.length}-${i}`);
				cell.classList.add(`ship-${ship.direction}`);
			} else {
				let cell = document.querySelector(`#p2 > div:nth-child(${num})`);
				cell.classList.add(`cship${ship.length}-${i}`);
				cell.classList.add(`cship-${ship.direction}`);
			}
			i += 1;
		})
	})
} 


export default render_boat;
