import Ship from '../factory/ship';
import gameboard from '../factory/gameboard'

test("check if ship sinks", () => {
	let test_ship = Ship('carrier');
	for (let i = 0; i <test_ship.length; i++) {
		test_ship.hit();
	}
	expect(test_ship.get_damage()).toBe(5)
	expect(test_ship.is_sunk()).toBe(true);
});





