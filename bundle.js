(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var gbl_1 = require("./gbl");
var matchColor_1 = require("./matchColor");

var Actor = function (_Phaser$Sprite) {
    _inherits(Actor, _Phaser$Sprite);

    function Actor(game, sheet) {
        _classCallCheck(this, Actor);

        var _this = _possibleConstructorReturn(this, (Actor.__proto__ || Object.getPrototypeOf(Actor)).call(this, game, 0, 0));

        _this._sheet = sheet;
        _this.loadTexture(_this._sheet);
        _this.gridPosition = new Phaser.Point();
        _this.anchor.set(0.5);
        game.add.existing(_this);
        return _this;
    }

    _createClass(Actor, [{
        key: "init",
        value: function init(x, y, color, actorType, sprite) {
            this.updatePosition(x, y);
            this.color = color;
            this.actoryType = actorType;
            this.updateFrame(sprite);
        }
    }, {
        key: "updatePosition",
        value: function updatePosition(x, y) {
            this.gridPosition.x = x;
            this.gridPosition.y = y;
            var worldPos = gbl_1.Gbl.gridToWorld(x, y);
            this.x = worldPos.x;
            this.y = worldPos.y;
        }
    }, {
        key: "updateFrame",
        value: function updateFrame(sprite) {
            this.frameName = this._getColorString(sprite);
        }
    }, {
        key: "_getColorString",
        value: function _getColorString(name) {
            var stringName = name;
            switch (this.color) {
                case matchColor_1.MatchColor.BLUE:
                    stringName += '_blue';
                    break;
                case matchColor_1.MatchColor.GREEN:
                    stringName += '_green';
                    break;
                case matchColor_1.MatchColor.RED:
                    stringName += '_red';
                    break;
                case matchColor_1.MatchColor.YELLOW:
                    stringName += '_yellow';
                    break;
            }
            return stringName;
        }
    }]);

    return Actor;
}(Phaser.Sprite);

exports.Actor = Actor;

},{"./gbl":3,"./matchColor":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActorType;
(function (ActorType) {
    ActorType[ActorType["HEAD"] = 0] = "HEAD";
    ActorType[ActorType["BODY"] = 1] = "BODY";
    ActorType[ActorType["TARGET"] = 2] = "TARGET";
})(ActorType = exports.ActorType || (exports.ActorType = {})); // ActorType

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Gbl = function () {
    function Gbl() {
        _classCallCheck(this, Gbl);
    }

    _createClass(Gbl, null, [{
        key: "init",
        value: function init(gridWidth, gridHeight, center) {
            Gbl.gridWidth = gridWidth;
            Gbl.gridHeight = gridHeight;
            Gbl._minX = center.x - gridWidth * Gbl.TILESIZE * 0.5 + Gbl.TILESIZE * 0.5;
            Gbl._minY = center.y - gridHeight * Gbl.TILESIZE * 0.5 + Gbl.TILESIZE * 0.5;
        } // init

    }, {
        key: "gridToWorld",
        value: function gridToWorld(x, y) {
            return new Phaser.Point(Gbl._minX + x * Gbl.TILESIZE, Gbl._minY + y * Gbl.TILESIZE);
        } // gridToWorld

    }, {
        key: "worldToGrid",
        value: function worldToGrid(x, y) {
            return new Phaser.Point(Math.floor((x - Gbl._minX) / Gbl.TILESIZE), Math.floor((y - Gbl._minY) / Gbl.TILESIZE));
        } // worldToGrid

    }]);

    return Gbl;
}(); // Gbl


Gbl.TILESIZE = 24;
exports.Gbl = Gbl;

},{}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var bootState_1 = require("./states/bootState");
var gameState_1 = require("./states/gameState");
var preloadState_1 = require("./states/preloadState");

var Main = function (_Phaser$Game) {
    _inherits(Main, _Phaser$Game);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, 800, 600, Phaser.AUTO, 'container'));

        _this.state.add('boot', bootState_1.BootState);
        _this.state.add('preload', preloadState_1.PreloadState);
        _this.state.add('game', gameState_1.GameState);
        _this.state.start('boot');
        return _this;
    } // constructor


    return Main;
}(Phaser.Game); // Main


