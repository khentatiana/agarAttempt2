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
    canvas.style.border = '1px solid #d3d3d3';
}

// For now it just has the parameters for size. Later on it will also store all of locations of other users
class Grid {
    constructor() {
        // 10px by 10px for each grid sector number of sectors for the full grid even if it isn't visible yet
        this._width = 50;
        this._height = 30;
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
}


// class user: when a user logs in we its location on the grid. A location is determined by (px, px)
class User {
    constructor(g, name) {
        // when first created we need to create a cell
        this.userCell = new Cell(g, name);

        // send the server that you have logged in
        httpFetch(this.userCell, 'login').then(data => displayUsers(this.userCell, data));

        this.keyPressed = {};
        document.addEventListener('keydown', event => {
            this.keyPressed[event.key] = true;
            sendData(event, this.userCell, this.keyPressed);
        });
        document.addEventListener('keyup', event => {
            delete this.keyPressed[event.key];
            sendData(event, this.userCell, this.keyPressed);
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
            this.x = Math.floor(Math.random() * g.getPxWidth());
            this.y = Math.floor(Math.random() * g.getPxHeight());
        }

        this.name = name;
    }
}

function sendData(event, cell, keys) {
    if (keys['ArrowUp']) {
        cell.y -= 2;
    }
    if (keys['ArrowDown']) {
        cell.y += 2;
    }
    if (keys['ArrowLeft']) {
        cell.x -= 2;
    }
    if (keys['ArrowRight']) {
        cell.x += 2;
    }

    httpFetch(cell, 'move').then(data => displayUsers(cell, data));
}

async function httpFetch(user, type) {
    // sending the location of the user cell
    let information = {};
    information['type'] = type;
    information['name'] = user.name;
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

function displayUsers(cell, data) {
    const canvas = document.getElementById('field');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let [name, [x, y]] of data.entries) {
        // draw the outline
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, 50, 0, 2 * Math.PI);

        // write the user's name without filling it in
        ctx.font = '15px Comic Sans MS';
        ctx.strokeText(name, x, y);
        if (x === cell.x && y === cell.y && name === cell.name) {
            // This is the same cell as the cell that the user is controlling (just make it red)
            ctx.fillStyle = 'red';
        }

        // fill the circle
        ctx.fill();
    }
}

const theGrid = new Grid();
setSize(theGrid);
const user = new User(theGrid, 'test');
