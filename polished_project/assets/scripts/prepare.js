var GameTools = require("GameTools");
var GameConfig = require("GameConfig");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        GameConfig.GameHeightScore = GameTools.getItemByLocalStorage("GameHeightScore", 0);
    },
    onStartGame: function () {
        GameTools.authorization();
        //cc.director.loadScene('load');
    },
    

    // update (dt) {},
});