window.onload = function () {
    new Main();
};

},{"./states/bootState":7,"./states/gameState":8,"./states/preloadState":9}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MatchColor;
(function (MatchColor) {
    MatchColor[MatchColor["BLUE"] = 0] = "BLUE";
    MatchColor[MatchColor["GREEN"] = 1] = "GREEN";
    MatchColor[MatchColor["RED"] = 2] = "RED";
    MatchColor[MatchColor["YELLOW"] = 3] = "YELLOW";
    MatchColor[MatchColor["NONE"] = 4] = "NONE";
})(MatchColor = exports.MatchColor || (exports.MatchColor = {})); // MatchColor

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var actorType_1 = require("./actorType");

var Snake = function () {
    function Snake(state, x, y, length) {
        var prevBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        _classCallCheck(this, Snake);

        this.alive = true;
        this.ZERO = new Phaser.Point(0, 0);
        this._state = state;
        this.body = [];
        this.currentDirection = new Phaser.Point(0, 1);
        if (prevBody) {
            this.body = prevBody;
            this.updateSprites();
        } else {
            for (var i = 0; i < length; i++) {
                var part = state.actorGroup.getFirstExists(false);
                part.reset(0, 0);
                var color = this._getRndColor();
                if (i === 0) {
                    part.init(x, y - i, color, actorType_1.ActorType.HEAD, 'head_end');
                    part.angle = 180;
                } else if (i === length - 1) {
                    part.init(x, y - i, color, actorType_1.ActorType.BODY, 'body_end');
                } else {
                    part.init(x, y - i, color, actorType_1.ActorType.BODY, 'body_middle');
                }
                this.body.push(part);
            }
        }
    } // constructor


    _createClass(Snake, [{
        key: "updateSnake",
        value: function updateSnake(newDirection) {
            if (this.validDirection(newDirection)) {
                this.currentDirection.set(newDirection.x, newDirection.y);
            }
            var oldPos = new Phaser.Point();
            var newPos = Phaser.Point.add(this.body[0].gridPosition, this.currentDirection);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var part = _step.value;

                    oldPos.x = part.gridPosition.x;
                    oldPos.y = part.gridPosition.y;
                    part.updatePosition(newPos.x, newPos.y);
                    newPos.x = oldPos.x;
                    newPos.y = oldPos.y;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.updateSprites();
        } // updateSnake

    }, {
        key: "hit",
        value: function hit(x, y) {
            var hit = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var part = _step2.value;

                    if (part.gridPosition.x === x && part.gridPosition.y === y) {
                        hit = true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return hit;
        } // hit

    }, {
        key: "updateSprites",
        value: function updateSprites() {
            for (var i = 0; i < this.body.length; i++) {
                var part = this.body[i];
                this._setSprite(i, part);
            }
        } // updateSprites

    }, {
        key: "moveDown",
        value: function moveDown() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.body[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var part = _step3.value;

                    part.updatePosition(part.gridPosition.x, part.gridPosition.y + 1);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        } // moveDown

    }, {
        key: "validDirection",
        value: function validDirection(direction) {
            return !Phaser.Point.add(this.currentDirection, direction).equals(this.ZERO);
        } // _validDirection

    }, {
        key: "_setSprite",
        value: function _setSprite(index, part) {
            var pos = this.body[index].gridPosition;
            var nextPos = void 0;
            var prevPos = void 0;
            if (index === 0) {
                if (this.body.length === 1) {
                    if (part.actoryType === actorType_1.ActorType.HEAD) {
                        part.updateFrame('head_single');
                    } else {
                        part.updateFrame('body_single');
                    }
                } else {
                    nextPos = this.body[index + 1].gridPosition;
                    if (part.actoryType === actorType_1.ActorType.HEAD) {
                        part.updateFrame('head_end');
                    } else {
                        part.updateFrame('body_end');
                    }
                    if (nextPos.x > pos.x) {
                        part.angle = 270;
                    } else if (nextPos.x < pos.x) {
                        part.angle = 90;
                    } else if (nextPos.y > pos.y) {
                        part.angle = 0;
                    } else if (nextPos.y < pos.y) {
                        part.angle = 180;
                    }
                }
            } else if (index === this.body.length - 1) {
                prevPos = this.body[index - 1].gridPosition;
                part.updateFrame('body_end');
                if (prevPos.x > pos.x) {
                    part.angle = 270;
                } else if (prevPos.x < pos.x) {
                    part.angle = 90;
                } else if (prevPos.y > pos.y) {
                    part.angle = 0;
                } else if (prevPos.y < pos.y) {
                    part.angle = 180;
                }
            } else {
                nextPos = this.body[index + 1].gridPosition;
                prevPos = this.body[index - 1].gridPosition;
                if (nextPos.x === prevPos.x || nextPos.y === prevPos.y) {
                    part.updateFrame('body_middle');
                    part.angle = 0;
                } else {
                    part.updateFrame('body_corner');
                    if (pos.x - nextPos.x === 1 && pos.y - prevPos.y === 1 || pos.x - prevPos.x === 1 && pos.y - nextPos.y === 1) {
                        part.angle = 180;
                    } else if (pos.x - nextPos.x === -1 && pos.y - prevPos.y === 1 || pos.x - prevPos.x === -1 && pos.y - nextPos.y === 1) {
                        part.angle = 270;
                    } else if (pos.x - nextPos.x === -1 && pos.y - prevPos.y === -1 || pos.x - prevPos.x === -1 && pos.y - nextPos.y === -1) {
                        part.angle = 0;
                    } else if (pos.x - nextPos.x === 1 && pos.y - prevPos.y === -1 || pos.x - prevPos.x === 1 && pos.y - nextPos.y === -1) {
                        part.angle = 90;
                    }
                }
            }
        } // _setSprite

    }, {
        key: "_getRndColor",
        value: function _getRndColor() {
            var nr = this._state.rnd.between(0, 3);
            return nr;
        }
    }]);

    return Snake;
}(); // _getRndColor


exports.Snake = Snake;

},{"./actorType":2}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });

