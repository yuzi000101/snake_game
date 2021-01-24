/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/modules/Snake.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
    蛇类
*/
var Snake = /*#__PURE__*/function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.element = document.getElementById('snake');
    this.head = this.element.querySelector('#snake > div');
    this.bodies = this.element.getElementsByTagName('div');
  }

  _createClass(Snake, [{
    key: "addBody",
    // 添加身体
    value: function addBody() {
      this.element.insertAdjacentHTML('beforeend', '<div></div>'); // 在结束标签之前添加
    } // 蛇身移动

  }, {
    key: "moveBody",
    value: function moveBody() {
      for (var i = this.bodies.length - 1; i > 0; i--) {
        this.bodies[i].style.left = this.bodies[i - 1].offsetLeft + 'px';
        this.bodies[i].style.top = this.bodies[i - 1].offsetTop + 'px';
      }
    } //检测是否头身碰撞

  }, {
    key: "checkHeadBody",
    value: function checkHeadBody(X, Y) {
      for (var i = 4; i < this.bodies.length; i++) {
        if (X === this.bodies[i].offsetLeft && Y === this.bodies[i].offsetTop) {
          throw new Error('commit suicide!!!');
        }
      }
    }
  }, {
    key: "X",
    get: function get() {
      return this.head.offsetLeft;
    },
    set: function set(value) {
      if (this.X === value) {
        return;
      } // 检测是否撞墙


      if (value < 0 || value > 290) {
        throw new Error('GAME OVER!!!');
      } // 处理水平调头


      if (this.bodies[1] && this.bodies[1].offsetLeft === value) {
        if (value > this.X) {
          // 左走右调头
          value = this.X - 10;
        } else {
          // 右走左调头
          value = this.X + 10;
        }
      }

      this.moveBody();
      this.head.style.left = "".concat(value, "px");
      this.checkHeadBody(this.X, this.Y);
    }
  }, {
    key: "Y",
    get: function get() {
      return this.head.offsetTop;
    },
    set: function set(value) {
      if (this.Y === value) {
        return;
      } // 检测是否撞墙


      if (value < 0 || value > 290) {
        throw new Error('GAME OVER!!!');
      } // 处理垂直调头


      if (this.bodies[1] && this.bodies[1].offsetTop === value) {
        if (value > this.Y) {
          // 上走下调头
          value = this.Y - 10;
        } else {
          // 下走上调头
          value = this.Y + 10;
        }
      }

      this.moveBody();
      this.head.style.top = "".concat(value, "px");
      this.checkHeadBody(this.X, this.Y);
    }
  }]);

  return Snake;
}();

/* harmony default export */ var modules_Snake = (Snake);
;// CONCATENATED MODULE: ./src/modules/Food.ts
function Food_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Food_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Food_createClass(Constructor, protoProps, staticProps) { if (protoProps) Food_defineProperties(Constructor.prototype, protoProps); if (staticProps) Food_defineProperties(Constructor, staticProps); return Constructor; }

/*
    食物类
*/
var Food = /*#__PURE__*/function () {
  function Food() {
    Food_classCallCheck(this, Food);

    this.element = document.getElementById('food');
  }

  Food_createClass(Food, [{
    key: "chang",
    value: function chang() {
      var left = Math.round(Math.random() * 29) * 10;
      var top = Math.round(Math.random() * 29) * 10;
      this.element.style.left = "".concat(left, "px");
      this.element.style.top = "".concat(top, "px");
    }
  }, {
    key: "X",
    get: function get() {
      return this.element.offsetLeft;
    }
  }, {
    key: "Y",
    get: function get() {
      return this.element.offsetTop;
    }
  }]);

  return Food;
}();

/* harmony default export */ var modules_Food = (Food);
;// CONCATENATED MODULE: ./src/modules/ScorePanel.ts
function ScorePanel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ScorePanel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ScorePanel_createClass(Constructor, protoProps, staticProps) { if (protoProps) ScorePanel_defineProperties(Constructor.prototype, protoProps); if (staticProps) ScorePanel_defineProperties(Constructor, staticProps); return Constructor; }

/*
    计分板类
*/
var ScorePanel = /*#__PURE__*/function () {
  function ScorePanel() {
    var maxLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var levelCondition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    ScorePanel_classCallCheck(this, ScorePanel);

    this.score = 0;
    this.level = 1;
    this.scoreElement = document.getElementById('score');
    this.levelElement = document.getElementById('level');
    this.maxLevel = maxLevel;
    this.levelConditon = levelCondition;
  } // 加分


  ScorePanel_createClass(ScorePanel, [{
    key: "addScore",
    value: function addScore() {
      this.scoreElement.innerHTML = "SCORE: ".concat(++this.score);

      if (this.score % this.levelConditon === 0) {
        this.levelUp();
      }
    } // 升级

  }, {
    key: "levelUp",
    value: function levelUp() {
      if (this.level < this.maxLevel) {
        this.levelElement.innerHTML = "LEVEL: ".concat(++this.level);
      }
    }
  }]);

  return ScorePanel;
}();

/* harmony default export */ var modules_ScorePanel = (ScorePanel);
;// CONCATENATED MODULE: ./src/modules/GameControl.ts
function GameControl_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GameControl_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GameControl_createClass(Constructor, protoProps, staticProps) { if (protoProps) GameControl_defineProperties(Constructor.prototype, protoProps); if (staticProps) GameControl_defineProperties(Constructor, staticProps); return Constructor; }

/*
    总控制类
*/




var GameControl = /*#__PURE__*/function () {
  function GameControl() {
    GameControl_classCallCheck(this, GameControl);

    this.direction = '';
    this.isLive = true;
    this.snake = new modules_Snake();
    this.food = new modules_Food();
    this.scorePanel = new modules_ScorePanel();
    this.init();
  }

  GameControl_createClass(GameControl, [{
    key: "init",
    value: function init() {
      document.addEventListener('keydown', this.keydownHandler.bind(this));
      this.run();
    }
  }, {
    key: "keydownHandler",
    value: function keydownHandler(event) {
      this.direction = event.key;
      event.preventDefault();
    } // 蛇的移动方法

  }, {
    key: "run",
    value: function run() {
      var X = this.snake.X;
      var Y = this.snake.Y;

      switch (this.direction) {
        case 'ArrowUp':
        case 'Up':
          Y -= 10;
          break;

        case 'ArrowDown':
        case 'Down':
          Y += 10;
          break;

        case 'ArrowLeft':
        case 'Left':
          X -= 10;
          break;

        case 'ArrowRight':
        case 'Right':
          X += 10;
          break;
      }

      this.checkEat(X, Y); // 检查是否吃到食物
      // 异常捕获（头身碰撞 / 撞墙）

      try {
        this.snake.X = X;
        this.snake.Y = Y;
      } catch (err) {
        this.isLive = false;
        alert(err.message);
      }

      this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    } // 检测是否吃到食物

  }, {
    key: "checkEat",
    value: function checkEat(X, Y) {
      if (X === this.food.X && Y === this.food.Y) {
        this.food.chang();
        this.snake.addBody();
        this.scorePanel.addScore();
      }
    }
  }]);

  return GameControl;
}();

/* harmony default export */ var modules_GameControl = (GameControl);
;// CONCATENATED MODULE: ./src/index.ts


var gc = new modules_GameControl();
/******/ })()
;