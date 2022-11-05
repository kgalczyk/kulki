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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"./ts/Cell.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Ball = /** @class */ (function (_super) {\r\n    __extends(Ball, _super);\r\n    function Ball(indexes) {\r\n        var _this = _super.call(this, indexes) || this;\r\n        _this.STATE = false;\r\n        _this.changeSize = function (div) {\r\n            div.style.width = (_this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.WIDTH) + \"px\";\r\n            div.style.height = (_this.STATE ? Ball.PROPERTIES.EMBIGGEN_SIZE : Ball.PROPERTIES.HEIGHT) + \"px\";\r\n        };\r\n        _this.toHTMLElement = function () {\r\n            var div = document.createElement(\"div\");\r\n            div.style.width = Ball.PROPERTIES.WIDTH + \"px\";\r\n            div.style.height = Ball.PROPERTIES.HEIGHT + \"px\";\r\n            div.style.backgroundColor = _this.color;\r\n            div.style.border = \"1px solid black\";\r\n            div.classList.add(Ball.PROPERTIES.CLASSNAME);\r\n            div.onclick = function () {\r\n                _this.STATE = !_this.STATE;\r\n                _this.changeSize(div);\r\n            };\r\n            return div;\r\n        };\r\n        _this.color = Ball.PROPERTIES.COLOR[Math.floor(Math.random() * Ball.PROPERTIES.COLOR.length)];\r\n        return _this;\r\n    }\r\n    Ball.PROPERTIES = {\r\n        WIDTH: 25,\r\n        HEIGHT: 25,\r\n        EMBIGGEN_SIZE: 40,\r\n        CLASSNAME: \"ball\",\r\n        COLOR: ['black', 'purple', 'red', 'yellow', 'green', 'white', 'orange'],\r\n    };\r\n    return Ball;\r\n}(_Cell__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);\r\n\n\n//# sourceURL=webpack:///./ts/Ball.ts?");

/***/ }),

/***/ "./ts/BallsController.ts":
/*!*******************************!*\
  !*** ./ts/BallsController.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./ts/Ball.ts\");\n/* harmony import */ var _generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateRandomNumber */ \"./ts/generateRandomNumber.ts\");\n\r\n\r\nvar BallsController = /** @class */ (function () {\r\n    function BallsController(cells) {\r\n        var _this = this;\r\n        this.balls = [];\r\n        this.cells = [];\r\n        this.cellsNumericArray = [];\r\n        this.renderBalls = function () {\r\n            console.log(\"render kulek\", _this.balls);\r\n            _this.balls.forEach(function (ball) {\r\n                var cell = _this.cells.find(function (cell) {\r\n                    if (cell.getX() === ball.getX() &&\r\n                        cell.getY() === ball.getY())\r\n                        return cell;\r\n                });\r\n                console.log(\"złapana komórka:\", cell);\r\n                if (cell != undefined)\r\n                    document.getElementById(cell.getId()).appendChild(ball.toHTMLElement());\r\n            });\r\n        };\r\n        this.generateRandomBall = function () {\r\n            _this.balls.push(new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n                x: (0,_generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10, 0),\r\n                y: (0,_generateRandomNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10, 0)\r\n            }));\r\n        };\r\n        this.updateNumericArray = function (value, indexes) {\r\n            _this.cellsNumericArray[indexes.x * indexes.y - 1] = value;\r\n        };\r\n        this.getNumericArray = function () {\r\n            return _this.cellsNumericArray;\r\n        };\r\n        this.cells = cells;\r\n        this.cellsNumericArray = this.cells.map(function (cell) { return cell.getNumericValue(); });\r\n    }\r\n    return BallsController;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BallsController);\r\n\n\n//# sourceURL=webpack:///./ts/BallsController.ts?");

/***/ }),

/***/ "./ts/Board.ts":
/*!*********************!*\
  !*** ./ts/Board.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _BallsController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BallsController */ \"./ts/BallsController.ts\");\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ \"./ts/Cell.ts\");\n\r\n\r\nvar Board = /** @class */ (function () {\r\n    function Board(boardWidth, boardHeight) {\r\n        var _this = this;\r\n        this.boardElement = document.getElementById(\"board\");\r\n        this.cells = [];\r\n        this.createCells = function () {\r\n            for (var width = 0; width < _this.width; width++) {\r\n                for (var height = 0; height < _this.height; height++) {\r\n                    _this.cells.push(new _Cell__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ x: width, y: height }, 0));\r\n                }\r\n            }\r\n            // console.log(this.cells);\r\n        };\r\n        this.renderCells = function () {\r\n            for (var cellIndex = 0; cellIndex < _this.cells.length; cellIndex++) {\r\n                var cell = _this.cells[cellIndex];\r\n                _this.boardElement.appendChild(cell.toHTMLElement());\r\n            }\r\n        };\r\n        this.width = boardWidth;\r\n        this.height = boardHeight;\r\n        this.createCells();\r\n        this.renderCells();\r\n        this.ballsController = new _BallsController__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.cells);\r\n        this.ballsController.generateRandomBall();\r\n        this.ballsController.renderBalls();\r\n    }\r\n    return Board;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);\r\nvar board = new Board(9, 9);\r\n\n\n//# sourceURL=webpack:///./ts/Board.ts?");

/***/ }),

/***/ "./ts/Cell.ts":
/*!********************!*\
  !*** ./ts/Cell.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Cell = /** @class */ (function () {\r\n    function Cell(indexes, numericValue) {\r\n        var _this = this;\r\n        this.toHTMLElement = function () {\r\n            var div = document.createElement(\"div\");\r\n            div.id = _this.id;\r\n            div.style.width = Cell.PROPERTIES.WIDTH + \"px\";\r\n            div.style.height = Cell.PROPERTIES.HEIGHT + \"px\";\r\n            div.classList.add(Cell.PROPERTIES.CLASSNAME);\r\n            return div;\r\n        };\r\n        this.toJson = function () {\r\n            return {\r\n                x: _this.getX(),\r\n                y: _this.getY(),\r\n            };\r\n        };\r\n        this.getNumericValue = function () {\r\n            return _this.numericValue;\r\n        };\r\n        this.setNumericValue = function (value) {\r\n            _this.numericValue = value;\r\n        };\r\n        this.x = indexes.x;\r\n        this.y = indexes.y;\r\n        this.id = this.x + \"_\" + this.y;\r\n        this.numericValue = numericValue;\r\n    }\r\n    Cell.prototype.getId = function () {\r\n        return this.id;\r\n    };\r\n    Cell.prototype.getX = function () {\r\n        return this.x;\r\n    };\r\n    Cell.prototype.setX = function (x) {\r\n        this.x = x;\r\n    };\r\n    Cell.prototype.getY = function () {\r\n        return this.y;\r\n    };\r\n    Cell.prototype.setY = function (y) {\r\n        this.y = y;\r\n    };\r\n    Cell.PROPERTIES = {\r\n        WIDTH: 50,\r\n        HEIGHT: 50,\r\n        CLASSNAME: \"cell\"\r\n    };\r\n    return Cell;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cell);\r\n\n\n//# sourceURL=webpack:///./ts/Cell.ts?");

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