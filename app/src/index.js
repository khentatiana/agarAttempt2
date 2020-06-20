if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
} else {
    console.log('Production is online');
    console.log('урааааа!');
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
// adding a canvas element to our html file
function add_canvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'field';
    return canvas;
}

document.body.appendChild(add_canvas());

// ***********************************************************************************************************
function setSize(g) {
    const canvas = document.getElementById('field');

    canvas.width = g.getPxWidth();
    canvas.height = g.getPxHeight();
    canvas.style.border = '1px solid #d3d3d3;';
}

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
        return this._height * 40;
    }

    getPxWidth() {
        // width in pixels
        return this._width * 40;
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

    let d = {'None': 0};
    httpFetch(cell).then(data => d = data);
    displayUser(cell);
}

async function httpFetch(user) {
    // sending the location of the user cell
    let information = {};
    information['x'] = user.x;
    information['y'] = user.y;

    console.log(information);

    let k = await fetch('/agar/sendData', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(information),
    });

    return k.json();
}

function displayUser(cell) {
    const canvas = document.getElementById('field');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(cell.x, cell.y, 50, 0, 2 * Math.PI);
    ctx.fill()
}

const theGrid = new Grid();
setSize(theGrid);
const user = new User(theGrid, 'test');
