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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ball)\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"./ts/Cell.ts\");\n\r\nclass Ball extends _Cell__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor(indexes, balls, toPreview) {\r\n        super(indexes);\r\n        this.STATE = false;\r\n        this.isPreviewed = false;\r\n        this.changeSize = (div) => {\r\n            div.style.width = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.WIDTH) + \"px\";\r\n            div.style.height = (this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.HEIGHT) + \"px\";\r\n        };\r\n        this.toHTMLElement = () => {\r\n            this.parentDiv = document.getElementById(this.getId());\r\n            const div = document.createElement(\"div\");\r\n            div.style.width = Ball.PROPERTIES.WIDTH + \"px\";\r\n            div.style.height = Ball.PROPERTIES.HEIGHT + \"px\";\r\n            div.style.backgroundColor = this.color;\r\n            div.style.border = \"1px solid black\";\r\n            div.classList.add(Ball.PROPERTIES.CLASSNAME);\r\n            this.div = div;\r\n            div.onclick = () => {\r\n                if (this.isPreviewed)\r\n                    return;\r\n                const selectedBall = this.getBalls().find(ball => ball.getState() == true);\r\n                if (selectedBall && selectedBall.getId() != this.getId()) {\r\n                    selectedBall.setState(false);\r\n                    selectedBall.changeSize(selectedBall.getDiv());\r\n                }\r\n                this.STATE = !this.STATE;\r\n                this.changeSize(div);\r\n            };\r\n            return div;\r\n        };\r\n        this.getState = () => {\r\n            return this.STATE;\r\n        };\r\n        this.setState = (bool) => {\r\n            this.STATE = bool;\r\n        };\r\n        this.getDiv = () => {\r\n            return this.div;\r\n        };\r\n        this.setBalls = (balls) => {\r\n            this.balls = balls;\r\n        };\r\n        this.getBalls = () => { return this.balls; };\r\n        this.isPreviewed = toPreview;\r\n        this.balls = balls;\r\n        this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];\r\n    }\r\n    getParentDiv() {\r\n        return this.parentDiv;\r\n    }\r\n    setParentDiv(div) {\r\n        this.parentDiv = div;\r\n    }\r\n    getColor() {\r\n        return this.color;\r\n    }\r\n    setColor(color) {\r\n        this.color = color;\r\n    }\r\n}\r\nBall.PROPERTIES = {\r\n    WIDTH: 25,\r\n    HEIGHT: 25,\r\n    EMBIGGEN_SIZE: 40,\r\n    CLASSNAME: \"ball\",\r\n    COLOR: ['blue', 'purple', 'red', 'yellow', 'green', 'white', 'orange'],\r\n};\r\n\n\n//# sourceURL=webpack:///./ts/Ball.ts?");

/***/ }),

