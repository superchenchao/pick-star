(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/prepare.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '761d5bT8jBLwptOiom1pfTY', 'prepare', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=prepare.js.map
        