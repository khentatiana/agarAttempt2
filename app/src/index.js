if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
} else {
    console.log('Production is online');
}

function component() {
    const element = document.createElement('div');

    element.innerHTML = [
        'Hello World!',
        'Production test!'
    ].join('<br><br>');

    return element;
}

document.body.appendChild(component());

// ***********************************************************************************************************

// For now it just has the parameters for size. Later on it will also store all of locations of other users
class Grid {
    constructor() {
        // 10px by 10px for each grid sector number of sectors for the full grid even if it isn't visible yet
        this._width = 30;
        this._height = 50;
        this.users = []
    }

    getPxHeight() {
        // height in pixels
        return this._height * 10;
    }

    getPxWidth() {
        // width in pixels
        return this._width * 10;
    }

    getCellHeight() {
        // height in cells
        return this._height;
    }

    getCellWidth() {
        // width in cells
        return this._width;
    }

    addUser() {
        // adding a user to our grid
        let name = '';
        // login for the user
        this.users.push(new User(this, name))
    }
}

// class user: when a user logs in we its location on the grid. A location is determined by (px, px)
class User {
    constructor(g, name) {
        // when first created we need to create a cell
        this.userCell = new Cell(g, name);
        document.addEventListener('keydown', event => {
            sendData(event, this.userCell);
        });
    }
}

class Cell {
    constructor(g, name, x=null, y=null) {
        if (x !== null && y !== null) {
            // we are given the location (say the user splits)
            this.x = x;
            this.y = y;
        } else {
            // generate a location for the cell to spawn in
            this.x = Math.floor(Math.random() * g.getPxHeight());
            this.y = Math.floor(Math.random() * g.getPxWidth());
        }
    }
}

function sendData(event, cell) {
    if (event.key === 'ArrowUp') {
        cell.y += 1;
    }
    if (event.key === 'ArrowDown') {
        cell.y -= 1;
    }
    if (event.key === 'ArrowLeft') {
        cell.x -= 1;
    }
    if (event.key === 'ArrowRight') {
        cell.x += 1;
    }

    httpFetch(cell).then(data => console.log(data));
}

async function httpFetch(user) {
    let information = {};
    information['x'] = user.x;
    information['y'] = user.y;

    let k = await fetch('url', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(information),
    });

    return k.json();
}