/***/ "./ts/BallsController.ts":
/*!*******************************!*\
  !*** ./ts/BallsController.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BallsController)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./ts/Ball.ts\");\n/* harmony import */ var _generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateRandomNumber */ \"./ts/generateRandomNumber.ts\");\n/* harmony import */ var _Preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Preview */ \"./ts/Preview.ts\");\n\r\n\r\n\r\nclass BallsController {\r\n    constructor(cells, width, height) {\r\n        this.balls = [];\r\n        this.cells = [];\r\n        this.numericCellsArray = [];\r\n        this.preview = new _Preview__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n        this.AMOUNT_OF_PREVIEWED_BALLS = 3;\r\n        this.createNumericCellsArray = () => {\r\n            for (let width = 0; width < this.width; width++) {\r\n                this.numericCellsArray.push([]);\r\n                for (let height = 0; height < this.height; height++) {\r\n                    this.numericCellsArray[width][height] = this.cells[width * height + width].getNumericValue(); //\r\n                }\r\n            }\r\n        };\r\n        this.renderBalls = () => {\r\n            console.log(`render ${this.balls.length} kulek`);\r\n            this.balls.forEach((ball) => {\r\n                const cell = this.cells.find((cell) => {\r\n                    if (cell.getX() === ball.getX() &&\r\n                        cell.getY() === ball.getY()) {\r\n                        cell.hasBall = true;\r\n                        ball.isPreviewed = false;\r\n                        return cell;\r\n                    }\r\n                });\r\n                if (!cell)\r\n                    return;\r\n                const cellElement = document.getElementById(cell.getId());\r\n                cellElement.innerHTML = '';\r\n                cellElement.appendChild(ball.toHTMLElement());\r\n                this.updateNumericArray(-1, { x: cell.getX(), y: cell.getY() });\r\n            });\r\n        };\r\n        this.generateRandomBall = (toPreview) => {\r\n            const ball = new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ x: (0,_generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.width, 0), y: (0,_generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.height, 0) }, this.balls, toPreview);\r\n            ball.getBalls = () => { return this.getBalls(); };\r\n            return ball;\r\n        };\r\n        this.changePreview = () => {\r\n            const previewedBalls = this.getPreviewedBalls(true);\r\n            this.preview.changePreview(previewedBalls);\r\n            this.balls.push(...previewedBalls);\r\n        };\r\n        this.getPreviewedBalls = (toPreview) => {\r\n            const balls = [];\r\n            for (let i = 0; i < this.AMOUNT_OF_PREVIEWED_BALLS; i++) {\r\n                let ball = this.generateRandomBall(toPreview);\r\n                while (!this.cells.find(cell => cell.hasBall == false && cell.getId() == ball.getId()))\r\n                    ball = this.generateRandomBall(toPreview);\r\n                balls.push(ball);\r\n            }\r\n            return balls;\r\n        };\r\n        this.updateBalls = (div, cell) => {\r\n            const selectedBall = this.balls.find(ball => ball.getState() == true); // znajdujemy wybraną kulkę\r\n            if (!selectedBall)\r\n                return;\r\n            const selectedCell = this.cells.find(cell => cell.getId() == selectedBall.getId());\r\n            selectedBall.getParentDiv().innerHTML = '';\r\n            selectedCell.hasBall = false;\r\n            const newBall = new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ x: cell.getX(), y: cell.getY() }, this.balls, false);\r\n            newBall.setColor(selectedBall.getColor());\r\n            newBall.setParentDiv(div);\r\n            this.balls = this.balls.filter(ball => ball.getId() != selectedBall.getId());\r\n            this.balls.push(newBall);\r\n            this.renderBalls();\r\n            this.changePreview();\r\n        };\r\n        this.updateNumericArray = (value, indexes) => {\r\n            this.numericCellsArray[indexes.x][indexes.y] = value;\r\n        };\r\n        this.getNumericArray = () => {\r\n            return this.numericCellsArray;\r\n        };\r\n        this.getBalls = () => {\r\n            return this.balls;\r\n        };\r\n        this.setBalls = (balls) => {\r\n            this.balls = balls;\r\n        };\r\n        this.lose = () => {\r\n            if (this.balls.length == this.width * this.height)\r\n                alert(\"przegrana\");\r\n        };\r\n        this.width = width;\r\n        this.height = height;\r\n        this.cells = cells;\r\n        this.balls = this.getPreviewedBalls(false);\r\n        this.numericCellsArrayElement = document.getElementById(\"numeric-array\");\r\n        this.createNumericCellsArray();\r\n        // this.pathFinder = new Pathfinder(this.numericCellsArray);\r\n        this.renderBalls();\r\n        this.changePreview();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/BallsController.ts?");

/***/ }),

