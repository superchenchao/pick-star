"use strict";
cc._RF.push(module, '761d5bT8jBLwptOiom1pfTY', 'prepare');
// scripts/prepare.js

"use strict";

var GameTools = require("GameTools");
var GameConfig = require("GameConfig");
cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    start: function start() {
        GameConfig.GameHeightScore = GameTools.getItemByLocalStorage("GameHeightScore", 0);
    },

    onStartGame: function onStartGame() {
        GameTools.authorization();
        //cc.director.loadScene('load');
    }

    // update (dt) {},
});

cc._RF.pop();