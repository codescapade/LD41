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
})(ActorType = exports.ActorType || (exports.ActorType = {}));

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
        }
    }, {
        key: "gridToWorld",
        value: function gridToWorld(x, y) {
            return new Phaser.Point(Gbl._minX + x * Gbl.TILESIZE, Gbl._minY + y * Gbl.TILESIZE);
        }
    }, {
        key: "worldToGrid",
        value: function worldToGrid(x, y) {
            return new Phaser.Point(Math.floor((x - Gbl._minX) / Gbl.TILESIZE), Math.floor((y - Gbl._minY) / Gbl.TILESIZE));
        }
    }]);

    return Gbl;
}();

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
})(MatchColor = exports.MatchColor || (exports.MatchColor = {}));

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var actor_1 = require("./actor");
var actorType_1 = require("./actorType");

var Snake = function () {
    function Snake(state, x, y, length) {
        _classCallCheck(this, Snake);

        this.ZERO = new Phaser.Point(0, 0);
        this._state = state;
        this._body = [];
        this._currentDirection = new Phaser.Point(0, 1);
        for (var i = 0; i < length; i++) {
            var part = new actor_1.Actor(state.game, 'sprites');
            var color = this._getRndColor();
            if (i === 0) {
                part.init(x, y - i, color, actorType_1.ActorType.HEAD, 'head_end');
                part.angle = 180;
            } else if (i === length - 1) {
                part.init(x, y - i, color, actorType_1.ActorType.BODY, 'body_end');
            } else {
                part.init(x, y - i, color, actorType_1.ActorType.BODY, 'body_middle');
            }
            this._body.push(part);
        }
    }

    _createClass(Snake, [{
        key: "updateSnake",
        value: function updateSnake(newDirection) {
            if (this._validDirection(newDirection)) {
                this._currentDirection.set(newDirection.x, newDirection.y);
            }
            var oldPos = new Phaser.Point();
            var newPos = Phaser.Point.add(this._body[0].gridPosition, this._currentDirection);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        }
    }, {
        key: "updateSprites",
        value: function updateSprites() {
            for (var i = 0; i < this._body.length; i++) {
                var part = this._body[i];
                this._setSprite(i, part);
            }
        }
    }, {
        key: "_setSprite",
        value: function _setSprite(index, part) {
            var pos = this._body[index].gridPosition;
            var nextPos = void 0;
            var prevPos = void 0;
            if (index === 0) {
                if (this._body.length === 1) {
                    if (part.actoryType === actorType_1.ActorType.HEAD) {
                        part.updateFrame('head_single');
                    } else {
                        part.updateFrame('body_single');
                    }
                } else {
                    nextPos = this._body[index + 1].gridPosition;
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
            } else if (index === this._body.length - 1) {
                prevPos = this._body[index - 1].gridPosition;
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
                nextPos = this._body[index + 1].gridPosition;
                prevPos = this._body[index - 1].gridPosition;
                if (nextPos.x === prevPos.x) {
                    part.updateFrame('body_middle');
                    part.angle = 90;
                } else if (nextPos.y === prevPos.y) {
                    part.updateFrame('body_middle');
                    part.angle = 0;
                } else {
                    part.updateFrame('body_corner');
                    if (nextPos.x === 1 && prevPos.y === 1 || prevPos.x === 1 && nextPos.y === 1) {
                        part.angle = 270;
                    } else if (nextPos.x === -1 && prevPos.y === 1 || prevPos.x === -1 && nextPos.y === 1) {
                        part.angle = 0;
                    } else if (nextPos.x === -1 && prevPos.y === -1 || prevPos.x === -1 && nextPos.y === -1) {
                        part.angle = 90;
                    } else if (nextPos.x === 1 && prevPos.y === -1 || prevPos.x === 1 && nextPos.y === -1) {
                        part.angle = 180;
                    }
                }
            }
        }
    }, {
        key: "_validDirection",
        value: function _validDirection(direction) {
            return !Phaser.Point.add(this._currentDirection, direction).equals(this.ZERO);
        }
    }, {
        key: "_getRndColor",
        value: function _getRndColor() {
            var nr = this._state.rnd.between(0, 3);
            console.log(nr);
            return nr;
        }
    }]);

    return Snake;
}();

exports.Snake = Snake;

},{"./actor":1,"./actorType":2}],7:[function(require,module,exports){
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
var gbl_1 = require("../gbl");
var snake_1 = require("../snake");

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));

        _this._gridWidth = 15;
        _this._gridHeight = 24;
        _this._moveDelay = 1000;
        _this._moveTimer = 0;
        return _this;
    }

    _createClass(GameState, [{
        key: "create",
        value: function create() {
            gbl_1.Gbl.init(this._gridWidth, this._gridHeight, new Phaser.Point(this.game.world.centerX, this.game.world.centerY));
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'grid');
            background.anchor.set(0.5);
            this._newDirection = new Phaser.Point(0, 1);
            this._currentSnake = new snake_1.Snake(this, 7, 5, 5);
        } // create

    }, {
        key: "update",
        value: function update() {
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
                // console.log('move snake here');
                this._currentSnake.updateSnake(this._newDirection);
            }
        } // update

    }, {
        key: "render",
        value: function render() {
            this.game.debug.text(this.time.fps.toString() || '--', 2, 14, '#00ff00');
        } // render

    }]);

    return GameState;
}(Phaser.State); // GameState


exports.GameState = GameState;

},{"../gbl":3,"../snake":6}],9:[function(require,module,exports){
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