/***/ "./ts/Board.ts":
/*!*********************!*\
  !*** ./ts/Board.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _BallsController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BallsController */ \"./ts/BallsController.ts\");\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ \"./ts/Cell.ts\");\n/* harmony import */ var _Pathfinder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pathfinder */ \"./ts/Pathfinder.ts\");\n\r\n\r\n\r\nclass Board {\r\n    constructor(boardWidth, boardHeight) {\r\n        this.boardElement = document.getElementById(\"board\");\r\n        this.cells = [];\r\n        this.setListeners = () => {\r\n            this.cells.forEach((cell) => {\r\n                const div = this.getCellDivElement(cell);\r\n                div.onclick = () => {\r\n                    //    console.log(cell.hasBall);\r\n                    this.path = [];\r\n                    this.pathFinder.colorDivs(this.path);\r\n                    if (cell.hasBall)\r\n                        return; // zwracamy, żeby nie wykonywało nic poza klikiem w kulkę\r\n                    this.ballsController.updateBalls(div, cell);\r\n                };\r\n            });\r\n            this.boardElement.onmousemove = (event) => {\r\n                const target = event.target;\r\n                const cell = this.cells.find(cell => { if (cell.getId() == target.id)\r\n                    return cell; });\r\n                if (cell)\r\n                    this.ballsController.hoveredIndexes = cell.toJson();\r\n                const selectedBall = this.ballsController.getBalls().find(ball => ball.getState() == true); // znajdujemy wybraną kulkę\r\n                this.path = [];\r\n                if (!selectedBall) {\r\n                    this.clearCellColors();\r\n                    return;\r\n                }\r\n                ;\r\n                this.path = this.pathFinder.findShortestPath({ x: selectedBall.getX(), y: selectedBall.getY() }, this.ballsController.hoveredIndexes);\r\n                this.cells.forEach(cell => this.ballsController.updateNumericArray(cell.hasBall ? -1 : 1, { x: cell.getX(), y: cell.getY() }));\r\n            };\r\n        };\r\n        this.createCells = () => {\r\n            for (let width = 0; width < this.width; width++) {\r\n                for (let height = 0; height < this.height; height++) {\r\n                    this.cells.push(new _Cell__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ x: width, y: height }, 1));\r\n                }\r\n            }\r\n            // console.log(this.cells);\r\n        };\r\n        this.renderCells = () => {\r\n            for (let cellIndex = 0; cellIndex < this.cells.length; cellIndex++) {\r\n                const cell = this.cells[cellIndex];\r\n                this.boardElement.appendChild(cell.toHTMLElement());\r\n            }\r\n        };\r\n        this.clearCellColors = () => {\r\n            this.cells.forEach(cell => { document.getElementById(cell.getId()).style.backgroundColor = \"white\"; });\r\n        };\r\n        this.getCellDivElement = (cell) => {\r\n            return document.getElementById(cell.getId());\r\n        };\r\n        this.width = boardWidth;\r\n        this.height = boardHeight;\r\n        this.createCells();\r\n        this.renderCells();\r\n        this.ballsController = new _BallsController__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.cells, this.width, this.height);\r\n        this.setListeners();\r\n        this.pathFinder = new _Pathfinder__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ballsController.getNumericArray());\r\n    }\r\n}\r\nconst board = new Board(9, 9);\r\n\n\n//# sourceURL=webpack:///./ts/Board.ts?");

/***/ }),

