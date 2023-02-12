import gameboard from '../factory/gameboard'

test("check cords are valid", () => {	// cord already appeared once
	let checked = [];
	let test_gameboard = gameboard();
	test_gameboard.random_board();
	let ships = test_gameboard.all_ships;
    for (let i=0; i<ships.length; i++) {
    	let cords = ships[i].cords;
    	for (let j=0; j<cords.length; j++) {
            expect(checked).not.toContain( [cords[j][0], cords[j][1]] ) ;
    	 	expect(test_gameboard.field[cords[j][0]][cords[j][1]]).toBe(2);
    	    checked.push([cords[j][0], cords[j][1]]);
    	}        
    }
});

test("receive attack and sink a ship", () => {
	let test_gameboard = gameboard();
	test_gameboard.random_board();
	let ships = test_gameboard.all_ships;
	// random ship
	let num = Math.floor(Math.random()*(ships.length));
	let ship = ships[num];
	let cords = ship.cords;
	for (let j=0; j<cords.length; j++){
		let [x,y] = cords[j];
		test_gameboard.receive_attack(x,y);
	}
	expect(ship.is_sunk()).toBe(true);
	// expect(test_gameboard.all_ships.length).toBe(9);
});
