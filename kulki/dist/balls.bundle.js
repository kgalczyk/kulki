/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/Ball.ts":
/*!********************!*\
  !*** ./ts/Ball.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"./ts/Cell.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Ball = /** @class */ (function (_super) {\r\n    __extends(Ball, _super);\r\n    function Ball(indexes, balls, toPreview) {\r\n        var _this = _super.call(this, indexes) || this;\r\n        _this.STATE = false;\r\n        _this.isPreviewed = false;\r\n        _this.changeSize = function (div) {\r\n            div.style.width = (_this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.WIDTH) + \"px\";\r\n            div.style.height = (_this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.HEIGHT) + \"px\";\r\n        };\r\n        _this.toHTMLElement = function () {\r\n            _this.parentDiv = document.getElementById(_this.getId());\r\n            var div = document.createElement(\"div\");\r\n            div.style.width = Ball.PROPERTIES.WIDTH + \"px\";\r\n            div.style.height = Ball.PROPERTIES.HEIGHT + \"px\";\r\n            div.style.backgroundColor = _this.color;\r\n            div.style.border = \"1px solid black\";\r\n            div.classList.add(Ball.PROPERTIES.CLASSNAME);\r\n            _this.div = div;\r\n            div.onclick = function () {\r\n                if (_this.isPreviewed)\r\n                    return;\r\n                var selectedBall = _this.getBalls().find(function (ball) { return ball.getState() == true; });\r\n                if (selectedBall && selectedBall.getId() != _this.getId()) {\r\n                    selectedBall.setState(false);\r\n                    selectedBall.changeSize(selectedBall.getDiv());\r\n                }\r\n                _this.STATE = !_this.STATE;\r\n                _this.changeSize(div);\r\n            };\r\n            return div;\r\n        };\r\n        _this.getState = function () {\r\n            return _this.STATE;\r\n        };\r\n        _this.setState = function (bool) {\r\n            _this.STATE = bool;\r\n        };\r\n        _this.getDiv = function () {\r\n            return _this.div;\r\n        };\r\n        _this.setBalls = function (balls) {\r\n            _this.balls = balls;\r\n        };\r\n        _this.getBalls = function () { return _this.balls; };\r\n        _this.isPreviewed = toPreview;\r\n        _this.balls = balls;\r\n        _this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];\r\n        return _this;\r\n    }\r\n    Ball.prototype.getParentDiv = function () {\r\n        return this.parentDiv;\r\n    };\r\n    Ball.prototype.setParentDiv = function (div) {\r\n        this.parentDiv = div;\r\n    };\r\n    Ball.prototype.getColor = function () {\r\n        return this.color;\r\n    };\r\n    Ball.prototype.setColor = function (color) {\r\n        this.color = color;\r\n    };\r\n    Ball.PROPERTIES = {\r\n        WIDTH: 25,\r\n        HEIGHT: 25,\r\n        EMBIGGEN_SIZE: 40,\r\n        CLASSNAME: \"ball\",\r\n        COLOR: ['blue', 'purple', 'red', 'yellow', 'green', 'white', 'orange'],\r\n    };\r\n    return Ball;\r\n}(_Cell__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);\r\n\n\n//# sourceURL=webpack:///./ts/Ball.ts?");

/***/ }),

/***/ "./ts/BallsController.ts":
/*!*******************************!*\
  !*** ./ts/BallsController.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./ts/Ball.ts\");\n/* harmony import */ var _generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateRandomNumber */ \"./ts/generateRandomNumber.ts\");\n/* harmony import */ var _Pathfinder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pathfinder */ \"./ts/Pathfinder.ts\");\n/* harmony import */ var _Preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Preview */ \"./ts/Preview.ts\");\n\r\n\r\n\r\n\r\nvar BallsController = /** @class */ (function () {\r\n    function BallsController(cells, width, height) {\r\n        var _this = this;\r\n        this.balls = [];\r\n        this.cells = [];\r\n        this.numericCellsArray = [];\r\n        this.preview = new _Preview__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n        this.AMOUNT_OF_PREVIEWED_BALLS = 3;\r\n        this.createNumericCellsArray = function () {\r\n            for (var width = 0; width < _this.width; width++) {\r\n                _this.numericCellsArray.push([]);\r\n                for (var height = 0; height < _this.height; height++) {\r\n                    _this.numericCellsArray[width][height] = _this.cells[width * height + width].getNumericValue(); //\r\n                }\r\n            }\r\n        };\r\n        this.renderBalls = function () {\r\n            // console.log(\"render kulek\", this.balls);\r\n            _this.balls.forEach(function (ball) {\r\n                var cell = _this.cells.find(function (cell) {\r\n                    if (cell.getX() === ball.getX() &&\r\n                        cell.getY() === ball.getY()) {\r\n                        cell.hasBall = true;\r\n                        ball.isPreviewed = false;\r\n                        return cell;\r\n                    }\r\n                });\r\n                if (!cell)\r\n                    return;\r\n                var cellId = document.getElementById(cell.getId());\r\n                cellId.innerHTML = '';\r\n                cellId.appendChild(ball.toHTMLElement());\r\n                _this.updateNumericArray(Number.POSITIVE_INFINITY, { x: cell.getX(), y: cell.getY() });\r\n            });\r\n        };\r\n        this.generateRandomBall = function (toPreview) {\r\n            var ball = new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ x: (0,_generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_this.width, 0), y: (0,_generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_this.height, 0) }, _this.balls, toPreview);\r\n            ball.getBalls = function () { return _this.getBalls(); };\r\n            return ball;\r\n        };\r\n        this.changePreview = function () {\r\n            var _a;\r\n            var previewedBalls = _this.getPreviewedBalls(true);\r\n            _this.preview.changePreview(previewedBalls);\r\n            (_a = _this.balls).push.apply(_a, previewedBalls);\r\n        };\r\n        this.getPreviewedBalls = function (toPreview) {\r\n            var balls = [];\r\n            var _loop_1 = function (i) {\r\n                var ball = _this.generateRandomBall(toPreview);\r\n                while (!_this.cells.find(function (cell) { return cell.hasBall == false && cell.getId() == ball.getId(); }))\r\n                    ball = _this.generateRandomBall(toPreview);\r\n                balls.push(ball);\r\n            };\r\n            for (var i = 0; i < _this.AMOUNT_OF_PREVIEWED_BALLS; i++) {\r\n                _loop_1(i);\r\n            }\r\n            return balls;\r\n        };\r\n        this.updateBalls = function (div, cell) {\r\n            _this.pathFinder.getShortestPath();\r\n            var selectedBall = _this.balls.find(function (ball) { return ball.getState() == true; }); // znajdujemy wybraną kulkę\r\n            var selectedCell = _this.cells.find(function (cell) { return cell.getId() == selectedBall.getId(); });\r\n            selectedBall.getParentDiv().innerHTML = '';\r\n            selectedCell.hasBall = false;\r\n            if (!selectedBall)\r\n                return;\r\n            // teraz musimy usunąć wybraną kulkę, usunąć elementhtml wybranej kulki z diva w którym się znajdowała\r\n            var newBall = new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ x: cell.getX(), y: cell.getY() }, _this.balls, false);\r\n            newBall.setColor(selectedBall.getColor());\r\n            newBall.setParentDiv(div);\r\n            _this.balls = _this.balls.filter(function (ball) { return ball.getId() != selectedBall.getId(); });\r\n            _this.balls.push(newBall);\r\n            _this.renderBalls();\r\n            _this.changePreview();\r\n        };\r\n        this.updateNumericArray = function (value, indexes) {\r\n            _this.numericCellsArray[indexes.x][indexes.y] = value;\r\n        };\r\n        this.getNumericArray = function () {\r\n            return _this.numericCellsArray;\r\n        };\r\n        this.getBalls = function () {\r\n            return _this.balls;\r\n        };\r\n        this.setBalls = function (balls) {\r\n            _this.balls = balls;\r\n        };\r\n        this.lose = function () {\r\n            if (_this.balls.length == _this.width * _this.height)\r\n                alert(\"przegrana\");\r\n        };\r\n        this.width = width;\r\n        this.height = height;\r\n        this.cells = cells;\r\n        this.balls = this.getPreviewedBalls(false);\r\n        this.createNumericCellsArray();\r\n        this.pathFinder = new _Pathfinder__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.numericCellsArray);\r\n        this.renderBalls();\r\n        this.changePreview();\r\n    }\r\n    return BallsController;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BallsController);\r\n\n\n//# sourceURL=webpack:///./ts/BallsController.ts?");

