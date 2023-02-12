let ship_type = {
	carrier: 5,
	battleship: 4,
	destroyer: 3,
	patroler: 2
	};

const Ship = (type) => {

	let length = ship_type[type];
	let damage = 0;
	let direction;
	let cords;

	const is_sunk = () => {
		if( (length-damage)<1 ) { 
			return true;
		} else {
			return false;
		}
	};

	function hit() {
		damage += 1;
	}

	function get_damage() {
		return damage;
	}


	return {
		is_sunk,
		direction,
		hit, 
		get_damage, 
		length, 
		cords,
	}
} 

export default Ship;

