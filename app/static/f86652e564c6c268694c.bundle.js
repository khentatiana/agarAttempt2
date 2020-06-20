/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
    console.log('Looks like we are in development mode!');
} else {}

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJLElBQXFDO0FBQ3pDO0FBQ0EsQ0FBQyxNQUFNLEVBR047O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixtQ0FBbUM7QUFDckQ7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJmODY2NTJlNTY0YzZjMjY4Njk0Yy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc29sZS5sb2coJ0xvb2tzIGxpa2Ugd2UgYXJlIGluIGRldmVsb3BtZW50IG1vZGUhJyk7XG59IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdQcm9kdWN0aW9uIGlzIG9ubGluZScpO1xuICAgIGNvbnNvbGUubG9nKCfRg9GA0LDQsNCw0LDQsCEnKTtcbn1cblxuZnVuY3Rpb24gY29tcG9uZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gW1xuICAgICAgICAnSGVsbG8gV29ybGQhJyxcbiAgICAgICAgJ1Byb2R1Y3Rpb24gdGVzdCEnXG4gICAgXS5qb2luKCc8YnI+PGJyPicpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gYWRkaW5nIGEgY2FudmFzIGVsZW1lbnQgdG8gb3VyIGh0bWwgZmlsZVxuZnVuY3Rpb24gYWRkX2NhbnZhcygpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuaWQgPSAnZmllbGQnO1xuICAgIHJldHVybiBjYW52YXM7XG59XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWRkX2NhbnZhcygpKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmZ1bmN0aW9uIHNldFNpemUoZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZCcpO1xuXG4gICAgY2FudmFzLndpZHRoID0gZy5nZXRQeFdpZHRoKCk7XG4gICAgY2FudmFzLmhlaWdodCA9IGcuZ2V0UHhIZWlnaHQoKTtcbiAgICBjYW52YXMuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjZDNkM2QzOyc7XG59XG5cbi8vIEZvciBub3cgaXQganVzdCBoYXMgdGhlIHBhcmFtZXRlcnMgZm9yIHNpemUuIExhdGVyIG9uIGl0IHdpbGwgYWxzbyBzdG9yZSBhbGwgb2YgbG9jYXRpb25zIG9mIG90aGVyIHVzZXJzXG5jbGFzcyBHcmlkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gMTBweCBieSAxMHB4IGZvciBlYWNoIGdyaWQgc2VjdG9yIG51bWJlciBvZiBzZWN0b3JzIGZvciB0aGUgZnVsbCBncmlkIGV2ZW4gaWYgaXQgaXNuJ3QgdmlzaWJsZSB5ZXRcbiAgICAgICAgdGhpcy5fd2lkdGggPSAzMDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMudXNlcnMgPSBbXVxuICAgIH1cblxuICAgIGdldFB4SGVpZ2h0KCkge1xuICAgICAgICAvLyBoZWlnaHQgaW4gcGl4ZWxzXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQgKiA0MDtcbiAgICB9XG5cbiAgICBnZXRQeFdpZHRoKCkge1xuICAgICAgICAvLyB3aWR0aCBpbiBwaXhlbHNcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoICogNDA7XG4gICAgfVxuXG4gICAgZ2V0Q2VsbEhlaWdodCgpIHtcbiAgICAgICAgLy8gaGVpZ2h0IGluIGNlbGxzXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0Q2VsbFdpZHRoKCkge1xuICAgICAgICAvLyB3aWR0aCBpbiBjZWxsc1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgYWRkVXNlcigpIHtcbiAgICAgICAgLy8gYWRkaW5nIGEgdXNlciB0byBvdXIgZ3JpZFxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICAvLyBsb2dpbiBmb3IgdGhlIHVzZXJcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKG5ldyBVc2VyKHRoaXMsIG5hbWUpKVxuICAgIH1cbn1cblxuXG4vLyBjbGFzcyB1c2VyOiB3aGVuIGEgdXNlciBsb2dzIGluIHdlIGl0cyBsb2NhdGlvbiBvbiB0aGUgZ3JpZC4gQSBsb2NhdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IChweCwgcHgpXG5jbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3RvcihnLCBuYW1lKSB7XG4gICAgICAgIC8vIHdoZW4gZmlyc3QgY3JlYXRlZCB3ZSBuZWVkIHRvIGNyZWF0ZSBhIGNlbGxcbiAgICAgICAgdGhpcy51c2VyQ2VsbCA9IG5ldyBDZWxsKGcsIG5hbWUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgc2VuZERhdGEoZXZlbnQsIHRoaXMudXNlckNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIENlbGwge1xuICAgIGNvbnN0cnVjdG9yKGcsIG5hbWUsIHg9bnVsbCwgeT1udWxsKSB7XG4gICAgICAgIGlmICh4ICE9PSBudWxsICYmIHkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIHdlIGFyZSBnaXZlbiB0aGUgbG9jYXRpb24gKHNheSB0aGUgdXNlciBzcGxpdHMpXG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIGEgbG9jYXRpb24gZm9yIHRoZSBjZWxsIHRvIHNwYXduIGluXG4gICAgICAgICAgICB0aGlzLnggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnLmdldFB4SGVpZ2h0KCkpO1xuICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZy5nZXRQeFdpZHRoKCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZW5kRGF0YShldmVudCwgY2VsbCkge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBjZWxsLnkgKz0gMTtcbiAgICB9XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgY2VsbC55IC09IDE7XG4gICAgfVxuICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgIGNlbGwueCAtPSAxO1xuICAgIH1cbiAgICBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgY2VsbC54ICs9IDE7XG4gICAgfVxuXG4gICAgbGV0IGQgPSB7J05vbmUnOiAwfTtcbiAgICBodHRwRmV0Y2goY2VsbCkudGhlbihkYXRhID0+IGQgPSBkYXRhKTtcbiAgICBkaXNwbGF5VXNlcihjZWxsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaHR0cEZldGNoKHVzZXIpIHtcbiAgICAvLyBzZW5kaW5nIHRoZSBsb2NhdGlvbiBvZiB0aGUgdXNlciBjZWxsXG4gICAgbGV0IGluZm9ybWF0aW9uID0ge307XG4gICAgaW5mb3JtYXRpb25bJ3gnXSA9IHVzZXIueDtcbiAgICBpbmZvcm1hdGlvblsneSddID0gdXNlci55O1xuXG4gICAgY29uc29sZS5sb2coaW5mb3JtYXRpb24pO1xuXG4gICAgbGV0IGsgPSBhd2FpdCBmZXRjaCgnL2FnYXIvc2VuZERhdGEnLCB7XG4gICAgICAgIG1ldGhvZDogJ1Bvc3QnLFxuICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGluZm9ybWF0aW9uKSxcbiAgICB9KTtcblxuICAgIHJldHVybiBrLmpzb24oKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVVzZXIoY2VsbCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZCcpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY2VsbC54LCBjZWxsLnksIDUwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmZpbGwoKVxufVxuXG5jb25zdCB0aGVHcmlkID0gbmV3IEdyaWQoKTtcbnNldFNpemUodGhlR3JpZCk7XG5jb25zdCB1c2VyID0gbmV3IFVzZXIodGhlR3JpZCwgJ3Rlc3QnKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=