/***/ }),

/***/ "./ts/Board.ts":
/*!*********************!*\
  !*** ./ts/Board.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _BallsController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BallsController */ \"./ts/BallsController.ts\");\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ \"./ts/Cell.ts\");\n\r\n\r\nvar Board = /** @class */ (function () {\r\n    function Board(boardWidth, boardHeight) {\r\n        var _this = this;\r\n        this.boardElement = document.getElementById(\"board\");\r\n        this.cells = [];\r\n        this.setListeners = function () {\r\n            _this.cells.forEach(function (cell) {\r\n                var div = _this.getCellDivElement(cell);\r\n                div.onclick = function () {\r\n                    //    console.log(cell.hasBall);\r\n                    if (cell.hasBall)\r\n                        return; // zwracamy, żeby nie wykonywało nic poza klikiem w kulkę\r\n                    _this.ballsController.updateBalls(div, cell);\r\n                };\r\n            });\r\n        };\r\n        this.createCells = function () {\r\n            for (var width = 0; width < _this.width; width++) {\r\n                for (var height = 0; height < _this.height; height++) {\r\n                    _this.cells.push(new _Cell__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ x: width, y: height }, 1));\r\n                }\r\n            }\r\n            // console.log(this.cells);\r\n        };\r\n        this.renderCells = function () {\r\n            for (var cellIndex = 0; cellIndex < _this.cells.length; cellIndex++) {\r\n                var cell = _this.cells[cellIndex];\r\n                _this.boardElement.appendChild(cell.toHTMLElement());\r\n            }\r\n        };\r\n        this.getCellDivElement = function (cell) {\r\n            return document.getElementById(cell.getId());\r\n        };\r\n        this.width = boardWidth;\r\n        this.height = boardHeight;\r\n        this.createCells();\r\n        this.renderCells();\r\n        this.ballsController = new _BallsController__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.cells, this.width, this.height);\r\n        this.setListeners();\r\n    }\r\n    return Board;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);\r\nvar board = new Board(9, 9);\r\n\n\n//# sourceURL=webpack:///./ts/Board.ts?");