/***/ "./ts/Cell.ts":
/*!********************!*\
  !*** ./ts/Cell.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cell)\n/* harmony export */ });\nclass Cell {\r\n    constructor(indexes, numericValue) {\r\n        this.hasBall = false;\r\n        this.toHTMLElement = () => {\r\n            const div = document.createElement(\"div\");\r\n            div.id = this.id;\r\n            div.style.width = Cell.PROPERTIES.WIDTH + \"px\";\r\n            div.style.height = Cell.PROPERTIES.HEIGHT + \"px\";\r\n            div.classList.add(Cell.PROPERTIES.CLASSNAME);\r\n            return div;\r\n        };\r\n        this.toJson = () => {\r\n            return {\r\n                x: this.getX(),\r\n                y: this.getY(),\r\n            };\r\n        };\r\n        this.getNumericValue = () => {\r\n            return this.numericValue;\r\n        };\r\n        this.setNumericValue = (value) => {\r\n            this.numericValue = value;\r\n        };\r\n        this.getDiv = () => {\r\n            return document.getElementById(this.getId());\r\n        };\r\n        this.x = indexes.x;\r\n        this.y = indexes.y;\r\n        this.id = this.x + \"_\" + this.y;\r\n        this.numericValue = numericValue;\r\n    }\r\n    getId() {\r\n        return this.id;\r\n    }\r\n    setId(id) {\r\n        this.id = id;\r\n    }\r\n    getX() {\r\n        return this.x;\r\n    }\r\n    setX(x) {\r\n        this.x = x;\r\n    }\r\n    getY() {\r\n        return this.y;\r\n    }\r\n    setY(y) {\r\n        this.y = y;\r\n    }\r\n}\r\nCell.PROPERTIES = {\r\n    WIDTH: 50,\r\n    HEIGHT: 50,\r\n    CLASSNAME: \"cell\"\r\n};\r\n\n\n//# sourceURL=webpack:///./ts/Cell.ts?");

/***/ }),

/***/ "./ts/Pathfinder.ts":
/*!**************************!*\
  !*** ./ts/Pathfinder.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Pathfinder)\n/* harmony export */ });\nclass Node {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.visited = false;\r\n        this.path = [];\r\n    }\r\n    ;\r\n}\r\nclass Pathfinder {\r\n    constructor(graph) {\r\n        this.nodes = [];\r\n        this.visitedNodes = [];\r\n        this.xDirections = [-1, 0, 1, 0];\r\n        this.yDirections = [0, 1, 0, -1];\r\n        this.clearNodes = () => {\r\n            for (let i = 0; i < this.graph.length; i++) {\r\n                for (let j = 0; j < this.graph.length; j++) {\r\n                    const node = this.nodes[i][j];\r\n                    node.visited = false;\r\n                    node.path = [];\r\n                    // this.findNeighbors(this.nodes[i][j]);\r\n                    if (this.graph[i][j] == -1)\r\n                        this.nodes[i][j].numericValue = -1;\r\n                    else\r\n                        this.nodes[i][j].numericValue = 0;\r\n                }\r\n            }\r\n        };\r\n        this.findShortestPath = (sourceIndexes, endIndexes) => {\r\n            const { x, y } = sourceIndexes;\r\n            this.sourceIndexes = sourceIndexes;\r\n            this.endIndexes = endIndexes;\r\n            let startNode = this.nodes[x][y];\r\n            startNode.parent = startNode;\r\n            startNode.visited = true;\r\n            if (x == endIndexes.x && y == endIndexes.y)\r\n                return [];\r\n            this.visitedNodes = [];\r\n            this.queue = [];\r\n            this.queue.push(startNode);\r\n            while (this.queue.length > 0) {\r\n                let currentNode = this.queue[0];\r\n                this.visitNode(currentNode);\r\n                this.queue.shift();\r\n                if (currentNode.x == endIndexes.x && currentNode.y == endIndexes.y) {\r\n                    currentNode.path.push({ x: currentNode.x, y: currentNode.y });\r\n                    this.colorDivs(currentNode.path);\r\n                    return currentNode.path;\r\n                }\r\n                ;\r\n                for (let i = 0; i < this.xDirections.length; i++) {\r\n                    let adjacentX = currentNode.x + this.xDirections[i];\r\n                    let adjacentY = currentNode.y + this.yDirections[i];\r\n                    if (this.isValid(adjacentX, adjacentY)) {\r\n                        this.queue.push(this.nodes[adjacentX][adjacentY]);\r\n                        this.nodes[adjacentX][adjacentY].parent = currentNode;\r\n                    }\r\n                }\r\n            }\r\n            this.colorDivs(this.nodes[endIndexes.x][endIndexes.y].path);\r\n            this.clearNodes();\r\n            return [];\r\n        };\r\n        this.visitNode = (node) => {\r\n            let x = node.x;\r\n            let y = node.y;\r\n            let parent = node.parent;\r\n            if (parent.x == x && parent.y == y)\r\n                return;\r\n            if (node.visited)\r\n                return;\r\n            node.visited = true;\r\n            this.visitedNodes.push(x + \"_\" + y);\r\n            let path = parent.path;\r\n            // console.log(\"ścieżka parenta:\", path);\r\n            // do ścieżki poprzednika dorzucamy jego indeksy indeksy \r\n            path.push({ x: parent.x, y: parent.y });\r\n            node.path.push(...path);\r\n        };\r\n        this.colorDivs = (path) => {\r\n            for (let x = 0; x < this.graph.length; x++) {\r\n                for (let y = 0; y < this.graph.length; y++) {\r\n                    const div = document.getElementById(x + \"_\" + y);\r\n                    div.style.backgroundColor = \"white\";\r\n                    let index = path.find((elem) => { return elem.x == x && elem.y == y; });\r\n                    if (index)\r\n                        div.style.backgroundColor = \"red\";\r\n                }\r\n            }\r\n            // for (let x = 0; x < this.graph.length; x++) {\r\n            //     for (let y = 0; y < this.graph.length; y++) {\r\n            //         const div = document.getElementById(x + \"_\" + y);\r\n            //         let visited = this.visitedNodes.find(node => node == x + \"_\" + y);\r\n            //         if (visited) div.style.backgroundColor = \"green\";\r\n            //         let index = path.find((elem) => { return elem.x == x && elem.y == y });\r\n            //         if (index) div.style.backgroundColor = \"red\";\r\n            //     }\r\n            // }\r\n        };\r\n        this.isValid = (x, y) => {\r\n            if (x < 0 || y < 0 || x >= this.graph.length || y >= this.graph[0].length)\r\n                return false;\r\n            if (this.nodes[x][y].visited)\r\n                return false;\r\n            if (this.nodes[x][y].numericValue == -1)\r\n                return false;\r\n            return true;\r\n        };\r\n        this.graph = graph;\r\n        this.nodes = [];\r\n        this.queue = [];\r\n        for (let i = 0; i < this.graph.length; i++) {\r\n            this.nodes[i] = [];\r\n            for (let j = 0; j < this.graph.length; j++) {\r\n                this.nodes[i][j] = new Node(i, j);\r\n                // this.findNeighbors(this.nodes[i][j]);\r\n                if (this.graph[i][j] == -1)\r\n                    this.nodes[i][j].numericValue = -1;\r\n                else\r\n                    this.nodes[i][j].numericValue = 0;\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/Pathfinder.ts?");

/***/ }),

/***/ "./ts/Preview.ts":
/*!***********************!*\
  !*** ./ts/Preview.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Preview)\n/* harmony export */ });\nclass Preview {\r\n    constructor() {\r\n        this.previewedBalls = [];\r\n        this.renderPreview = () => {\r\n            this.previewedBalls.forEach((ball, index) => {\r\n                // console.log(ball);\r\n                const div = this.previewElement.children[index];\r\n                div.innerHTML = '';\r\n                div.appendChild(ball.toHTMLElement());\r\n            });\r\n        };\r\n        this.changePreview = (balls) => {\r\n            this.previewedBalls = balls;\r\n            this.renderPreview();\r\n        };\r\n        this.previewElement = document.getElementById(\"preview\");\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./ts/Preview.ts?");

/***/ }),

/***/ "./ts/generateRandomNumber.ts":
/*!************************************!*\
  !*** ./ts/generateRandomNumber.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst generateRandomNumber = (maxNumber, minNumber) => {\r\n    return Math.floor(Math.random() * maxNumber) + minNumber;\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateRandomNumber);\r\n\n\n//# sourceURL=webpack:///./ts/generateRandomNumber.ts?");

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