var BootState = function (_Phaser$State) {
    _inherits(BootState, _Phaser$State);

    function BootState() {
        _classCallCheck(this, BootState);

        return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).apply(this, arguments));
    }

    _createClass(BootState, [{
        key: "preload",
        value: function preload() {
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.time.advancedTiming = true;
        } // preload

    }, {
        key: "create",
        value: function create() {
            this.state.start('preload');
        } // create

    }]);

    return BootState;
}(Phaser.State); // BootState


exports.BootState = BootState;

},{}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var actor_1 = require("../actor");
var actorType_1 = require("../actorType");
var gbl_1 = require("../gbl");
var matchColor_1 = require("../matchColor");
var snake_1 = require("../snake");

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));

        _this._gridWidth = 15;
        _this._gridHeight = 24;
        _this._moveDelay = 350;
        _this._moveTimer = 0;
        _this._fallDelay = 30;
        _this._fallTimer = 0;
        _this._nrOfTargets = 8;
        _this._minSnakeLength = 2;
        _this._maxSnakeLength = 5;
        _this._startPos = new Phaser.Point(7, 0);
        _this._handelingMatches = false;
        _this._movingSnakes = false;
        _this._gameOver = false;
        return _this;
    }

    _createClass(GameState, [{
        key: "create",
        value: function create() {
            gbl_1.Gbl.init(this._gridWidth, this._gridHeight, new Phaser.Point(this.game.world.centerX, this.game.world.centerY));
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'grid');
            background.anchor.set(0.5);
            this.actorGroup = this.add.group();
            for (var i = 0; i < 300; i++) {
                var actor = new actor_1.Actor(this.game, 'sprites');
                this.actorGroup.add(actor);
                actor.kill();
            }
            var border = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'border');
            border.anchor.set(0.5);
            this._grid = [];
            for (var y = 0; y < this._gridHeight; y++) {
                var row = [];
                for (var x = 0; x < this._gridWidth; x++) {
                    row.push(matchColor_1.MatchColor.NONE);
                }
                this._grid.push(row);
            }
            this._deadSnakes = [];
            this._setTargets(this._nrOfTargets);
            this._newDirection = new Phaser.Point(0, 1);
            this._createSnake();
        } // create

    }, {
        key: "update",
        value: function update() {
            if (this._gameOver) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    // load menu here
                }
                return;
            }
            if (this._movingSnakes) {
                if (this._fallTimer < this._fallDelay) {
                    this._fallTimer += this.game.time.elapsed;
                } else {
                    this._fallTimer = 0;
                    this._moveSnakesDown();
                }
            }
            if (this._handelingMatches) {
                return;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this._newDirection.set(-1, 0);
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this._newDirection.set(1, 0);
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this._newDirection.set(0, -1);
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this._newDirection.set(0, 1);
            }
            if (this._moveTimer < this._moveDelay) {
                this._moveTimer += this.game.time.elapsed;
            } else {
                this._moveTimer = 0;
                var nextPos = void 0;
                if (this._currentSnake.validDirection(this._newDirection)) {
                    nextPos = Phaser.Point.add(this._currentSnake.body[0].gridPosition, this._newDirection);
                } else {
                    nextPos = Phaser.Point.add(this._currentSnake.body[0].gridPosition, this._currentSnake.currentDirection);
                }
                if (!this._hitBounds(nextPos.x, nextPos.y) && this._positionFree(nextPos.x, nextPos.y) && !this._currentSnake.hit(nextPos.x, nextPos.y)) {
                    this._currentSnake.updateSnake(this._newDirection);
                } else {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this._currentSnake.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var part = _step.value;

                            if (part.gridPosition.y < 0) {
                                this._gameOver = true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    this._deadSnakes.push(this._currentSnake);
                    this._currentSnake = null;
                    this._handelingMatches = true;
                    this._movingSnakes = true;
                    this._fallTimer = 0;
                }
            }
        } // update

    }, {
        key: "render",
        value: function render() {
            this.game.debug.text(this.time.fps.toString() || '--', 2, 14, '#00ff00');
        } // render

    }, {
        key: "_createSnake",
        value: function _createSnake() {
            if (this._grid[this._startPos.y][this._startPos.x] !== matchColor_1.MatchColor.NONE) {
                this._gameOver = true;
            }
            this._moveTimer = 0;
            this._newDirection.set(0, 1);
            this._currentSnake = new snake_1.Snake(this, this._startPos.x, this._startPos.y, this.rnd.between(this._minSnakeLength, this._maxSnakeLength));
        }
    }, {
        key: "_clearGrid",
        value: function _clearGrid() {
            for (var y = 0; y < this._gridHeight; y++) {
                for (var x = 0; x < this._gridWidth; x++) {
                    this._grid[y][x] = matchColor_1.MatchColor.NONE;
                }
            }
        } // _clearGrid

    }, {
        key: "_hitBounds",
        value: function _hitBounds(x, y) {
            return x < 0 || x >= this._gridWidth || y < 0 || y >= this._gridHeight;
        } // _hitBounds

    }, {
        key: "_positionFree",
        value: function _positionFree(x, y) {
            return this._grid[y][x] === matchColor_1.MatchColor.NONE;
        } // _positionFree

    }, {
        key: "_setTargets",
        value: function _setTargets(nrOfTargets) {
            this._targets = [];
            for (var i = 0; i < nrOfTargets; i++) {
                var foundPos = false;
                var rndX = void 0;
                var rndY = void 0;
                while (!foundPos) {
                    rndX = this.rnd.between(0, this._gridWidth - 1);
                    rndY = this.rnd.between(7, this._gridHeight - 1);
                    if (this._grid[rndY][rndX] === matchColor_1.MatchColor.NONE) {
                        foundPos = true;
                        var color = this.rnd.between(0, 3);
                        var target = this.actorGroup.getFirstExists(false);
                        target.reset(0, 0);
                        target.init(rndX, rndY, color, actorType_1.ActorType.TARGET, 'target');
                        this._grid[rndY][rndX] = color;
                        this._targets.push(target);
                    }
                }
            }
        } // _setTargets

    }, {
        key: "_moveSnakesDown",
        value: function _moveSnakesDown() {
            var foundSnakeToMove = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._deadSnakes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var snake = _step2.value;

                    var body = snake.body;
                    var lowPositions = [];
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = body[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _part = _step3.value;

                            var x = _part.gridPosition.x;
                            var y = _part.gridPosition.y + 1;
                            if (!snake.hit(x, y)) {
                                lowPositions.push(new Phaser.Point(x, y));
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    var canMove = true;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = lowPositions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _pos = _step4.value;

                            if (_pos.y >= this._gridHeight || this._grid[_pos.y][_pos.x] !== matchColor_1.MatchColor.NONE) {
                                canMove = false;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    if (canMove) {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = body[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var part = _step5.value;

                                var pos = part.gridPosition;
                                this._grid[pos.y][pos.x] = matchColor_1.MatchColor.NONE;
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        snake.moveDown();
                        foundSnakeToMove = true;
                    }
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = body[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var _part2 = _step6.value;

                            var _pos2 = _part2.gridPosition;
                            this._grid[_pos2.y][_pos2.x] = _part2.color;
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (!foundSnakeToMove) {
                if (this._getMatches()) {
                    this._moveSnakesDown();
                } else {
                    this._handelingMatches = false;
                    this._movingSnakes = false;
                    this._createSnake();
                }
            }
        }
    }, {
        key: "_getMatches",
        value: function _getMatches() {
            var colorPositions = [];
            var currentColor = void 0;
            var positionsMatched = [];
            for (var y = 0; y < this._gridHeight; y++) {
                colorPositions = [new Phaser.Point(0, y)];
                currentColor = this._grid[y][0];
                for (var x = 1; x < this._gridWidth; x++) {
                    var color = this._grid[y][x];
                    if (color === matchColor_1.MatchColor.NONE || color !== currentColor) {
                        if (colorPositions.length >= 4) {
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                for (var _iterator7 = colorPositions[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var c = _step7.value;

                                    positionsMatched.push(new Phaser.Point(c.x, c.y));
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                        _iterator7.return();
                                    }
                                } finally {
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }
                        }
                        colorPositions = [new Phaser.Point(x, y)];
                        currentColor = color;
                    } else if (x === this._gridWidth - 1) {
                        colorPositions.push(new Phaser.Point(x, y));
                        if (colorPositions.length >= 4) {
                            var _iteratorNormalCompletion8 = true;
                            var _didIteratorError8 = false;
                            var _iteratorError8 = undefined;

                            try {
                                for (var _iterator8 = colorPositions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                    var _c = _step8.value;

                                    positionsMatched.push(new Phaser.Point(_c.x, _c.y));
                                }
                            } catch (err) {
                                _didIteratorError8 = true;
                                _iteratorError8 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                        _iterator8.return();
                                    }
                                } finally {
                                    if (_didIteratorError8) {
                                        throw _iteratorError8;
                                    }
                                }
                            }
                        }
                    } else {
                        colorPositions.push(new Phaser.Point(x, y));
                    }
                }
            }
            for (var _x = 0; _x < this._gridWidth; _x++) {
                colorPositions = [new Phaser.Point(_x, 0)];
                currentColor = this._grid[0][_x];
                for (var _y = 1; _y < this._gridHeight; _y++) {
                    var _color = this._grid[_y][_x];
                    if (_color === matchColor_1.MatchColor.NONE || _color !== currentColor) {
                        if (colorPositions.length >= 4) {
                            var _iteratorNormalCompletion9 = true;
                            var _didIteratorError9 = false;
                            var _iteratorError9 = undefined;

                            try {
                                for (var _iterator9 = colorPositions[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                    var _c2 = _step9.value;

                                    positionsMatched.push(new Phaser.Point(_c2.x, _c2.y));
                                }
                            } catch (err) {
                                _didIteratorError9 = true;
                                _iteratorError9 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                        _iterator9.return();
                                    }
                                } finally {
                                    if (_didIteratorError9) {
                                        throw _iteratorError9;
                                    }
                                }
                            }
                        }
                        colorPositions = [new Phaser.Point(_x, _y)];
                        currentColor = _color;
                    } else if (_y === this._gridHeight - 1) {
                        colorPositions.push(new Phaser.Point(_x, _y));
                        if (colorPositions.length >= 4) {
                            var _iteratorNormalCompletion10 = true;
                            var _didIteratorError10 = false;
                            var _iteratorError10 = undefined;

                            try {
                                for (var _iterator10 = colorPositions[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                    var _c3 = _step10.value;

                                    positionsMatched.push(new Phaser.Point(_c3.x, _c3.y));
                                }
                            } catch (err) {
                                _didIteratorError10 = true;
                                _iteratorError10 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                        _iterator10.return();
                                    }
                                } finally {
                                    if (_didIteratorError10) {
                                        throw _iteratorError10;
                                    }
                                }
                            }
                        }
                    } else {
                        colorPositions.push(new Phaser.Point(_x, _y));
                    }
                }
            }
            this._removeMatches(positionsMatched);
            return positionsMatched.length > 0;
        } // _handleMatches

    }, {
        key: "_removeMatches",
        value: function _removeMatches(positionsMatched) {
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = positionsMatched[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var pos = _step11.value;

                    var hitTarget = false;
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;

                    try {
                        for (var _iterator14 = this._targets[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var target = _step14.value;

                            if (pos.equals(target.gridPosition)) {
                                hitTarget = true;
                                target.kill();
                                this._targets.splice(this._targets.indexOf(target), 1);
                                this._grid[pos.y][pos.x] = matchColor_1.MatchColor.NONE;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                _iterator14.return();
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14;
                            }
                        }
                    }

                    if (!hitTarget) {
                        var _iteratorNormalCompletion15 = true;
                        var _didIteratorError15 = false;
                        var _iteratorError15 = undefined;

                        try {
                            for (var _iterator15 = this._deadSnakes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                var snake = _step15.value;
                                var _iteratorNormalCompletion16 = true;
                                var _didIteratorError16 = false;
                                var _iteratorError16 = undefined;

                                try {
                                    for (var _iterator16 = snake.body[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                        var part = _step16.value;

                                        if (part) {
                                            if (pos.equals(part.gridPosition)) {
                                                part.kill();
                                                this._grid[pos.y][pos.x] = matchColor_1.MatchColor.NONE;
                                                break;
                                            }
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError16 = true;
                                    _iteratorError16 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                            _iterator16.return();
                                        }
                                    } finally {
                                        if (_didIteratorError16) {
                                            throw _iteratorError16;
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError15 = true;
                            _iteratorError15 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                    _iterator15.return();
                                }
                            } finally {
                                if (_didIteratorError15) {
                                    throw _iteratorError15;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            var newSnakes = [];
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = this._deadSnakes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var _snake = _step12.value;

                    var parts = [];
                    for (var i = 0; i < _snake.body.length; i++) {
                        var _part3 = _snake.body[i];
                        if (!_part3.alive) {
                            if (parts.length > 0) {
                                newSnakes.push(parts);
                                parts = [];
                            }
                        } else if (i === _snake.body.length - 1) {
                            parts.push(_part3);
                            newSnakes.push(parts);
                        } else {
                            parts.push(_part3);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }

            this._deadSnakes = [];
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = newSnakes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var newSnake = _step13.value;

                    var _snake2 = new snake_1.Snake(this, 0, 0, 0, newSnake);
                    this._deadSnakes.push(_snake2);
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }
        }
    }]);

    return GameState;
}(Phaser.State); // GameState


exports.GameState = GameState;

},{"../actor":1,"../actorType":2,"../gbl":3,"../matchColor":5,"../snake":6}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });

var PreloadState = function (_Phaser$State) {
    _inherits(PreloadState, _Phaser$State);

    function PreloadState() {
        _classCallCheck(this, PreloadState);

        return _possibleConstructorReturn(this, (PreloadState.__proto__ || Object.getPrototypeOf(PreloadState)).apply(this, arguments));
    }

    _createClass(PreloadState, [{
        key: "preload",
        value: function preload() {
            this.load.image('grid', 'assets/images/grid.png');
            this.load.image('border', 'assets/images/border.png');
            this.load.atlasJSONArray('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');
        } // preload

    }, {
        key: "create",
        value: function create() {
            this.state.start('game');
        } // create

    }]);

    return PreloadState;
}(Phaser.State); // PreloadState


exports.PreloadState = PreloadState;

},{}]},{},[4])

//# sourceMappingURL=bundle.js.map