/***/ }),

/***/ "./ts/Cell.ts":
/*!********************!*\
  !*** ./ts/Cell.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Cell = /** @class */ (function () {\r\n    function Cell(indexes, numericValue) {\r\n        var _this = this;\r\n        this.hasBall = false;\r\n        this.toHTMLElement = function () {\r\n            var div = document.createElement(\"div\");\r\n            div.id = _this.id;\r\n            div.style.width = Cell.PROPERTIES.WIDTH + \"px\";\r\n            div.style.height = Cell.PROPERTIES.HEIGHT + \"px\";\r\n            div.classList.add(Cell.PROPERTIES.CLASSNAME);\r\n            return div;\r\n        };\r\n        this.toJson = function () {\r\n            return {\r\n                x: _this.getX(),\r\n                y: _this.getY(),\r\n            };\r\n        };\r\n        this.getNumericValue = function () {\r\n            return _this.numericValue;\r\n        };\r\n        this.setNumericValue = function (value) {\r\n            _this.numericValue = value;\r\n        };\r\n        this.getDiv = function () {\r\n            return document.getElementById(_this.getId());\r\n        };\r\n        this.x = indexes.x;\r\n        this.y = indexes.y;\r\n        this.id = this.x + \"_\" + this.y;\r\n        this.numericValue = numericValue;\r\n    }\r\n    Cell.prototype.getId = function () {\r\n        return this.id;\r\n    };\r\n    Cell.prototype.setId = function (id) {\r\n        this.id = id;\r\n    };\r\n    Cell.prototype.getX = function () {\r\n        return this.x;\r\n    };\r\n    Cell.prototype.setX = function (x) {\r\n        this.x = x;\r\n    };\r\n    Cell.prototype.getY = function () {\r\n        return this.y;\r\n    };\r\n    Cell.prototype.setY = function (y) {\r\n        this.y = y;\r\n    };\r\n    Cell.PROPERTIES = {\r\n        WIDTH: 50,\r\n        HEIGHT: 50,\r\n        CLASSNAME: \"cell\"\r\n    };\r\n    return Cell;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cell);\r\n\n\n//# sourceURL=webpack:///./ts/Cell.ts?");

/***/ }),

/***/ "./ts/Pathfinder.ts":
/*!**************************!*\
  !*** ./ts/Pathfinder.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Pathfinder = /** @class */ (function () {\r\n    function Pathfinder(graph) {\r\n        var _this = this;\r\n        this.getShortestPath = function () {\r\n            var count = _this.graph.length;\r\n            var visitedVertex = []; // o dlugosci count\r\n            var distance = []; // o dlugosci count\r\n            for (var i = 0; i < count; i++) {\r\n                visitedVertex[i] = false;\r\n                distance[i] = Number.POSITIVE_INFINITY;\r\n            }\r\n            distance[_this.source] = 0;\r\n            for (var i = 0; i < count; i++) {\r\n                var minimalDistance = _this.getMinimalDistance(distance, visitedVertex);\r\n                visitedVertex[minimalDistance] = true;\r\n                for (var j = 0; j < count; j++) {\r\n                    if (!visitedVertex[j] && _this.graph[i][j] != 0 && (distance[i] + _this.graph[i][j] < distance[j])) {\r\n                        distance[j] = distance[i] + _this.graph[i][j];\r\n                    }\r\n                }\r\n            }\r\n            for (var i = 0; i < distance.length; i++) {\r\n                console.log(distance[i]);\r\n            }\r\n        };\r\n        this.getMinimalDistance = function (distance, visitedVertex) {\r\n            var minimalDistance = Number.MAX_VALUE;\r\n            var minimalDistanceVertex = -1;\r\n            for (var i = 0; i < distance.length; i++) {\r\n                if (!visitedVertex[i] && distance[i] < minimalDistance) {\r\n                    minimalDistance = distance[i];\r\n                    minimalDistanceVertex = i;\r\n                }\r\n            }\r\n            return minimalDistanceVertex;\r\n        };\r\n        this.graph = graph;\r\n        console.log(this.graph.length);\r\n    }\r\n    return Pathfinder;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pathfinder);\r\n/*export default class Pathfinder {\r\n    static COLLISION_VALUE = -1;\r\n    private table: number[][];\r\n    private helperArray: Point[] = [];\r\n    constructor(table: number[][]) {\r\n        this.table = table;\r\n    }\r\n\r\n    findPath = (startPoint: Indexes, weight: number, endPoint: Indexes) => {\r\n        // mamy punkt\r\n        const point = new Point(startPoint);\r\n        // sprawdzamy, czy obok jest wolne pole\r\n        const newPoint = this.getRandomNeighborPoint(point);\r\n\r\n        this.helperArray.push(newPoint);\r\n        if (this.getPointValue(newPoint) > 1 + this.getPointValue(point)) {\r\n        }\r\n\r\n        this.setPointValue(newPoint, this.getPointValue(point));\r\n\r\n        console.log(this.table);\r\n\r\n        // jeśli jest wolny, wybieramy go jako następny punkt\r\n        // jeśli nie, wybieramy kolejny\r\n        // sprawdzamy, czy punkt był sprawdzany\r\n        // sprawdzamy czy jest w obrębie tablicy\r\n        if (this.compare(newPoint, new Point(endPoint))) {\r\n            return;\r\n        }\r\n    }\r\n\r\n    getRandomNeighborPoint = (point: Point) => {\r\n        const newPoint = new Point(point);\r\n        const randomAxis = Math.random();\r\n        const randomDirection = Math.random();\r\n\r\n        if (randomAxis < 0.5)\r\n            if (randomDirection < 0.5)\r\n                newPoint.x++;\r\n            else\r\n                newPoint.x--;\r\n        else\r\n            if (randomDirection < 0.5)\r\n                newPoint.y++;\r\n            else\r\n                newPoint.y--;\r\n\r\n        // sprawdzenie, czy jest w granicach tablicy\r\n        if (!this.checkBoundaries(newPoint) ||\r\n            // sprawdzenie, czy juz przez niego przechodziliśmy\r\n            this.wasChecked(newPoint) ||\r\n            // sprawdzenie, czy nie ma tam przypadkiem kulki (-1 w tablicy)\r\n            this.getPointValue(newPoint) === Pathfinder.COLLISION_VALUE)\r\n            return this.getRandomNeighborPoint(point);\r\n\r\n        return newPoint;\r\n    }\r\n\r\n    checkBoundaries = (point: Point) => {\r\n        return (point.x < this.table.length && point.x >= 0 && point.y < this.table[0].length && point.y >= 0)\r\n    }\r\n\r\n    wasChecked = (checkedPoint: Point) => {\r\n        if (this.helperArray.find((point: Point) => { point.x === checkedPoint.x && point.y === checkedPoint.y }))\r\n            return true;\r\n        return false;\r\n    }\r\n\r\n    compare = (point: Point, point2: Point) => {\r\n        return point.x === point2.x && point.y === point2.y;\r\n    }\r\n\r\n    getPointValue = (point: Point) => {\r\n        return this.table[point.x][point.y];\r\n    }\r\n\r\n    setPointValue = (point: Point, value: number) => {\r\n        this.table[point.x][point.y] = value + 1;\r\n    }\r\n}*/ \r\n\n\n//# sourceURL=webpack:///./ts/Pathfinder.ts?");

/***/ }),

/***/ "./ts/Preview.ts":
/*!***********************!*\
  !*** ./ts/Preview.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Preview = /** @class */ (function () {\r\n    function Preview() {\r\n        var _this = this;\r\n        this.previewedBalls = [];\r\n        this.renderPreview = function () {\r\n            _this.previewedBalls.forEach(function (ball, index) {\r\n                // console.log(ball);\r\n                var div = _this.previewElement.children[index];\r\n                div.innerHTML = '';\r\n                div.appendChild(ball.toHTMLElement());\r\n            });\r\n        };\r\n        this.changePreview = function (balls) {\r\n            _this.previewedBalls = balls;\r\n            _this.renderPreview();\r\n        };\r\n        this.previewElement = document.getElementById(\"preview\");\r\n    }\r\n    return Preview;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Preview);\r\n\n\n//# sourceURL=webpack:///./ts/Preview.ts?");

/***/ }),

/***/ "./ts/generateRandomNumber.ts":
/*!************************************!*\
  !*** ./ts/generateRandomNumber.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar generateRandomNumber = function (maxNumber, minNumber) {\r\n    return Math.floor(Math.random() * maxNumber) + minNumber;\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateRandomNumber);\r\n\n\n//# sourceURL=webpack:///./ts/generateRandomNumber.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/Board.ts");
/******/ 	
/******/ })()
;