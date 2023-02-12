import Ship from '../factory/ship'

// random number generating function
function get_rint(field) {
    // return Math.floor(Math.random() * (max - min + 1) ) + min); return Math.floor(Math.random() * (max + 1) );
    let found = false;
    let r_cords = []; 
    while (found == false) {
    r_cords[0] = Math.floor(Math.random()*10);
    r_cords[1] = Math.floor(Math.random()*10);
    if ( field[r_cords[0]][r_cords[1]] == 0 ) {
        found = true; }
    }
    return r_cords;
    };

const gameboard = () => {
    let field = [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ];

    let all_ships = [];

    function create_ships(num, type) {
        for (let i=0; i<num; i++) {
            all_ships.push(Ship(type));
        }
    }

    function directonal_cords(start_x, start_y, end_x, end_y, direction, length) {
        let cords = [];
        if (direction == 0) {
            for (let i=start_x; i<=end_x; i++) {
                if (field[i][start_y] != 0){
                    return 0;
                }
                cords.push([i,start_y]);
            }
        } else if (direction == 1) {
            for (let i=start_y; i<=end_y; i++) {
                if (field[start_x][i] != 0){
                    return 0;
                }
                cords.push([start_x,i]);
            }
        } else if (direction == 2) {
            for (let i=start_x; i>=end_x; i--) {
                if (field[i][start_y] != 0){
                    return 0;
                }
                cords.push([i,start_y]);
            }
        } else {
            for (let i=start_y; i>=end_y; i--) {
                if (field[start_x][i] !=0){
                    return 0;
                }
                cords.push([start_x,i]);
            }
        }
        return cords;
    }

    function random_cords(length) {
        // array to contain diffrent directional cords
        let r_cords = [];
        let [x,y] = get_rint(field);// random cord on field
        // let end = [ [x+length, y, 'v'], [x, y+length, 'h'], [x-length, y, 'v'], [x, y-length, 'h'] ];
        let end = [ [x+length, y, 'v'], [x, y+length, 'h'], [x-length, y, 'u'], [x, y-length, 'l'] ];
        end.forEach((cord, index) => {
            let end_x = cord[0];
            let end_y = cord[1];
            // end cord is valid and available
            if ( (end_x>=0 && end_x<10) && (end_y>=0 && end_y<10) ) {
                if (field[end_x][end_y] == 0) {
                    let rd_cords = directonal_cords(x, y, end_x, end_y, index, length);
                    if (rd_cords != 0){ r_cords.push([rd_cords, cord[2]]); }// add to r_cords if direction cord valid
                }
            }
        });
        if (r_cords.length == 0) {return 0;}
        let num = Math.floor(Math.random()*(r_cords.length));
        return [r_cords[num][0], r_cords[num][1]];
    }

    const receive_attack = (x,y) => {
        for (let i=0; i<all_ships.length; i++) {
            let cords = all_ships[i].cords;
            for (let j=0; j<cords.length; j++) {
                if (cords[j][0]==x && cords[j][1]==y) {
                    all_ships[i].hit();
                }
            }
        }
    }

    const random_board = () => {
        // creating ships adding to all_ships
        create_ships(1, 'carrier');
        create_ships(2, 'battleship');
        create_ships(3, 'destroyer');
        create_ships(4, 'patroler');

        all_ships.forEach(ship => {
            let r_cord = 0;
            let direction;
            while (r_cord == 0) {
                r_cord = random_cords(ship.length-1);
            }
            ship.cords = r_cord[0];
            ship.direction = r_cord[1];
            // set cords on field
            r_cord[0].forEach(cord => {
                field[cord[0]][cord[1]] = 2;
            })
        });
    }

    return {random_board, all_ships, field, receive_attack};
}

export default gameboard;

